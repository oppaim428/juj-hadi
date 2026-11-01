import { o as __toESM } from "../_runtime.mjs";
import { c as recordType, i as enumType, l as stringType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { n as getCookie, o as setCookie$1, t as deleteCookie$1 } from "./request-response-BtPZBkp5.mjs";
import { t as require_promise } from "../_libs/mysql2+[...].mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
import { n as jwtVerify, t as SignJWT } from "../_libs/jose.mjs";
import { createHash, randomBytes, randomUUID } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.server-BtcIQrdK.js
var import_promise = /* @__PURE__ */ __toESM(require_promise());
var g = globalThis;
function pool() {
	if (!g.__jujPool) {
		g.__jujPool = import_promise.createPool({
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			connectionLimit: 10,
			charset: "UTF8MB4_UNICODE_CI",
			timezone: "Z",
			decimalNumbers: true,
			supportBigNumbers: true,
			typeCast: (field, next) => field.type === "TINY" && field.length === 1 ? field.string() === "1" : next()
		});
		g.__jujPool.pool.on("connection", (c) => c.query("SET time_zone = '+00:00'"));
	}
	return g.__jujPool;
}
async function rows(sql, params = [], c = pool()) {
	const [r] = await c.query(sql, params);
	return r;
}
async function one(sql, params = [], c = pool()) {
	return (await rows(sql, params, c))[0] ?? null;
}
async function exec(sql, params = [], c = pool()) {
	const [r] = await c.query(sql, params);
	return r;
}
async function tx(fn) {
	const c = await pool().getConnection();
	try {
		await c.beginTransaction();
		const out = await fn(c);
		await c.commit();
		return out;
	} catch (e) {
		await c.rollback();
		throw e;
	} finally {
		c.release();
	}
}
var sortSchema = enumType([
	"popular",
	"price_asc",
	"price_desc",
	"newest"
]);
var slug = stringType().trim().min(1).max(80).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
var uuid = stringType().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
var listOffersSchema = objectType({
	categorySlug: slug.optional(),
	sellerId: uuid.optional(),
	q: stringType().trim().max(100).optional(),
	sort: sortSchema.default("popular"),
	cursor: stringType().max(200).optional(),
	limit: numberType().int().min(1).max(48).default(12)
});
var offerIdSchema = objectType({ id: numberType().int().positive() });
var sellerIdSchema = objectType({ id: uuid });
var categorySlugSchema = objectType({ slug });
var uuidSchema = uuid;
var loginSchema = objectType({
	email: stringType().trim().toLowerCase().email().max(254),
	password: stringType().min(1).max(128)
});
var passwordSchema = stringType().min(8, "At least 8 characters").max(128).regex(/[A-Za-z]/, "Include a letter").regex(/[0-9]/, "Include a number");
var registerSchema = objectType({
	email: stringType().trim().toLowerCase().email().max(254),
	password: passwordSchema
});
var providerSchema = enumType([
	"stripe",
	"paypal",
	"razorpay",
	"crypto"
]);
var checkoutSchema = objectType({
	offerId: numberType().int().positive(),
	optionId: uuid.optional(),
	quantity: numberType().int().min(1).max(10).default(1),
	inputs: recordType(stringType().max(40), stringType().max(200)).default({}),
	provider: providerSchema
});
var reviewSchema = objectType({
	orderId: numberType().int().positive(),
	rating: numberType().int().min(1).max(5),
	comment: stringType().trim().max(1e3).default("")
});
var EMAIL_BASE_URL = "https://integrations.emergentagent.com";
var SHORTENERS = [
	"bit.ly",
	"tinyurl.com",
	"t.co",
	"is.gd",
	"cutt.ly",
	"goo.gl",
	"rebrand.ly"
];
var CRED_ASK = [
	"reply with your password",
	"reply with the code",
	"send your password",
	"cvv",
	"seed phrase",
	"send us your password",
	"enter your password below",
	"confirm your card number",
	"verify your card"
];
var appUrl = () => (process.env.PUBLIC_APP_URL ?? "").replace(/\/+$/, "");
var fromName = () => process.env.EMAIL_FROM_NAME ?? "";
var esc = (s) => s.replace(/[&<>"']/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[c]);
function assertSafeEmail(subject, html) {
	if (/<\s*(form|input|textarea|select)\b/i.test(html)) throw new Error("No forms in email");
	const body = `${subject}\n${html}`.toLowerCase();
	for (const p of CRED_ASK) if (body.includes(p)) throw new Error(`Credential ask in email: ${p}`);
	for (const [, url] of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
		if (/^(mailto:|tel:|cid:|#)/i.test(url)) continue;
		if (!/^https:\/\//i.test(url)) throw new Error(`Email links must be https: ${url}`);
		const u = new URL(url);
		const h = u.hostname;
		if (!h || h.includes("xn--") || /^[\d.]+$/.test(h) || h.includes(":") || u.username || SHORTENERS.some((s) => h === s || h.endsWith(`.${s}`))) throw new Error(`Unsafe link: ${url}`);
	}
}
function layout(title, lines, cta) {
	const button = cta ? `<p style="margin:24px 0"><a href="${appUrl()}${cta.path}" style="background:#b5e83f;color:#1f2329;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">${esc(cta.label)}</a></p>` : "";
	return `<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#1f2329">
<h2 style="margin:0 0 12px">${esc(title)}</h2>${lines.map((l) => `<p style="margin:0 0 8px">${esc(l)}</p>`).join("")}${button}
<p style="font-size:12px;color:#888">Sent by ${esc(fromName())}. We never ask for your password or card details by email.</p></td></tr></table>`;
}
function render(kind, v) {
	const n = fromName();
	const a = v;
	switch (kind) {
		case "verify": return {
			subject: `Confirm your ${n} email`,
			html: layout("Confirm your email", ["Click the button to confirm your email address. The link expires in 24 hours."], {
				label: "Confirm email",
				path: `/verify-email?token=${encodeURIComponent(String(a.token))}`
			})
		};
		case "reset": return {
			subject: `Reset your ${n} password`,
			html: layout("Reset your password", ["Click the button to choose a new password. The link expires in 1 hour.", "If you didn't ask for this, you can ignore this email."], {
				label: "Choose a new password",
				path: `/reset-password?token=${encodeURIComponent(String(a.token))}`
			})
		};
		case "order_paid": return {
			subject: `Payment received for order #${a.orderId}`,
			html: layout(`Order #${a.orderId} is paid`, [String(a.title), a.delivered ? "Your item is ready on the order page." : "The seller has been notified and will deliver soon."], {
				label: "Open order",
				path: `/orders/${a.orderId}`
			})
		};
		case "new_order": return {
			subject: `New order #${a.orderId}`,
			html: layout(`New order #${a.orderId}`, [String(a.title), "Open the order to check the buyer's details and deliver."], {
				label: "Open order",
				path: `/orders/${a.orderId}`
			})
		};
		case "order_delivered": return {
			subject: `Order #${a.orderId} was delivered`,
			html: layout(`Order #${a.orderId} was delivered`, [String(a.title), "Check the order page, then confirm you received it."], {
				label: "Open order",
				path: `/orders/${a.orderId}`
			})
		};
		default: return {
			subject: `Dispute opened on order #${a.orderId}`,
			html: layout(`Dispute on order #${a.orderId}`, [String(a.title), "The buyer opened a dispute. Reply in the order chat."], {
				label: "Open order",
				path: `/orders/${a.orderId}`
			})
		};
	}
}
/** Sends a fixed server-side template. Never throws: email problems are logged for the owner. */
async function sendTemplate(to, kind, vars) {
	const { subject, html } = render(kind, vars);
	try {
		assertSafeEmail(subject, html);
		const r = await fetch(`${EMAIL_BASE_URL}/api/v1/email/send`, {
			method: "POST",
			headers: {
				"X-Email-Key": process.env.EMERGENT_EMAIL_KEY ?? "",
				"content-type": "application/json"
			},
			body: JSON.stringify({
				to: [to],
				subject,
				html,
				from_name: fromName()
			})
		});
		if (!r.ok) console.warn(`[email] ${kind} to ${to} failed: ${r.status} ${await r.text()}`);
	} catch (e) {
		console.error(`[email] ${kind} error`, e);
	}
}
/** Marks a server message for translation extraction; the client shows it with t(). */
var m = (s) => s;
var ACCESS_TTL = 900;
var SESSION_TTL = 168 * 3600;
var key = () => new TextEncoder().encode(process.env["JWT_SECRET"]);
var cookieOpts = (maxAge) => ({
	httpOnly: true,
	secure: true,
	sameSite: "lax",
	path: "/",
	maxAge
});
var sha256 = (s) => createHash("sha256").update(s).digest("hex");
var SESSION_COOKIE = "juj_session";
var signToken = (sub, type, ttl) => new SignJWT({ type }).setProtectedHeader({ alg: "HS256" }).setSubject(sub).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + ttl).sign(key());
async function verifyToken(token, type) {
	if (!token) return null;
	try {
		const { payload } = await jwtVerify(token, key());
		return payload.type === type && payload.sub ? payload.sub : null;
	} catch {
		return null;
	}
}
async function loadUser(id) {
	const u = await one("SELECT u.id, u.email, u.role, u.status, s.display_name FROM users u LEFT JOIN seller_profiles s ON s.user_id = u.id WHERE u.id = ?", [id]);
	return u && u.status === "active" ? {
		id: u.id,
		email: u.email,
		role: u.role,
		display_name: u.display_name
	} : null;
}
async function startSession(userId) {
	setCookie$1(SESSION_COOKIE, await signToken(userId, "session", SESSION_TTL), cookieOpts(SESSION_TTL));
}
function endSession() {
	deleteCookie$1(SESSION_COOKIE, {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax"
	});
}
async function currentUser() {
	const id = await verifyToken(getCookie(SESSION_COOKIE), "session");
	return id ? loadUser(id) : null;
}
async function requireUser(...roles) {
	const u = await currentUser();
	if (!u) throw new Error(m("Please log in first."));
	if (roles.length && !roles.includes(u.role)) throw new Error(m("You don't have access to this page."));
	return u;
}
async function login(raw, ip) {
	const p = loginSchema.safeParse(raw);
	if (!p.success) return {
		ok: false,
		error: m("Enter a valid email and password.")
	};
	const { email, password } = p.data;
	const recent = "success = 0 AND created_at > NOW() - INTERVAL 15 MINUTE";
	const [byEmail, byIp] = await Promise.all([one(`SELECT COUNT(*) n FROM login_attempts WHERE email = ? AND ${recent}`, [email]), one(`SELECT COUNT(*) n FROM login_attempts WHERE ip = ? AND ${recent}`, [ip])]);
	if ((byEmail?.n ?? 0) >= 5 || (byIp?.n ?? 0) >= 20) return {
		ok: false,
		error: m("Too many attempts. Try again in 15 minutes."),
		retryAfterSec: 900
	};
	const u = await one("SELECT id, password_hash, status, email_verified_at FROM users WHERE email = ?", [email]);
	const good = await bcryptjs_default.compare(password, u?.password_hash ?? "$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidi");
	await exec("INSERT INTO login_attempts (email, ip, success) VALUES (?, ?, ?)", [
		email,
		ip,
		good
	]);
	if (!u || !good) return {
		ok: false,
		error: m("Wrong email or password.")
	};
	if (u.status !== "active") return {
		ok: false,
		error: m("This account is suspended. Contact support.")
	};
	if (!u.email_verified_at) return {
		ok: false,
		error: m("Please confirm your email first. Check your inbox.")
	};
	await exec("DELETE FROM login_attempts WHERE email = ? AND success = 0", [email]);
	return {
		ok: true,
		userId: u.id,
		access_token: await signToken(u.id, "access", ACCESS_TTL)
	};
}
async function createToken(userId, type, minutes) {
	const raw = randomBytes(32).toString("base64url");
	await exec("INSERT INTO auth_tokens (user_id, type, token_hash, expires_at) VALUES (?, ?, ?, NOW() + INTERVAL ? MINUTE)", [
		userId,
		type,
		sha256(raw),
		minutes
	]);
	return raw;
}
async function consumeToken(raw, type) {
	const row = await one("SELECT id, user_id FROM auth_tokens WHERE token_hash = ? AND type = ? AND used_at IS NULL AND expires_at > NOW()", [sha256(raw), type]);
	if (!row) return null;
	return (await exec("UPDATE auth_tokens SET used_at = NOW() WHERE id = ? AND used_at IS NULL", [row.id])).affectedRows === 1 ? row.user_id : null;
}
async function tooManyTokens(userId) {
	return ((await one("SELECT COUNT(*) n FROM auth_tokens WHERE user_id = ? AND created_at > NOW() - INTERVAL 1 HOUR", [userId]))?.n ?? 0) >= 5;
}
async function register(raw) {
	const p = registerSchema.safeParse(raw);
	if (!p.success) return {
		ok: false,
		error: p.error.issues[0]?.message ?? m("Invalid input")
	};
	if (await one("SELECT id FROM users WHERE email = ?", [p.data.email])) return { ok: true };
	const id = randomUUID();
	await exec("INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, 'buyer')", [
		id,
		p.data.email,
		await bcryptjs_default.hash(p.data.password, 10)
	]);
	await sendTemplate(p.data.email, "verify", { token: await createToken(id, "verify_email", 1440) });
	return { ok: true };
}
async function resendVerification(email) {
	const u = await one("SELECT id, email FROM users WHERE email = ? AND email_verified_at IS NULL", [email.trim().toLowerCase()]);
	if (u && !await tooManyTokens(u.id)) await sendTemplate(u.email, "verify", { token: await createToken(u.id, "verify_email", 1440) });
	return { ok: true };
}
async function verifyEmail(token) {
	const uid = await consumeToken(token, "verify_email");
	if (!uid) return {
		ok: false,
		error: m("This link is invalid or expired.")
	};
	await exec("UPDATE users SET email_verified_at = NOW() WHERE id = ? AND email_verified_at IS NULL", [uid]);
	await startSession(uid);
	return { ok: true };
}
async function forgotPassword(email) {
	const u = await one("SELECT id, email FROM users WHERE email = ? AND status = 'active'", [email.trim().toLowerCase()]);
	if (u && !await tooManyTokens(u.id)) await sendTemplate(u.email, "reset", { token: await createToken(u.id, "reset_password", 60) });
	return { ok: true };
}
async function resetPassword(token, password) {
	const p = passwordSchema.safeParse(password);
	if (!p.success) return {
		ok: false,
		error: p.error.issues[0]?.message ?? m("Invalid password")
	};
	const uid = await consumeToken(token, "reset_password");
	if (!uid) return {
		ok: false,
		error: m("This reset link is invalid or expired. Request a new one.")
	};
	await exec("UPDATE users SET password_hash = ?, email_verified_at = COALESCE(email_verified_at, NOW()) WHERE id = ?", [await bcryptjs_default.hash(p.data, 10), uid]);
	await startSession(uid);
	return { ok: true };
}
function clientIp(request) {
	return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
//#endregion
export { sendTemplate as C, uuidSchema as D, tx as E, verifyEmail as O, sellerIdSchema as S, startSession as T, requireUser as _, currentUser as a, reviewSchema as b, forgotPassword as c, login as d, m as f, registerSchema as g, register as h, clientIp as i, listOffersSchema as l, one as m, categorySlugSchema as n, endSession as o, offerIdSchema as p, checkoutSchema as r, exec as s, appUrl as t, loadUser as u, resendVerification as v, slug as w, rows as x, resetPassword as y };
