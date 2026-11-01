import { i as enumType, l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-h9fFl8xK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-BYyVESXN.js
var filter = objectType({
	q: stringType().max(100).optional(),
	status: stringType().max(30).optional(),
	role: stringType().max(10).optional()
});
var fetchAdminStats = createServerFn({ method: "GET" }).handler(createSsrRpc("5cd2b6b6d8311b8cbac65e8435eff6f307d4d9a81c104e5e02eb260b9354f544"));
var fetchAdminUsers = createServerFn({ method: "GET" }).validator((d) => filter.parse(d)).handler(createSsrRpc("c74e0deefd4b1669194934a17d6f39580a84b6ee87e4102923cc68cd74983dbd"));
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
}).parse(d)).handler(createSsrRpc("520e03227d155146ed35142881f9210bb718918cb77ca23fecdc6a9883df489d"));
var fetchAdminSellers = createServerFn({ method: "GET" }).handler(createSsrRpc("9c0acb86f91c75b2b8005ba464ca3a63365d3db38609c7f6140c811ab24e66f0"));
var setSellerVerificationFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: stringType().length(36),
	status: enumType([
		"unverified",
		"pending",
		"verified",
		"rejected"
	])
}).parse(d)).handler(createSsrRpc("738772273f3492f3dcd8f0a666a19eed6b43674827e4995a97e7788e11bab34c"));
var fetchAdminCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("0cce2a12c5c2a3b715edcee8702daf99c9e7973c162da8b8358562bacbd047d1"));
var saveCategoryFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("62ce9800d7b41ac5acf98e26b4472d8e8fed0edbd57cfd1f477edc5cb948ad04"));
var deleteCategoryFn = createServerFn({ method: "POST" }).validator((d) => objectType({ id: stringType().length(36) }).parse(d)).handler(createSsrRpc("b77c9f29f47658ecfd865fcd1f9fd7bfc3285e977491451cd4a64b9bb2f886ed"));
var fetchAdminOffers = createServerFn({ method: "GET" }).validator((d) => filter.parse(d)).handler(createSsrRpc("fbab606e5103bf9c2d6ee541c2f3fe87a2e8668e2911342304804d04efa99dc5"));
var setOfferStatusFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	status: enumType([
		"draft",
		"active",
		"paused",
		"archived"
	])
}).parse(d)).handler(createSsrRpc("b51a318927cbb9cf05dfe9db0923a7aa2f6cf9424c29c8795d33c07bf3c81bfd"));
var fetchAdminOrders = createServerFn({ method: "GET" }).validator((d) => filter.parse(d)).handler(createSsrRpc("b03a940940ca5bd31f2c73d947b1f6e4e431a1c785297c72c4aad131f4e57131"));
var resolveOrderFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	action: enumType([
		"refund",
		"release",
		"cancel"
	])
}).parse(d)).handler(createSsrRpc("e9f216828eb5f18049fbef47a5a22fece52c3b2e743a4fc06a4471c57dc912d1"));
var fetchAdminReviews = createServerFn({ method: "GET" }).handler(createSsrRpc("020a552fc95206d93585bd75aba4412e3e68558947ceee1bed8849f1ccae55ec"));
var setReviewStatusFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	status: enumType([
		"visible",
		"hidden",
		"delete"
	])
}).parse(d)).handler(createSsrRpc("00abf54bc53cd33a5fc33736387fe97e1700ce75b22fa1b12f9a7e675d0a4db8"));
var fetchAdminPayouts = createServerFn({ method: "GET" }).handler(createSsrRpc("f709fd8ac1ee3eb0bccbe87f776d9fd67124cf9ea6de60ba5a11aab8bd7da2c5"));
var processPayoutFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	id: numberType().int().positive(),
	action: enumType(["paid", "rejected"]),
	note: stringType().trim().max(500)
}).parse(d)).handler(createSsrRpc("5755d8bef82db64fb3063a133209f0b82f3ec09b3f4d872c377185951b5a0725"));
var fetchAdminSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("c8fa14d541e8264390214e60b586f00bec472c373b1823f71339ae9cb7da7a4d"));
var saveSettingsFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("eb99b6666c7cba19f277b71d5f3444ef4ca274e3da5bebb00cf5928dbb7e7771"));
var retranslateFn = createServerFn({ method: "POST" }).handler(createSsrRpc("6b5ff52cf5167e6ee2623cd2005c30df4b141b1964a9230a28da6a9e0d7f84d4"));
//#endregion
export { setReviewStatusFn as _, fetchAdminPayouts as a, fetchAdminSettings as c, processPayoutFn as d, resolveOrderFn as f, setOfferStatusFn as g, saveSettingsFn as h, fetchAdminOrders as i, fetchAdminStats as l, saveCategoryFn as m, fetchAdminCategories as n, fetchAdminReviews as o, retranslateFn as p, fetchAdminOffers as r, fetchAdminSellers as s, deleteCategoryFn as t, fetchAdminUsers as u, setSellerVerificationFn as v, updateUserFn as y };
