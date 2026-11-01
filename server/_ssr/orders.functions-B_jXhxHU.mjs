import { l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-h9fFl8xK.mjs";
import { b as reviewSchema, r as checkoutSchema } from "./auth.server-BtcIQrdK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-B_jXhxHU.js
var idOnly = objectType({ orderId: numberType().int().positive() });
var checkoutFn = createServerFn({ method: "POST" }).validator((d) => checkoutSchema.parse(d)).handler(createSsrRpc("920275e22eb53510668ccfb5ccd0a58d8ceaa9527f2f5567e156c332f1c5e690"));
var retryPaymentFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(createSsrRpc("a50f2b7636b3c59c112f67f0fd373275274ae1435af513977d6d75481cedcf94"));
var confirmCheckoutFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(createSsrRpc("1ddf139d20205c3abf21a8d81f454426308abc8b47842b2f4a1c78ca3fe38f55"));
var fetchMyOrders = createServerFn({ method: "GET" }).handler(createSsrRpc("1b59486dfcf6a141a7e13bad5ca07b039bfa8ef600257872ff7525866b9bb9a5"));
var fetchOrder = createServerFn({ method: "GET" }).validator((d) => objectType({ id: numberType().int().positive() }).parse(d)).handler(createSsrRpc("a4c89aa853a3acad8a3dc1215e02a7b340d9d12fb445ef9f4d72f83d4983dfe0"));
var sendMessageFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({
	body: stringType().trim().min(1).max(4e3),
	deliver: booleanType().default(false)
}).parse(d)).handler(createSsrRpc("528928d0b3d0fbc20d324a74151be2ae6455b37fd1a7cfca724ed768752f4f7f"));
var confirmReceivedFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(createSsrRpc("1b34ff36913e8d0c6fc3d9ed7af4d4734c15c58fdc922e98fdaa1df25e476e8b"));
var disputeFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({ reason: stringType().trim().min(5).max(2e3) }).parse(d)).handler(createSsrRpc("86a019a33eb245e942cc6a8e3ce438ff7da481178ba227962cf0146b240eecba"));
var reviewFn = createServerFn({ method: "POST" }).validator((d) => reviewSchema.parse(d)).handler(createSsrRpc("e7d809d740b30ac2fb4d0fbe2a7efe052116f79cfc365b0d6c50ed88c60047d8"));
var replyReviewFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({ reply: stringType().trim().min(1).max(1e3) }).parse(d)).handler(createSsrRpc("5816df292b700eaf5886728c24aeb4c8da78081547ac6f853eb1cbbbc22a835b"));
//#endregion
export { fetchMyOrders as a, retryPaymentFn as c, disputeFn as i, reviewFn as l, confirmCheckoutFn as n, fetchOrder as o, confirmReceivedFn as r, replyReviewFn as s, checkoutFn as t, sendMessageFn as u };
