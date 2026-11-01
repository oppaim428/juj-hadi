import { i as enumType, l as stringType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { i as pageSchema, n as bannerSchema, o as siteInfoSchema, r as contactSchema } from "./content.schemas-CHAMcqAS.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import { r as getRequest } from "./request-response-BtPZBkp5.mjs";
import { _ as requireUser, f as m, m as one, s as exec, x as rows } from "./auth.server-BtcIQrdK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.functions-CQMzOExb.js
var SITE_KEYS = [
	"site_name",
	"site_tagline",
	"logo_url",
	"favicon_url",
	"default_glow",
	"contact_email",
	"contact_phone",
	"contact_address",
	"social_links"
];
async function getSiteInfo() {
	const [kv, pages] = await Promise.all([rows("SELECT setting_key, value FROM settings WHERE setting_key IN (?)", [SITE_KEYS]), rows("SELECT slug, title FROM pages WHERE is_published = 1 AND show_in_footer = 1 ORDER BY sort_order, id")]);
	const data = Object.fromEntries(kv.map((r) => [r.setting_key, r.value]));
	const parsed = siteInfoSchema.safeParse({
		site_name: "JUJ",
		...data
	});
	return {
		...parsed.success ? parsed.data : siteInfoSchema.parse({ site_name: "JUJ" }),
		pages
	};
}
async function saveSiteInfo(raw) {
	const d = siteInfoSchema.parse(raw);
	for (const k of SITE_KEYS) await exec("INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [k, String(d[k])]);
}
async function listBanners(placement) {
	if (!placement) return rows("SELECT * FROM banners ORDER BY sort_order, id");
	return rows("SELECT * FROM banners WHERE is_active = 1 AND placement IN (?, 'both') ORDER BY sort_order, id", [placement]);
}
async function saveBanner(raw) {
	const d = bannerSchema.parse(raw);
	const cols = [
		d.title,
		d.subtitle,
		d.image_url,
		d.link_url,
		d.button_label,
		d.placement,
		d.sort_order,
		d.is_active
	];
	if (d.id) {
		await exec("UPDATE banners SET title = ?, subtitle = ?, image_url = ?, link_url = ?, button_label = ?, placement = ?, sort_order = ?, is_active = ? WHERE id = ?", [...cols, d.id]);
		return { id: d.id };
	}
	return { id: (await exec("INSERT INTO banners (title, subtitle, image_url, link_url, button_label, placement, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", cols)).insertId };
}
var deleteBanner = (id) => exec("DELETE FROM banners WHERE id = ?", [id]);
var listPages = () => rows("SELECT * FROM pages ORDER BY sort_order, id");
var getPublishedPage = (slug) => one("SELECT * FROM pages WHERE slug = ? AND is_published = 1", [slug]);
async function savePage(raw) {
	const d = pageSchema.parse(raw);
	if (await one("SELECT id FROM pages WHERE slug = ? AND id <> ?", [d.slug, d.id ?? 0])) throw new Error(m("This page address is already used."));
	const cols = [
		d.slug,
		d.title,
		d.body,
		d.is_published,
		d.show_in_footer,
		d.sort_order
	];
	if (d.id) {
		await exec("UPDATE pages SET slug = ?, title = ?, body = ?, is_published = ?, show_in_footer = ?, sort_order = ? WHERE id = ?", [...cols, d.id]);
		return { id: d.id };
	}
	return { id: (await exec("INSERT INTO pages (slug, title, body, is_published, show_in_footer, sort_order) VALUES (?, ?, ?, ?, ?, ?)", cols)).insertId };
}
var deletePage = (id) => exec("DELETE FROM pages WHERE id = ?", [id]);
async function submitContact(raw, ip) {
	const d = contactSchema.parse(raw);
	const recent = await one("SELECT COUNT(*) n FROM contact_messages WHERE ip = ? AND created_at > NOW() - INTERVAL 1 HOUR", [ip]);
	if (Number(recent?.n ?? 0) >= 5) throw new Error(m("Too many messages. Please try again later."));
	await exec("INSERT INTO contact_messages (name, email, subject, message, ip) VALUES (?, ?, ?, ?, ?)", [
		d.name,
		d.email,
		d.subject,
		d.message,
		ip
	]);
}
var listMessages = (status) => rows(`SELECT id, name, email, subject, message, status, created_at FROM contact_messages ${status ? "WHERE status = ?" : ""} ORDER BY id DESC LIMIT 300`, status ? [status] : []);
var setMessageStatus = (id, status) => status === "delete" ? exec("DELETE FROM contact_messages WHERE id = ?", [id]) : exec("UPDATE contact_messages SET status = ? WHERE id = ?", [status, id]);
var admin_ = () => requireUser("admin");
var idOnly = objectType({ id: numberType().int().positive() });
var ok = { ok: true };
var fetchSiteInfo_createServerFn_handler = createServerRpc({
	id: "ff153ef53c02d6ad654f373d4b764b6dd294970724f46955642fbffd6ebc4a07",
	name: "fetchSiteInfo",
	filename: "src/lib/content.functions.ts"
}, (opts) => fetchSiteInfo.__executeServer(opts));
var fetchSiteInfo = createServerFn({ method: "GET" }).handler(fetchSiteInfo_createServerFn_handler, () => getSiteInfo());
var fetchBanners_createServerFn_handler = createServerRpc({
	id: "bcca7f326a9b40fb6042d466f378986b11fbe32733ab1e216f071b96a3379018",
	name: "fetchBanners",
	filename: "src/lib/content.functions.ts"
}, (opts) => fetchBanners.__executeServer(opts));
var fetchBanners = createServerFn({ method: "GET" }).validator((d) => objectType({ placement: enumType(["home", "category"]) }).parse(d)).handler(fetchBanners_createServerFn_handler, ({ data }) => listBanners(data.placement));
var fetchPage_createServerFn_handler = createServerRpc({
	id: "712f166e25e788004d68743c5b871dde3ba07720354b3085ccd452954ab25fd6",
	name: "fetchPage",
	filename: "src/lib/content.functions.ts"
}, (opts) => fetchPage.__executeServer(opts));
var fetchPage = createServerFn({ method: "GET" }).validator((d) => objectType({ slug: stringType().max(80) }).parse(d)).handler(fetchPage_createServerFn_handler, ({ data }) => getPublishedPage(data.slug));
var submitContactFn_createServerFn_handler = createServerRpc({
	id: "433d5181c40d9ae1cfeb1835f6b4e0d9871f17f8e52adaba19c5b3dde916c2e1",
	name: "submitContactFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => submitContactFn.__executeServer(opts));
var submitContactFn = createServerFn({ method: "POST" }).validator((d) => d).handler(submitContactFn_createServerFn_handler, async ({ data }) => {
	const h = getRequest().headers;
	await submitContact(data, h.get("cf-connecting-ip") ?? h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",").pop()?.trim() ?? "unknown");
	return ok;
});
var saveSiteInfoFn_createServerFn_handler = createServerRpc({
	id: "81746a18dcfc5bf9999df5c20fe20bed6bc4e9e80d9b2fd57b446a3453a50283",
	name: "saveSiteInfoFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => saveSiteInfoFn.__executeServer(opts));
var saveSiteInfoFn = createServerFn({ method: "POST" }).validator((d) => d).handler(saveSiteInfoFn_createServerFn_handler, async ({ data }) => (await admin_(), await saveSiteInfo(data), ok));
var fetchAdminBanners_createServerFn_handler = createServerRpc({
	id: "03dc433e0513d107bc5fd2ef725bf57a7e8220802c2f05b81a6f658d0916f841",
	name: "fetchAdminBanners",
	filename: "src/lib/content.functions.ts"
}, (opts) => fetchAdminBanners.__executeServer(opts));
var fetchAdminBanners = createServerFn({ method: "GET" }).handler(fetchAdminBanners_createServerFn_handler, async () => (await admin_(), listBanners()));
var saveBannerFn_createServerFn_handler = createServerRpc({
	id: "2be5964010fc31a489d3480dac93df682da9194cb8996752b04ad02d657a6a94",
	name: "saveBannerFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => saveBannerFn.__executeServer(opts));
var saveBannerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(saveBannerFn_createServerFn_handler, async ({ data }) => (await admin_(), saveBanner(data)));
var deleteBannerFn_createServerFn_handler = createServerRpc({
	id: "4d165a0312587a2b679f3b31397f7ba08a03d4f34ee6cf7f4b831203a31cdd6a",
	name: "deleteBannerFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => deleteBannerFn.__executeServer(opts));
var deleteBannerFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(deleteBannerFn_createServerFn_handler, async ({ data }) => (await admin_(), await deleteBanner(data.id), ok));
var fetchAdminPages_createServerFn_handler = createServerRpc({
	id: "7175198464283e8dd95bb7a442ec7ce01828c23a6b7f7d039c21f9a04fc83480",
	name: "fetchAdminPages",
	filename: "src/lib/content.functions.ts"
}, (opts) => fetchAdminPages.__executeServer(opts));
var fetchAdminPages = createServerFn({ method: "GET" }).handler(fetchAdminPages_createServerFn_handler, async () => (await admin_(), listPages()));
var savePageFn_createServerFn_handler = createServerRpc({
	id: "ef9be22d1ffccaa24dc1b4620b2f2b84ccb614d12076aaa4edc2aa9a2673bc3f",
	name: "savePageFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => savePageFn.__executeServer(opts));
var savePageFn = createServerFn({ method: "POST" }).validator((d) => d).handler(savePageFn_createServerFn_handler, async ({ data }) => (await admin_(), savePage(data)));
var deletePageFn_createServerFn_handler = createServerRpc({
	id: "073371cf5158a8c77d14408d0d356ce2f21ce542ced00404d5ff0b86180b0d70",
	name: "deletePageFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => deletePageFn.__executeServer(opts));
var deletePageFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(deletePageFn_createServerFn_handler, async ({ data }) => (await admin_(), await deletePage(data.id), ok));
var fetchMessages_createServerFn_handler = createServerRpc({
	id: "ab1adb86be0f7cc5368b747d38ca2c11e9b4dd95177e3962d07da436590f79fc",
	name: "fetchMessages",
	filename: "src/lib/content.functions.ts"
}, (opts) => fetchMessages.__executeServer(opts));
var fetchMessages = createServerFn({ method: "GET" }).validator((d) => objectType({ status: enumType(["new", "read"]).optional() }).parse(d)).handler(fetchMessages_createServerFn_handler, async ({ data }) => (await admin_(), listMessages(data.status)));
var setMessageStatusFn_createServerFn_handler = createServerRpc({
	id: "7677bfa51afec6a769d51e7abe78765bc8b3e2d694e6f810e3700d3f0f23458e",
	name: "setMessageStatusFn",
	filename: "src/lib/content.functions.ts"
}, (opts) => setMessageStatusFn.__executeServer(opts));
var setMessageStatusFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({ status: enumType([
	"new",
	"read",
	"delete"
]) }).parse(d)).handler(setMessageStatusFn_createServerFn_handler, async ({ data }) => (await admin_(), await setMessageStatus(data.id, data.status), ok));
//#endregion
export { deleteBannerFn_createServerFn_handler, deletePageFn_createServerFn_handler, fetchAdminBanners_createServerFn_handler, fetchAdminPages_createServerFn_handler, fetchBanners_createServerFn_handler, fetchMessages_createServerFn_handler, fetchPage_createServerFn_handler, fetchSiteInfo_createServerFn_handler, saveBannerFn_createServerFn_handler, savePageFn_createServerFn_handler, saveSiteInfoFn_createServerFn_handler, setMessageStatusFn_createServerFn_handler, submitContactFn_createServerFn_handler };
