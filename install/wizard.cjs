/* Web install wizard: collects DB + admin details, imports the SQL, writes .env. */
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const crypto = require("node:crypto");

const ROOT = path.join(__dirname, "..");
const DB_DIR = path.join(ROOT, "database");
const ENV_FILE = path.join(ROOT, ".env");
const PORT = Number(process.env.PORT) || 3000;

const ADMIN_ID = "00000000-0000-4000-a000-000000000001";

const json = (res, code, body) => {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 1e6) reject(new Error("Request too large"));
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        reject(new Error("Invalid form data"));
      }
    });
    req.on("error", reject);
  });
}

function envLine(k, v) {
  return `${k}=${String(v ?? "").replace(/\n/g, " ")}`;
}

function buildEnv(f) {
  return [
    "# Written by the JUJ install wizard. Keep this file private.",
    envLine("PUBLIC_APP_URL", f.site_url),
    envLine("DB_HOST", f.db_host),
    envLine("DB_PORT", f.db_port),
    envLine("DB_USER", f.db_user),
    envLine("DB_PASSWORD", f.db_password),
    envLine("DB_NAME", f.db_name),
    envLine("JWT_SECRET", crypto.randomBytes(48).toString("base64url")),
    envLine("INTERNAL_API_SECRET", crypto.randomBytes(32).toString("base64url")),
    envLine("EMERGENT_LLM_KEY", f.emergent_key),
    envLine("EMERGENT_EMAIL_KEY", f.emergent_email_key),
    envLine("EMAIL_FROM_NAME", f.site_name || "JUJ"),
    envLine("STRIPE_SECRET_KEY", f.stripe_secret),
    envLine("STRIPE_PUBLISHABLE_KEY", f.stripe_publishable),
    envLine("STRIPE_WEBHOOK_SECRET", f.stripe_webhook),
    envLine("STRIPE_MODE", f.stripe_mode || "test"),
    envLine("TRANSLATE_SERVICE_URL", ""),
    "",
  ].join("\n");
}

async function install(f) {
  for (const k of ["db_host", "db_user", "db_name", "admin_email", "admin_password"]) {
    if (!String(f[k] || "").trim()) throw new Error(`Missing field: ${k.replace("_", " ")}`);
  }
  if (String(f.admin_password).length < 8) throw new Error("The admin password needs at least 8 characters.");

  const mysql = require("mysql2/promise");
  const bcrypt = require("bcryptjs");

  const conn = await mysql.createConnection({
    host: f.db_host,
    port: Number(f.db_port) || 3306,
    user: f.db_user,
    password: f.db_password || "",
    database: f.db_name,
    multipleStatements: true,
    charset: "UTF8MB4_UNICODE_CI",
  });

  const steps = [];
  const runFile = async (file, label) => {
    const sql = fs.readFileSync(path.join(DB_DIR, file), "utf8");
    await conn.query(sql);
    steps.push(label);
  };

  try {
    await conn.query("SET FOREIGN_KEY_CHECKS = 0");
    await runFile("schema.sql", "Marketplace tables created");
    await runFile("content.sql", "Banners, pages and settings created");
    if (f.demo_data) {
      await runFile("seed.sql", "Demo sellers, categories and products imported");
      if (fs.existsSync(path.join(DB_DIR, "translations.sql"))) await runFile("translations.sql", "Translations imported");
    } else if (fs.existsSync(path.join(DB_DIR, "categories.sql"))) {
      await runFile("categories.sql", "Categories imported");
    }
    await conn.query("SET FOREIGN_KEY_CHECKS = 1");

    const hash = await bcrypt.hash(String(f.admin_password), 10);
    const email = String(f.admin_email).trim().toLowerCase();
    const [existing] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) {
      await conn.query("UPDATE users SET password_hash = ?, role = 'admin', status = 'active', email_verified_at = COALESCE(email_verified_at, NOW()) WHERE id = ?", [hash, existing[0].id]);
      steps.push("Existing account promoted to admin");
    } else {
      const [adminRow] = await conn.query("SELECT id FROM users WHERE id = ?", [ADMIN_ID]);
      const id = adminRow.length ? crypto.randomUUID() : ADMIN_ID;
      await conn.query("INSERT INTO users (id, email, password_hash, role, status, email_verified_at) VALUES (?, ?, ?, 'admin', 'active', NOW())", [id, email, hash]);
      steps.push("Admin account created");
    }
    await conn.query("DELETE FROM login_attempts WHERE success = 0");

    if (f.site_name) await conn.query("INSERT INTO settings (setting_key, value) VALUES ('site_name', ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [f.site_name]);
    if (f.glow) await conn.query("INSERT INTO settings (setting_key, value) VALUES ('default_glow', ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [f.glow]);
    if (f.admin_email) await conn.query("INSERT INTO settings (setting_key, value) VALUES ('contact_email', ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [String(f.admin_email).trim().toLowerCase()]);
  } finally {
    await conn.end();
  }

  fs.writeFileSync(ENV_FILE, buildEnv(f), { mode: 0o600 });
  steps.push("Configuration file .env written");
  return steps;
}

function page() {
  return fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
}

function start() {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (req.method === "POST" && url.pathname.endsWith("/install")) {
      try {
        const steps = await install(await readBody(req));
        return json(res, 200, { ok: true, steps });
      } catch (e) {
        const msg = e && e.code === "ER_ACCESS_DENIED_ERROR" ? "The database user or password is wrong."
          : e && e.code === "ER_BAD_DB_ERROR" ? "That database does not exist. Create it in cPanel > MySQL Databases first."
          : e && e.code === "ECONNREFUSED" ? "Could not reach the database server. Use localhost as the host on cPanel."
          : e && e.code === "EACCES" ? "The app folder is not writable, so .env could not be saved. Set it to 0755 in File Manager."
          : (e && e.message) || "Install failed";
        return json(res, 400, { ok: false, error: msg });
      }
    }
    if (req.method === "GET" && url.pathname.endsWith("/health")) return json(res, 200, { ok: true, installed: false });
    res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    res.end(page());
  });
  server.listen(PORT, () => console.log(`[juj] install wizard listening on ${PORT}`));
}

module.exports = { start };
