/**
 * cPanel / Passenger entry point for the JUJ marketplace.
 * Not installed yet  -> serves the web install wizard on every URL.
 * Installed (.env ok) -> boots the built SSR server from ./server/index.mjs
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const ENV_FILE = path.join(ROOT, ".env");

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) return false;
  for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
  return true;
}

const installed = loadEnv() && !!process.env.DB_NAME && !!process.env.JWT_SECRET;

if (installed) {
  import("./server/index.mjs").catch((e) => {
    console.error("[juj] failed to start the server:", e);
    process.exit(1);
  });
} else {
  require("./install/wizard.cjs").start();
}
