import { i as enumType, l as stringType, o as numberType, s as objectType, t as arrayType } from "../_libs/zod.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-h9fFl8xK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.functions-DBYRn_25.js
var offerId = objectType({ id: numberType().int().positive() });
var fetchSellerDashboard = createServerFn({ method: "GET" }).handler(createSsrRpc("c3fab05d61aa9fdac7b447925dddf46bcf71407be3468b1507624c68e9524df2"));
var fetchSellerOffers = createServerFn({ method: "GET" }).handler(createSsrRpc("e1db69e8960f13157b0703e8f486c15cd46e3792c032aad7c01d10836f4c9d93"));
var fetchSellerOffer = createServerFn({ method: "GET" }).validator((d) => offerId.parse(d)).handler(createSsrRpc("a860e120fc054344487d7c7f9abad87d6891935a68d9a53e344a54203cfd0348"));
var saveOfferFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("24841f64c7976c62f16841dc9e3dc685377109ba13a12b73d6af7e0328502a8d"));
var archiveOfferFn = createServerFn({ method: "POST" }).validator((d) => offerId.parse(d)).handler(createSsrRpc("4647a36029860abb239dc0f45e9a7e04d57cb2e9f62a1f8fc6ead2e6c2c8416b"));
var addCodesFn = createServerFn({ method: "POST" }).validator((d) => offerId.extend({ codes: arrayType(stringType().max(500)).max(1e3) }).parse(d)).handler(createSsrRpc("309efb23f8faf2366aac9f29dd51c8c2eb0959cc89069c330cfe772767b4465a"));
var deleteCodeFn = createServerFn({ method: "POST" }).validator((d) => offerId.parse(d)).handler(createSsrRpc("4dde456f89037aee9aa9f3ee0cbc8402fced02acdc50bfb47836b97d5f73da72"));
var fetchSellerOrders = createServerFn({ method: "GET" }).validator((d) => objectType({ status: enumType([
	"paid",
	"delivered",
	"completed",
	"disputed",
	"refunded"
]).optional() }).parse(d)).handler(createSsrRpc("fece9374dfea93514f8d88ad70c8e8f6dfa40557f07753ef17d21959dd52a971"));
var fetchPayouts = createServerFn({ method: "GET" }).handler(createSsrRpc("a2278b5a4f5f76caade1d9f2691f834f26b248faf6f0af2666d95e73c3cc9d06"));
var requestPayoutFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("b8904848d32dfa323190f91efd4ffae95db46db99024e058811f74429a2c4932"));
var fetchMyReviews = createServerFn({ method: "GET" }).handler(createSsrRpc("f027cd1c0a67e905ce6bcc5bfa8bcea10ffd6db9392b4420f28a8600d5c42596"));
var saveSellerProfileFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("58c334e6baaa656e57bd00b6d7d82dcb263659a99873769fc6a1415cf4c01a32"));
//#endregion
export { fetchPayouts as a, fetchSellerOffers as c, saveOfferFn as d, saveSellerProfileFn as f, fetchMyReviews as i, fetchSellerOrders as l, archiveOfferFn as n, fetchSellerDashboard as o, deleteCodeFn as r, fetchSellerOffer as s, addCodesFn as t, requestPayoutFn as u };
