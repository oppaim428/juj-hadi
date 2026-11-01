import { l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { n as LOCALE_COOKIE, r as isLocale } from "./locales-CBPpFg6T.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import { n as getCookie, r as getRequest } from "./request-response-BtPZBkp5.mjs";
import { O as verifyEmail, S as sellerIdSchema, T as startSession, _ as requireUser, a as currentUser, c as forgotPassword, d as login, h as register, i as clientIp, l as listOffersSchema, n as categorySlugSchema, o as endSession, p as offerIdSchema, u as loadUser, v as resendVerification, y as resetPassword } from "./auth.server-BtcIQrdK.mjs";
import { D as setFavorite, _ as listFavorites, c as getCategoryBySlug, f as getSeller, l as getCategoryTree, n as availableMethods, p as getSellerReviews, u as getOffer, v as listOffers } from "./orders.server-BlUc8kv0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-DIYT1DJM.js
function requestLocale() {
	const c = getCookie(LOCALE_COOKIE);
	return isLocale(c) ? c : "en";
}
var emailOnly = objectType({ email: stringType().trim().max(254) });
var tokenOnly = objectType({ token: stringType().min(10).max(200) });
var fetchSession_createServerFn_handler = createServerRpc({
	id: "93857d88ad2f6eefabb00ad787c73c55040e6aaf6bc823a20d506bce689f4291",
	name: "fetchSession",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchSession.__executeServer(opts));
var fetchSession = createServerFn({ method: "GET" }).handler(fetchSession_createServerFn_handler, async () => ({
	user: await currentUser(),
	locale: requestLocale()
}));
var fetchCategoryTree_createServerFn_handler = createServerRpc({
	id: "ef9d71dd1629e6062eaac55240fe4ea5388f4d291fdc63fc3d09defe6c132fd1",
	name: "fetchCategoryTree",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchCategoryTree.__executeServer(opts));
var fetchCategoryTree = createServerFn({ method: "GET" }).handler(fetchCategoryTree_createServerFn_handler, () => getCategoryTree(requestLocale()));
var fetchOffers_createServerFn_handler = createServerRpc({
	id: "9c4028d5cd3c62cccb7d2aaceb9560fc45624b3fb09b9c70d9a09041d1c401ae",
	name: "fetchOffers",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchOffers.__executeServer(opts));
var fetchOffers = createServerFn({ method: "GET" }).validator((d) => listOffersSchema.parse(d)).handler(fetchOffers_createServerFn_handler, ({ data }) => listOffers(data, requestLocale()));
var fetchCategory_createServerFn_handler = createServerRpc({
	id: "4e1694d80477bc49f49e8655f85592c3743b0d87ce39d9efabd8acd9a71214f4",
	name: "fetchCategory",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchCategory.__executeServer(opts));
var fetchCategory = createServerFn({ method: "GET" }).validator((d) => categorySlugSchema.parse(d)).handler(fetchCategory_createServerFn_handler, ({ data }) => getCategoryBySlug(data.slug, requestLocale()));
var fetchOffer_createServerFn_handler = createServerRpc({
	id: "845dda8ab0110cb78fd01984fbbec5466f3806400a8cf5a9d34a160b03aaca38",
	name: "fetchOffer",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchOffer.__executeServer(opts));
var fetchOffer = createServerFn({ method: "GET" }).validator((d) => offerIdSchema.parse(d)).handler(fetchOffer_createServerFn_handler, async ({ data }) => {
	const offer = await getOffer(data.id, requestLocale());
	return offer ? {
		...offer,
		methods: await availableMethods()
	} : null;
});
var fetchSeller_createServerFn_handler = createServerRpc({
	id: "017d9a65a3f33374277f10a1ba1702d5474f713bb943f3c14a35e8596128a6e0",
	name: "fetchSeller",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchSeller.__executeServer(opts));
var fetchSeller = createServerFn({ method: "GET" }).validator((d) => sellerIdSchema.parse(d)).handler(fetchSeller_createServerFn_handler, async ({ data }) => {
	const seller = await getSeller(data.id);
	return seller ? {
		seller,
		reviews: await getSellerReviews(data.id, requestLocale())
	} : null;
});
var loginFn_createServerFn_handler = createServerRpc({
	id: "fe4394c73df041dc8645ebddebf8c79f630b2922bd6e3a700a0d1c4d0729c3dd",
	name: "loginFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => loginFn.__executeServer(opts));
var loginFn = createServerFn({ method: "POST" }).validator((d) => d).handler(loginFn_createServerFn_handler, async ({ data }) => {
	const r = await login(data, clientIp(getRequest()));
	if (!r.ok) return r;
	await startSession(r.userId);
	return {
		ok: true,
		role: (await loadUser(r.userId))?.role ?? "buyer"
	};
});
var registerFn_createServerFn_handler = createServerRpc({
	id: "12325d62a05af822a59dff73fda89afe5b02fc2041ccbe0d8f66f73234f8e9ee",
	name: "registerFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => registerFn.__executeServer(opts));
var registerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(registerFn_createServerFn_handler, ({ data }) => register(data));
var logoutFn_createServerFn_handler = createServerRpc({
	id: "8136939f3b87c65affd84fd67ccfefbaec18b03c39a2470a1ca5243db9eddb14",
	name: "logoutFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => logoutFn.__executeServer(opts));
var logoutFn = createServerFn({ method: "POST" }).handler(logoutFn_createServerFn_handler, () => {
	endSession();
	return { ok: true };
});
var verifyEmailFn_createServerFn_handler = createServerRpc({
	id: "4be95ed1f16c4444e9d657ff1b25948a28584a96b89cc48776bb439f540c35ed",
	name: "verifyEmailFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => verifyEmailFn.__executeServer(opts));
var verifyEmailFn = createServerFn({ method: "POST" }).validator((d) => tokenOnly.parse(d)).handler(verifyEmailFn_createServerFn_handler, ({ data }) => verifyEmail(data.token));
var resendVerificationFn_createServerFn_handler = createServerRpc({
	id: "087b3b1fac57b2f3ee6aff9e87655da4fd58f890e50a7bf2150cd1ad85d51fbe",
	name: "resendVerificationFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => resendVerificationFn.__executeServer(opts));
var resendVerificationFn = createServerFn({ method: "POST" }).validator((d) => emailOnly.parse(d)).handler(resendVerificationFn_createServerFn_handler, ({ data }) => resendVerification(data.email));
var forgotPasswordFn_createServerFn_handler = createServerRpc({
	id: "10a3cda767147b8ed01f659146eed1a8581ca1ca7b66f7fb72be4398d404d5aa",
	name: "forgotPasswordFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => forgotPasswordFn.__executeServer(opts));
var forgotPasswordFn = createServerFn({ method: "POST" }).validator((d) => emailOnly.parse(d)).handler(forgotPasswordFn_createServerFn_handler, ({ data }) => forgotPassword(data.email));
var resetPasswordFn_createServerFn_handler = createServerRpc({
	id: "98c0b8b9e3f83dcfad0f2979c478ef4cf1752684ddf02feb229f3a79742303c4",
	name: "resetPasswordFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => resetPasswordFn.__executeServer(opts));
var resetPasswordFn = createServerFn({ method: "POST" }).validator((d) => tokenOnly.extend({ password: stringType().max(128) }).parse(d)).handler(resetPasswordFn_createServerFn_handler, ({ data }) => resetPassword(data.token, data.password));
var fetchFavorites_createServerFn_handler = createServerRpc({
	id: "4f8eca85813533c261d814dbef7004876210c4ac75bd59dc1cceae62b0df64bc",
	name: "fetchFavorites",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => fetchFavorites.__executeServer(opts));
var fetchFavorites = createServerFn({ method: "GET" }).handler(fetchFavorites_createServerFn_handler, async () => {
	const user = await currentUser();
	return user ? listFavorites(user.id, requestLocale()) : [];
});
var setFavoriteFn_createServerFn_handler = createServerRpc({
	id: "54e69e4addb6dddd6c2e49ea07a7e39d986f735a96e6ab65982885c544d82fa4",
	name: "setFavoriteFn",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => setFavoriteFn.__executeServer(opts));
var setFavoriteFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	offerId: numberType().int().positive(),
	on: booleanType()
}).parse(d)).handler(setFavoriteFn_createServerFn_handler, async ({ data }) => {
	await setFavorite((await requireUser()).id, data.offerId, data.on);
	return { ok: true };
});
//#endregion
export { fetchCategoryTree_createServerFn_handler, fetchCategory_createServerFn_handler, fetchFavorites_createServerFn_handler, fetchOffer_createServerFn_handler, fetchOffers_createServerFn_handler, fetchSeller_createServerFn_handler, fetchSession_createServerFn_handler, forgotPasswordFn_createServerFn_handler, loginFn_createServerFn_handler, logoutFn_createServerFn_handler, registerFn_createServerFn_handler, resendVerificationFn_createServerFn_handler, resetPasswordFn_createServerFn_handler, setFavoriteFn_createServerFn_handler, verifyEmailFn_createServerFn_handler };
