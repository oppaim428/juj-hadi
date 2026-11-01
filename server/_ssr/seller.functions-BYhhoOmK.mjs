import { i as enumType, l as stringType, o as numberType, s as objectType, t as arrayType } from "../_libs/zod.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import { E as tx, _ as requireUser, f as m, m as one, s as exec, x as rows } from "./auth.server-BtcIQrdK.mjs";
import { i as sellerProfileSchema, n as offerEditSchema, o as translateItems, r as payoutRequestSchema } from "./translate.server-DrOJrd9w.mjs";
import { y as listSellerOrders } from "./orders.server-BlUc8kv0.mjs";
import { randomUUID } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.functions-BYhhoOmK.js
var slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 150) || "offer";
/** Admins also sell: they get a seller profile on first visit and may edit any offer. */
async function ensureSellerProfile(user) {
	if (user.role === "admin") await exec("INSERT IGNORE INTO seller_profiles (user_id, display_name, verification_status) VALUES (?, ?, 'verified')", [user.id, (user.display_name || "Official store").slice(0, 60)]);
	return user;
}
async function ownOffer(user, id) {
	const o = user.role === "admin" ? await one("SELECT id, delivery_type, seller_id FROM offers WHERE id = ?", [id]) : await one("SELECT id, delivery_type, seller_id FROM offers WHERE id = ? AND seller_id = ?", [id, user.id]);
	if (!o) throw new Error(m("Offer not found."));
	return o;
}
async function sellerDashboard(user) {
	const [profile, offers, orders, recent] = await Promise.all([
		one("SELECT display_name, bio, country, verification_status, rating_avg, rating_count, sales_count, balance_minor, pending_minor FROM seller_profiles WHERE user_id = ?", [user.id]),
		one("SELECT SUM(status = 'active') active, COUNT(*) total FROM offers WHERE seller_id = ? AND status <> 'archived'", [user.id]),
		one("SELECT SUM(status = 'paid') todo, SUM(status = 'disputed') disputed, COALESCE(SUM(CASE WHEN status = 'completed' THEN total_minor - commission_minor END), 0) revenue FROM orders WHERE seller_id = ?", [user.id]),
		rows("SELECT id, offer_title, total_minor, currency, status, created_at FROM orders WHERE seller_id = ? AND status NOT IN ('pending_payment', 'cancelled') ORDER BY id DESC LIMIT 5", [user.id])
	]);
	if (!profile) throw new Error(m("Seller profile not found."));
	return {
		profile,
		offers: {
			active: Number(offers?.active ?? 0),
			total: Number(offers?.total ?? 0)
		},
		orders: {
			todo: Number(orders?.todo ?? 0),
			disputed: Number(orders?.disputed ?? 0),
			revenue: Number(orders?.revenue ?? 0)
		},
		recent
	};
}
async function listSellerOffers(user) {
	return rows(`SELECT o.id, o.slug, o.title, o.image_url, o.price_minor, o.currency, o.status, o.stock_count, o.sales_count, o.delivery_type,
       (SELECT COUNT(*) FROM offer_codes c WHERE c.offer_id = o.id AND c.status = 'available') codes
     FROM offers o WHERE o.seller_id = ? AND o.status <> 'archived' ORDER BY o.id DESC`, [user.id]);
}
async function getSellerOffer(user, id) {
	await ownOffer(user, id);
	const [offer, options, fields, codes] = await Promise.all([
		one("SELECT id, title, description, category_id, image_url, price_minor, old_price_minor, delivery_type, stock_count, status, region, platform, slug FROM offers WHERE id = ?", [id]),
		rows("SELECT label, price_minor FROM offer_options WHERE offer_id = ? ORDER BY sort_order", [id]),
		rows("SELECT field_key AS `key`, label, type, select_options, required FROM offer_input_fields WHERE offer_id = ? ORDER BY sort_order", [id]),
		rows("SELECT id, code, created_at FROM offer_codes WHERE offer_id = ? AND status = 'available' ORDER BY id", [id])
	]);
	return {
		offer,
		options,
		fields: fields.map((f) => ({
			...f,
			select_options: f.select_options ? JSON.parse(f.select_options) : []
		})),
		codes
	};
}
async function saveOffer(user, raw) {
	const d = offerEditSchema.parse(raw);
	if (d.old_price_minor !== null && d.old_price_minor <= d.price_minor) throw new Error(m("The old price must be higher than the price."));
	if (!await one("SELECT id FROM categories WHERE id = ? AND is_active = 1", [d.category_id])) throw new Error(m("Choose a category."));
	const cols = [
		d.id ? (await ownOffer(user, d.id)).seller_id : user.id,
		d.category_id,
		slugify(d.title),
		d.title,
		d.description,
		d.image_url || null,
		d.price_minor,
		d.old_price_minor,
		d.delivery_type,
		d.stock_count,
		d.status,
		d.region || null,
		d.platform || null
	];
	const id = await tx(async (c) => {
		let offerId = d.id;
		if (offerId) {
			await exec(`UPDATE offers SET seller_id = ?, category_id = ?, slug = ?, title = ?, description = ?, image_url = ?, price_minor = ?,
        old_price_minor = ?, delivery_type = ?, stock_count = ?, status = ?, region = ?, platform = ? WHERE id = ?`, [...cols, offerId], c);
			await exec("DELETE FROM offer_options WHERE offer_id = ?", [offerId], c);
			await exec("DELETE FROM offer_input_fields WHERE offer_id = ?", [offerId], c);
		} else offerId = (await exec(`INSERT INTO offers (seller_id, category_id, slug, title, description, image_url, price_minor, old_price_minor,
        delivery_type, stock_count, status, region, platform) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, cols, c)).insertId;
		for (const [i, o] of d.options.entries()) await exec("INSERT INTO offer_options (id, offer_id, label, price_minor, sort_order) VALUES (?, ?, ?, ?, ?)", [
			randomUUID(),
			offerId,
			o.label,
			o.price_minor,
			i
		], c);
		const keys = /* @__PURE__ */ new Set();
		for (const [i, f] of d.fields.entries()) {
			if (keys.has(f.key)) throw new Error(m("Each input field needs a unique key."));
			keys.add(f.key);
			await exec("INSERT INTO offer_input_fields (id, offer_id, field_key, label, type, select_options, required, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
				randomUUID(),
				offerId,
				f.key,
				f.label,
				f.type,
				f.type === "select" ? JSON.stringify(f.select_options) : null,
				f.required,
				i
			], c);
		}
		return offerId;
	});
	translateItems([{
		type: "offer",
		id: String(id),
		title: d.title,
		description: d.description
	}]);
	return { id };
}
async function archiveOffer(user, id) {
	await ownOffer(user, id);
	await exec("UPDATE offers SET status = 'archived' WHERE id = ?", [id]);
}
async function addCodes(user, offerId, codes) {
	await ownOffer(user, offerId);
	const clean = [...new Set(codes.map((c) => c.trim()).filter((c) => c && c.length <= 500))].slice(0, 1e3);
	if (!clean.length) throw new Error(m("Paste at least one code."));
	await tx(async (c) => {
		await exec("INSERT INTO offer_codes (offer_id, code) VALUES ?", [clean.map((code) => [offerId, code])], c);
		await exec("UPDATE offers SET stock_count = stock_count + ? WHERE id = ?", [clean.length, offerId], c);
	});
	return clean.length;
}
async function deleteCode(user, codeId) {
	const code = await one("SELECT c.offer_id FROM offer_codes c JOIN offers o ON o.id = c.offer_id WHERE c.id = ? AND (o.seller_id = ? OR ? = 'admin') AND c.status = 'available'", [
		codeId,
		user.id,
		user.role
	]);
	if (!code) throw new Error(m("Code not found."));
	await exec("DELETE FROM offer_codes WHERE id = ?", [codeId]);
	await exec("UPDATE offers SET stock_count = GREATEST(stock_count - 1, 0) WHERE id = ?", [code.offer_id]);
}
async function listPayouts(user) {
	return rows("SELECT id, amount_minor, method, details, status, admin_note, created_at, processed_at FROM payouts WHERE seller_id = ? ORDER BY id DESC", [user.id]);
}
async function requestPayout(user, raw) {
	const d = payoutRequestSchema.parse(raw);
	await tx(async (c) => {
		if ((await exec("UPDATE seller_profiles SET balance_minor = balance_minor - ? WHERE user_id = ? AND balance_minor >= ?", [
			d.amount_minor,
			user.id,
			d.amount_minor
		], c)).affectedRows !== 1) throw new Error(m("The amount is higher than your available balance."));
		await exec("INSERT INTO payouts (seller_id, amount_minor, method, details) VALUES (?, ?, ?, ?)", [
			user.id,
			d.amount_minor,
			d.method,
			d.details
		], c);
	});
}
async function listMyReviews(user) {
	return rows("SELECT r.order_id, r.rating, r.comment, r.seller_reply, r.created_at, o.title AS offer_title FROM reviews r JOIN offers o ON o.id = r.offer_id WHERE r.seller_id = ? ORDER BY r.id DESC LIMIT 200", [user.id]);
}
async function saveSellerProfile(user, raw) {
	const d = sellerProfileSchema.parse(raw);
	await exec("UPDATE seller_profiles SET display_name = ?, bio = ?, country = ? WHERE user_id = ?", [
		d.display_name,
		d.bio || null,
		d.country || null,
		user.id
	]);
}
var seller_ = async () => ensureSellerProfile(await requireUser("seller", "admin"));
var offerId = objectType({ id: numberType().int().positive() });
var fetchSellerDashboard_createServerFn_handler = createServerRpc({
	id: "c3fab05d61aa9fdac7b447925dddf46bcf71407be3468b1507624c68e9524df2",
	name: "fetchSellerDashboard",
	filename: "src/lib/seller.functions.ts"
}, (opts) => fetchSellerDashboard.__executeServer(opts));
var fetchSellerDashboard = createServerFn({ method: "GET" }).handler(fetchSellerDashboard_createServerFn_handler, async () => sellerDashboard(await seller_()));
var fetchSellerOffers_createServerFn_handler = createServerRpc({
	id: "e1db69e8960f13157b0703e8f486c15cd46e3792c032aad7c01d10836f4c9d93",
	name: "fetchSellerOffers",
	filename: "src/lib/seller.functions.ts"
}, (opts) => fetchSellerOffers.__executeServer(opts));
var fetchSellerOffers = createServerFn({ method: "GET" }).handler(fetchSellerOffers_createServerFn_handler, async () => listSellerOffers(await seller_()));
var fetchSellerOffer_createServerFn_handler = createServerRpc({
	id: "a860e120fc054344487d7c7f9abad87d6891935a68d9a53e344a54203cfd0348",
	name: "fetchSellerOffer",
	filename: "src/lib/seller.functions.ts"
}, (opts) => fetchSellerOffer.__executeServer(opts));
var fetchSellerOffer = createServerFn({ method: "GET" }).validator((d) => offerId.parse(d)).handler(fetchSellerOffer_createServerFn_handler, async ({ data }) => getSellerOffer(await seller_(), data.id));
var saveOfferFn_createServerFn_handler = createServerRpc({
	id: "24841f64c7976c62f16841dc9e3dc685377109ba13a12b73d6af7e0328502a8d",
	name: "saveOfferFn",
	filename: "src/lib/seller.functions.ts"
}, (opts) => saveOfferFn.__executeServer(opts));
var saveOfferFn = createServerFn({ method: "POST" }).validator((d) => d).handler(saveOfferFn_createServerFn_handler, async ({ data }) => saveOffer(await seller_(), data));
var archiveOfferFn_createServerFn_handler = createServerRpc({
	id: "4647a36029860abb239dc0f45e9a7e04d57cb2e9f62a1f8fc6ead2e6c2c8416b",
	name: "archiveOfferFn",
	filename: "src/lib/seller.functions.ts"
}, (opts) => archiveOfferFn.__executeServer(opts));
var archiveOfferFn = createServerFn({ method: "POST" }).validator((d) => offerId.parse(d)).handler(archiveOfferFn_createServerFn_handler, async ({ data }) => {
	await archiveOffer(await seller_(), data.id);
	return { ok: true };
});
var addCodesFn_createServerFn_handler = createServerRpc({
	id: "309efb23f8faf2366aac9f29dd51c8c2eb0959cc89069c330cfe772767b4465a",
	name: "addCodesFn",
	filename: "src/lib/seller.functions.ts"
}, (opts) => addCodesFn.__executeServer(opts));
var addCodesFn = createServerFn({ method: "POST" }).validator((d) => offerId.extend({ codes: arrayType(stringType().max(500)).max(1e3) }).parse(d)).handler(addCodesFn_createServerFn_handler, async ({ data }) => ({ added: await addCodes(await seller_(), data.id, data.codes) }));
var deleteCodeFn_createServerFn_handler = createServerRpc({
	id: "4dde456f89037aee9aa9f3ee0cbc8402fced02acdc50bfb47836b97d5f73da72",
	name: "deleteCodeFn",
	filename: "src/lib/seller.functions.ts"
}, (opts) => deleteCodeFn.__executeServer(opts));
var deleteCodeFn = createServerFn({ method: "POST" }).validator((d) => offerId.parse(d)).handler(deleteCodeFn_createServerFn_handler, async ({ data }) => {
	await deleteCode(await seller_(), data.id);
	return { ok: true };
});
var fetchSellerOrders_createServerFn_handler = createServerRpc({
	id: "fece9374dfea93514f8d88ad70c8e8f6dfa40557f07753ef17d21959dd52a971",
	name: "fetchSellerOrders",
	filename: "src/lib/seller.functions.ts"
}, (opts) => fetchSellerOrders.__executeServer(opts));
var fetchSellerOrders = createServerFn({ method: "GET" }).validator((d) => objectType({ status: enumType([
	"paid",
	"delivered",
	"completed",
	"disputed",
	"refunded"
]).optional() }).parse(d)).handler(fetchSellerOrders_createServerFn_handler, async ({ data }) => listSellerOrders(await seller_(), data.status));
var fetchPayouts_createServerFn_handler = createServerRpc({
	id: "a2278b5a4f5f76caade1d9f2691f834f26b248faf6f0af2666d95e73c3cc9d06",
	name: "fetchPayouts",
	filename: "src/lib/seller.functions.ts"
}, (opts) => fetchPayouts.__executeServer(opts));
var fetchPayouts = createServerFn({ method: "GET" }).handler(fetchPayouts_createServerFn_handler, async () => listPayouts(await seller_()));
var requestPayoutFn_createServerFn_handler = createServerRpc({
	id: "b8904848d32dfa323190f91efd4ffae95db46db99024e058811f74429a2c4932",
	name: "requestPayoutFn",
	filename: "src/lib/seller.functions.ts"
}, (opts) => requestPayoutFn.__executeServer(opts));
var requestPayoutFn = createServerFn({ method: "POST" }).validator((d) => d).handler(requestPayoutFn_createServerFn_handler, async ({ data }) => {
	await requestPayout(await seller_(), data);
	return { ok: true };
});
var fetchMyReviews_createServerFn_handler = createServerRpc({
	id: "f027cd1c0a67e905ce6bcc5bfa8bcea10ffd6db9392b4420f28a8600d5c42596",
	name: "fetchMyReviews",
	filename: "src/lib/seller.functions.ts"
}, (opts) => fetchMyReviews.__executeServer(opts));
var fetchMyReviews = createServerFn({ method: "GET" }).handler(fetchMyReviews_createServerFn_handler, async () => listMyReviews(await seller_()));
var saveSellerProfileFn_createServerFn_handler = createServerRpc({
	id: "58c334e6baaa656e57bd00b6d7d82dcb263659a99873769fc6a1415cf4c01a32",
	name: "saveSellerProfileFn",
	filename: "src/lib/seller.functions.ts"
}, (opts) => saveSellerProfileFn.__executeServer(opts));
var saveSellerProfileFn = createServerFn({ method: "POST" }).validator((d) => d).handler(saveSellerProfileFn_createServerFn_handler, async ({ data }) => {
	await saveSellerProfile(await seller_(), data);
	return { ok: true };
});
//#endregion
export { addCodesFn_createServerFn_handler, archiveOfferFn_createServerFn_handler, deleteCodeFn_createServerFn_handler, fetchMyReviews_createServerFn_handler, fetchPayouts_createServerFn_handler, fetchSellerDashboard_createServerFn_handler, fetchSellerOffer_createServerFn_handler, fetchSellerOffers_createServerFn_handler, fetchSellerOrders_createServerFn_handler, requestPayoutFn_createServerFn_handler, saveOfferFn_createServerFn_handler, saveSellerProfileFn_createServerFn_handler };
