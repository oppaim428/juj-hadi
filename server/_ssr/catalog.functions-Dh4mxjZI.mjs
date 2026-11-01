import { l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { r as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-h9fFl8xK.mjs";
import { S as sellerIdSchema, l as listOffersSchema, n as categorySlugSchema, p as offerIdSchema } from "./auth.server-BtcIQrdK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-Dh4mxjZI.js
var emailOnly = objectType({ email: stringType().trim().max(254) });
var tokenOnly = objectType({ token: stringType().min(10).max(200) });
var fetchSession = createServerFn({ method: "GET" }).handler(createSsrRpc("93857d88ad2f6eefabb00ad787c73c55040e6aaf6bc823a20d506bce689f4291"));
var fetchCategoryTree = createServerFn({ method: "GET" }).handler(createSsrRpc("ef9d71dd1629e6062eaac55240fe4ea5388f4d291fdc63fc3d09defe6c132fd1"));
var fetchOffers = createServerFn({ method: "GET" }).validator((d) => listOffersSchema.parse(d)).handler(createSsrRpc("9c4028d5cd3c62cccb7d2aaceb9560fc45624b3fb09b9c70d9a09041d1c401ae"));
var fetchCategory = createServerFn({ method: "GET" }).validator((d) => categorySlugSchema.parse(d)).handler(createSsrRpc("4e1694d80477bc49f49e8655f85592c3743b0d87ce39d9efabd8acd9a71214f4"));
var fetchOffer = createServerFn({ method: "GET" }).validator((d) => offerIdSchema.parse(d)).handler(createSsrRpc("845dda8ab0110cb78fd01984fbbec5466f3806400a8cf5a9d34a160b03aaca38"));
var fetchSeller = createServerFn({ method: "GET" }).validator((d) => sellerIdSchema.parse(d)).handler(createSsrRpc("017d9a65a3f33374277f10a1ba1702d5474f713bb943f3c14a35e8596128a6e0"));
var loginFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("fe4394c73df041dc8645ebddebf8c79f630b2922bd6e3a700a0d1c4d0729c3dd"));
var registerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("12325d62a05af822a59dff73fda89afe5b02fc2041ccbe0d8f66f73234f8e9ee"));
var logoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("8136939f3b87c65affd84fd67ccfefbaec18b03c39a2470a1ca5243db9eddb14"));
var verifyEmailFn = createServerFn({ method: "POST" }).validator((d) => tokenOnly.parse(d)).handler(createSsrRpc("4be95ed1f16c4444e9d657ff1b25948a28584a96b89cc48776bb439f540c35ed"));
var resendVerificationFn = createServerFn({ method: "POST" }).validator((d) => emailOnly.parse(d)).handler(createSsrRpc("087b3b1fac57b2f3ee6aff9e87655da4fd58f890e50a7bf2150cd1ad85d51fbe"));
var forgotPasswordFn = createServerFn({ method: "POST" }).validator((d) => emailOnly.parse(d)).handler(createSsrRpc("10a3cda767147b8ed01f659146eed1a8581ca1ca7b66f7fb72be4398d404d5aa"));
var resetPasswordFn = createServerFn({ method: "POST" }).validator((d) => tokenOnly.extend({ password: stringType().max(128) }).parse(d)).handler(createSsrRpc("98c0b8b9e3f83dcfad0f2979c478ef4cf1752684ddf02feb229f3a79742303c4"));
var fetchFavorites = createServerFn({ method: "GET" }).handler(createSsrRpc("4f8eca85813533c261d814dbef7004876210c4ac75bd59dc1cceae62b0df64bc"));
var setFavoriteFn = createServerFn({ method: "POST" }).validator((d) => objectType({
	offerId: numberType().int().positive(),
	on: booleanType()
}).parse(d)).handler(createSsrRpc("54e69e4addb6dddd6c2e49ea07a7e39d986f735a96e6ab65982885c544d82fa4"));
var categoryTreeQuery = () => queryOptions({
	queryKey: ["categories"],
	queryFn: () => fetchCategoryTree(),
	staleTime: 5 * 6e4
});
var sessionQuery = () => queryOptions({
	queryKey: ["session"],
	queryFn: () => fetchSession(),
	staleTime: 5 * 6e4
});
//#endregion
export { fetchOffers as a, loginFn as c, resendVerificationFn as d, resetPasswordFn as f, verifyEmailFn as h, fetchOffer as i, logoutFn as l, setFavoriteFn as m, fetchCategory as n, fetchSeller as o, sessionQuery as p, fetchFavorites as r, forgotPasswordFn as s, categoryTreeQuery as t, registerFn as u };
