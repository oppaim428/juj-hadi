import { i as enumType, l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import { E as tx, _ as requireUser, f as m, m as one, s as exec, x as rows } from "./auth.server-BtcIQrdK.mjs";
import { a as settingsSchema, o as translateItems, t as categoryEditSchema } from "./translate.server-DrOJrd9w.mjs";
import { C as refundOrder, E as saveSettings, i as configuredProviders, m as getSettings, r as completeOrder, t as autoCompleteOrders } from "./orders.server-BlUc8kv0.mjs";
import { randomUUID } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-B7i53wnU.js
var like = (q) => `%${(q ?? "").replace(/[%_\\]/g, " ").trim()}%`;
async function adminStats() {
	await autoCompleteOrders();
	const [users, offers, orders, money, payouts, recent] = await Promise.all([
		rows("SELECT role, COUNT(*) n FROM users GROUP BY role"),
		one("SELECT SUM(status = 'active') active, COUNT(*) total FROM offers WHERE status <> 'archived'"),
		rows("SELECT status, COUNT(*) n FROM orders GROUP BY status"),
		one("SELECT COALESCE(SUM(total_minor), 0) gmv, COALESCE(SUM(CASE WHEN status = 'completed' THEN commission_minor END), 0) commission FROM orders WHERE status IN ('paid', 'delivered', 'completed', 'disputed')"),
		one("SELECT COUNT(*) n, COALESCE(SUM(amount_minor), 0) amount FROM payouts WHERE status = 'requested'"),
		rows("SELECT id, offer_title, total_minor, currency, status, created_at FROM orders ORDER BY id DESC LIMIT 8")
	]);
	return {
		users: Object.fromEntries(users.map((u) => [u.role, Number(u.n)])),
		offers: {
			active: Number(offers?.active ?? 0),
			total: Number(offers?.total ?? 0)
		},
		orders: Object.fromEntries(orders.map((o) => [o.status, Number(o.n)])),
		gmv: Number(money?.gmv ?? 0),
		commission: Number(money?.commission ?? 0),
		payouts: {
			n: Number(payouts?.n ?? 0),
			amount: Number(payouts?.amount ?? 0)
		},
		recent
	};
}
async function listUsers(q, role) {
	const params = [like(q)];
	let where = "u.email LIKE ?";
	if (role) {
		where += " AND u.role = ?";
		params.push(role);
	}
	return rows(`SELECT u.id, u.email, u.role, u.status, u.email_verified_at, u.created_at, s.display_name FROM users u
     LEFT JOIN seller_profiles s ON s.user_id = u.id WHERE ${where} ORDER BY u.created_at DESC LIMIT 200`, params);
}
async function updateUser(adminId, id, patch) {
	if (id === adminId && (patch.role || patch.status)) throw new Error(m("You can't change your own role or status."));
	if (patch.role) {
		await exec("UPDATE users SET role = ? WHERE id = ?", [patch.role, id]);
		if (patch.role === "seller") await exec("INSERT IGNORE INTO seller_profiles (user_id, display_name) SELECT id, LEFT(SUBSTRING_INDEX(email, '@', 1), 60) FROM users WHERE id = ?", [id]);
		else await exec("DELETE FROM seller_profiles WHERE user_id = ? AND NOT EXISTS (SELECT 1 FROM offers o WHERE o.seller_id = ?)", [id, id]);
	}
	if (patch.status) await exec("UPDATE users SET status = ? WHERE id = ?", [patch.status, id]);
	if (patch.verify) await exec("UPDATE users SET email_verified_at = COALESCE(email_verified_at, NOW()) WHERE id = ?", [id]);
}
async function listSellers() {
	return rows(`SELECT s.user_id, u.email, s.display_name, s.verification_status, s.rating_avg, s.rating_count, s.sales_count, s.balance_minor, s.pending_minor,
       (SELECT COUNT(*) FROM offers o WHERE o.seller_id = s.user_id AND o.status = 'active') offers
     FROM seller_profiles s JOIN users u ON u.id = s.user_id ORDER BY s.sales_count DESC`);
}
async function setSellerVerification(id, status) {
	await exec("UPDATE seller_profiles SET verification_status = ? WHERE user_id = ?", [status, id]);
}
async function listCategoriesAdmin() {
	return rows(`SELECT c.*, (SELECT COUNT(*) FROM offers o WHERE o.category_id = c.id AND o.status <> 'archived') offers FROM categories c ORDER BY c.sort_order, c.name`);
}
async function saveCategory(raw) {
	const d = categoryEditSchema.parse(raw);
	if (d.id && d.parent_id === d.id) throw new Error(m("A category can't be its own parent."));
	if (await one("SELECT id FROM categories WHERE slug = ? AND id <> ?", [d.slug, d.id ?? ""])) throw new Error(m("This slug is already used."));
	const id = d.id ?? randomUUID();
	const vals = [
		d.parent_id,
		d.slug,
		d.name,
		d.icon || null,
		d.seo_text || null,
		d.commission_percent,
		d.sort_order,
		d.show_in_header,
		d.is_active
	];
	if (d.id) await exec("UPDATE categories SET parent_id = ?, slug = ?, name = ?, icon = ?, seo_text = ?, commission_percent = ?, sort_order = ?, show_in_header = ?, is_active = ? WHERE id = ?", [...vals, id]);
	else await exec("INSERT INTO categories (parent_id, slug, name, icon, seo_text, commission_percent, sort_order, show_in_header, is_active, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [...vals, id]);
	translateItems([{
		type: "category",
		id,
		title: d.name,
		description: d.seo_text
	}]);
	return { id };
}
async function deleteCategory(id) {
	const used = await one("SELECT (SELECT COUNT(*) FROM categories WHERE parent_id = ?) kids, (SELECT COUNT(*) FROM offers WHERE category_id = ?) offers", [id, id]);
	if (Number(used?.kids) || Number(used?.offers)) throw new Error(m("Move its sub-categories and offers first, or turn the category off instead."));
	await exec("DELETE FROM content_translations WHERE entity_type = 'category' AND entity_id = ?", [id]);
	await exec("DELETE FROM categories WHERE id = ?", [id]);
}
async function listOffersAdmin(q, status) {
	const params = [like(q)];
	let where = "o.title LIKE ?";
	if (status) {
		where += " AND o.status = ?";
		params.push(status);
	}
	return rows(`SELECT o.id, o.slug, o.title, o.price_minor, o.currency, o.status, o.stock_count, o.sales_count, s.display_name seller, c.name category
     FROM offers o JOIN seller_profiles s ON s.user_id = o.seller_id JOIN categories c ON c.id = o.category_id WHERE ${where} ORDER BY o.id DESC LIMIT 300`, params);
}
async function setOfferStatus(id, status) {
	await exec("UPDATE offers SET status = ? WHERE id = ?", [status, id]);
}
async function listOrdersAdmin(status, q) {
	await autoCompleteOrders();
	const params = [];
	const where = [];
	if (status) {
		where.push("o.status = ?");
		params.push(status);
	}
	if (q) {
		where.push("(o.id = ? OR o.offer_title LIKE ? OR u.email LIKE ?)");
		params.push(Number(q) || 0, like(q), like(q));
	}
	return rows(`SELECT o.id, o.offer_title, o.total_minor, o.commission_minor, o.currency, o.status, o.payment_provider, o.created_at, u.email buyer, s.display_name seller
     FROM orders o JOIN users u ON u.id = o.buyer_id JOIN seller_profiles s ON s.user_id = o.seller_id
     ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY o.id DESC LIMIT 300`, params);
}
async function resolveOrder(id, action) {
	if (action === "refund") return refundOrder(id);
	if (action === "release") return completeOrder(id, m("The platform team completed this order and released the payment to the seller."));
	return (await exec("UPDATE orders SET status = 'cancelled' WHERE id = ? AND status = 'pending_payment'", [id])).affectedRows === 1;
}
async function listReviewsAdmin() {
	return rows(`SELECT r.id, r.order_id, r.rating, r.comment, r.seller_reply, r.status, r.created_at, u.email buyer, s.display_name seller, o.title offer_title
     FROM reviews r JOIN users u ON u.id = r.buyer_id JOIN seller_profiles s ON s.user_id = r.seller_id JOIN offers o ON o.id = r.offer_id ORDER BY r.id DESC LIMIT 300`);
}
async function setReviewStatus(id, status) {
	if (status !== "delete") return void await exec("UPDATE reviews SET status = ? WHERE id = ?", [status, id]);
	await tx(async (c) => {
		const r = await one("SELECT seller_id, rating FROM reviews WHERE id = ?", [id], c);
		if (!r) return;
		await exec("DELETE FROM reviews WHERE id = ?", [id], c);
		await exec("UPDATE seller_profiles SET rating_avg = IF(rating_count > 1, ROUND((rating_avg * rating_count - ?) / (rating_count - 1), 2), 0), rating_count = GREATEST(rating_count - 1, 0) WHERE user_id = ?", [r.rating, r.seller_id], c);
	});
}
async function listPayoutsAdmin() {
	return rows("SELECT p.id, p.amount_minor, p.method, p.details, p.status, p.admin_note, p.created_at, s.display_name seller FROM payouts p JOIN seller_profiles s ON s.user_id = p.seller_id ORDER BY p.id DESC LIMIT 300");
}
async function processPayout(id, action, note) {
	await tx(async (c) => {
		const p = await one("SELECT seller_id, amount_minor FROM payouts WHERE id = ? AND status = 'requested' FOR UPDATE", [id], c);
		if (!p) throw new Error(m("This payout was already processed."));
		await exec("UPDATE payouts SET status = ?, admin_note = ?, processed_at = NOW() WHERE id = ?", [
			action,
			note || null,
			id
		], c);
		if (action === "rejected") await exec("UPDATE seller_profiles SET balance_minor = balance_minor + ? WHERE user_id = ?", [p.amount_minor, p.seller_id], c);
	});
}
async function adminSettings() {
	return {
		settings: await getSettings(),
		configured: configuredProviders()
	};
}
async function updateSettings(raw) {
	await saveSettings(settingsSchema.parse(raw));
}
async function retranslateAll() {
	const [offers, cats] = await Promise.all([rows("SELECT id, title, description FROM offers WHERE status <> 'archived'"), rows("SELECT id, name, seo_text FROM categories")]);
	const items = [...offers.map((o) => ({
		type: "offer",
		id: String(o.id),
		title: o.title,
		description: o.description
	})), ...cats.map((c) => ({
		type: "category",
		id: c.id,
		title: c.name,
		description: c.seo_text ?? ""
	}))];
	(async () => {
		for (let i = 0; i < items.length; i += 10) await translateItems(items.slice(i, i + 10));
	})();
	return items.length;
}
var admin_ = () => requireUser("admin");
var filter = objectType({
	q: stringType().max(100).optional(),
	status: stringType().max(30).optional(),
	role: stringType().max(10).optional()
});
var ok = { ok: true };
var fetchAdminStats_createServerFn_handler = createServerRpc({
	id: "5cd2b6b6d8311b8cbac65e8435eff6f307d4d9a81c104e5e02eb260b9354f544",
	name: "fetchAdminStats",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminStats.__executeServer(opts));
var fetchAdminStats = createServerFn({ method: "GET" }).handler(fetchAdminStats_createServerFn_handler, async () => (await admin_(), adminStats()));
var fetchAdminUsers_createServerFn_handler = createServerRpc({
	id: "c74e0deefd4b1669194934a17d6f39580a84b6ee87e4102923cc68cd74983dbd",
	name: "fetchAdminUsers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminUsers.__executeServer(opts));
var fetchAdminUsers = createServerFn({ method: "GET" }).validator((d) => filter.parse(d)).handler(fetchAdminUsers_createServerFn_handler, async ({ data }) => (await admin_(), listUsers(data.q, data.role || void 0)));
var updateUserFn_createServerFn_handler = createServerRpc({
	id: "520e03227d155146ed35142881f9210bb718918cb77ca23fecdc6a9883df489d",
	name: "updateUserFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => updateUserFn.__executeServer(opts));
var updateUserFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: stringType().length(36),
	role: enumType([
		"buyer",
		"seller",
		"admin"
	]).optional(),
	status: enumType([
		"active",
		"suspended",
		"banned"
	]).optional(),
	verify: booleanType().optional()
}).parse(d)).handler(updateUserFn_createServerFn_handler, async ({ data }) => {
	await updateUser((await admin_()).id, data.id, data);
	return ok;
});
var fetchAdminSellers_createServerFn_handler = createServerRpc({
	id: "9c0acb86f91c75b2b8005ba464ca3a63365d3db38609c7f6140c811ab24e66f0",
	name: "fetchAdminSellers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminSellers.__executeServer(opts));
var fetchAdminSellers = createServerFn({ method: "GET" }).handler(fetchAdminSellers_createServerFn_handler, async () => (await admin_(), listSellers()));
var setSellerVerificationFn_createServerFn_handler = createServerRpc({
	id: "738772273f3492f3dcd8f0a666a19eed6b43674827e4995a97e7788e11bab34c",
	name: "setSellerVerificationFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setSellerVerificationFn.__executeServer(opts));
var setSellerVerificationFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: stringType().length(36),
	status: enumType([
		"unverified",
		"pending",
		"verified",
		"rejected"
	])
}).parse(d)).handler(setSellerVerificationFn_createServerFn_handler, async ({ data }) => (await admin_(), await setSellerVerification(data.id, data.status), ok));
var fetchAdminCategories_createServerFn_handler = createServerRpc({
	id: "0cce2a12c5c2a3b715edcee8702daf99c9e7973c162da8b8358562bacbd047d1",
	name: "fetchAdminCategories",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminCategories.__executeServer(opts));
var fetchAdminCategories = createServerFn({ method: "GET" }).handler(fetchAdminCategories_createServerFn_handler, async () => (await admin_(), listCategoriesAdmin()));
var saveCategoryFn_createServerFn_handler = createServerRpc({
	id: "62ce9800d7b41ac5acf98e26b4472d8e8fed0edbd57cfd1f477edc5cb948ad04",
	name: "saveCategoryFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveCategoryFn.__executeServer(opts));
var saveCategoryFn = createServerFn({ method: "POST" }).validator((d) => d).handler(saveCategoryFn_createServerFn_handler, async ({ data }) => (await admin_(), saveCategory(data)));
var deleteCategoryFn_createServerFn_handler = createServerRpc({
	id: "b77c9f29f47658ecfd865fcd1f9fd7bfc3285e977491451cd4a64b9bb2f886ed",
	name: "deleteCategoryFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteCategoryFn.__executeServer(opts));
var deleteCategoryFn = createServerFn({ method: "POST" }).validator((d) => objectType({ id: stringType().length(36) }).parse(d)).handler(deleteCategoryFn_createServerFn_handler, async ({ data }) => (await admin_(), await deleteCategory(data.id), ok));
var fetchAdminOffers_createServerFn_handler = createServerRpc({
	id: "fbab606e5103bf9c2d6ee541c2f3fe87a2e8668e2911342304804d04efa99dc5",
	name: "fetchAdminOffers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminOffers.__executeServer(opts));
var fetchAdminOffers = createServerFn({ method: "GET" }).validator((d) => filter.parse(d)).handler(fetchAdminOffers_createServerFn_handler, async ({ data }) => (await admin_(), listOffersAdmin(data.q, data.status || void 0)));
var setOfferStatusFn_createServerFn_handler = createServerRpc({
	id: "b51a318927cbb9cf05dfe9db0923a7aa2f6cf9424c29c8795d33c07bf3c81bfd",
	name: "setOfferStatusFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setOfferStatusFn.__executeServer(opts));
var setOfferStatusFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	status: enumType([
		"draft",
		"active",
		"paused",
		"archived"
	])
}).parse(d)).handler(setOfferStatusFn_createServerFn_handler, async ({ data }) => (await admin_(), await setOfferStatus(data.id, data.status), ok));
var fetchAdminOrders_createServerFn_handler = createServerRpc({
	id: "b03a940940ca5bd31f2c73d947b1f6e4e431a1c785297c72c4aad131f4e57131",
	name: "fetchAdminOrders",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminOrders.__executeServer(opts));
var fetchAdminOrders = createServerFn({ method: "GET" }).validator((d) => filter.parse(d)).handler(fetchAdminOrders_createServerFn_handler, async ({ data }) => (await admin_(), listOrdersAdmin(data.status || void 0, data.q || void 0)));
var resolveOrderFn_createServerFn_handler = createServerRpc({
	id: "e9f216828eb5f18049fbef47a5a22fece52c3b2e743a4fc06a4471c57dc912d1",
	name: "resolveOrderFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => resolveOrderFn.__executeServer(opts));
var resolveOrderFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	action: enumType([
		"refund",
		"release",
		"cancel"
	])
}).parse(d)).handler(resolveOrderFn_createServerFn_handler, async ({ data }) => (await admin_(), { ok: await resolveOrder(data.id, data.action) }));
var fetchAdminReviews_createServerFn_handler = createServerRpc({
	id: "020a552fc95206d93585bd75aba4412e3e68558947ceee1bed8849f1ccae55ec",
	name: "fetchAdminReviews",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminReviews.__executeServer(opts));
var fetchAdminReviews = createServerFn({ method: "GET" }).handler(fetchAdminReviews_createServerFn_handler, async () => (await admin_(), listReviewsAdmin()));
var setReviewStatusFn_createServerFn_handler = createServerRpc({
	id: "00abf54bc53cd33a5fc33736387fe97e1700ce75b22fa1b12f9a7e675d0a4db8",
	name: "setReviewStatusFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setReviewStatusFn.__executeServer(opts));
var setReviewStatusFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	status: enumType([
		"visible",
		"hidden",
		"delete"
	])
}).parse(d)).handler(setReviewStatusFn_createServerFn_handler, async ({ data }) => (await admin_(), await setReviewStatus(data.id, data.status), ok));
var fetchAdminPayouts_createServerFn_handler = createServerRpc({
	id: "f709fd8ac1ee3eb0bccbe87f776d9fd67124cf9ea6de60ba5a11aab8bd7da2c5",
	name: "fetchAdminPayouts",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminPayouts.__executeServer(opts));
var fetchAdminPayouts = createServerFn({ method: "GET" }).handler(fetchAdminPayouts_createServerFn_handler, async () => (await admin_(), listPayoutsAdmin()));
var processPayoutFn_createServerFn_handler = createServerRpc({
	id: "5755d8bef82db64fb3063a133209f0b82f3ec09b3f4d872c377185951b5a0725",
	name: "processPayoutFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => processPayoutFn.__executeServer(opts));
var processPayoutFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	action: enumType(["paid", "rejected"]),
	note: stringType().trim().max(500)
}).parse(d)).handler(processPayoutFn_createServerFn_handler, async ({ data }) => (await admin_(), await processPayout(data.id, data.action, data.note), ok));
var fetchAdminSettings_createServerFn_handler = createServerRpc({
	id: "c8fa14d541e8264390214e60b586f00bec472c373b1823f71339ae9cb7da7a4d",
	name: "fetchAdminSettings",
	filename: "src/lib/admin.functions.ts"
}, (opts) => fetchAdminSettings.__executeServer(opts));
var fetchAdminSettings = createServerFn({ method: "GET" }).handler(fetchAdminSettings_createServerFn_handler, async () => (await admin_(), adminSettings()));
var saveSettingsFn_createServerFn_handler = createServerRpc({
	id: "eb99b6666c7cba19f277b71d5f3444ef4ca274e3da5bebb00cf5928dbb7e7771",
	name: "saveSettingsFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveSettingsFn.__executeServer(opts));
var saveSettingsFn = createServerFn({ method: "POST" }).validator((d) => d).handler(saveSettingsFn_createServerFn_handler, async ({ data }) => (await admin_(), await updateSettings(data), ok));
var retranslateFn_createServerFn_handler = createServerRpc({
	id: "6b5ff52cf5167e6ee2623cd2005c30df4b141b1964a9230a28da6a9e0d7f84d4",
	name: "retranslateFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => retranslateFn.__executeServer(opts));
var retranslateFn = createServerFn({ method: "POST" }).handler(retranslateFn_createServerFn_handler, async () => (await admin_(), { queued: await retranslateAll() }));
//#endregion
export { deleteCategoryFn_createServerFn_handler, fetchAdminCategories_createServerFn_handler, fetchAdminOffers_createServerFn_handler, fetchAdminOrders_createServerFn_handler, fetchAdminPayouts_createServerFn_handler, fetchAdminReviews_createServerFn_handler, fetchAdminSellers_createServerFn_handler, fetchAdminSettings_createServerFn_handler, fetchAdminStats_createServerFn_handler, fetchAdminUsers_createServerFn_handler, processPayoutFn_createServerFn_handler, resolveOrderFn_createServerFn_handler, retranslateFn_createServerFn_handler, saveCategoryFn_createServerFn_handler, saveSettingsFn_createServerFn_handler, setOfferStatusFn_createServerFn_handler, setReviewStatusFn_createServerFn_handler, setSellerVerificationFn_createServerFn_handler, updateUserFn_createServerFn_handler };
