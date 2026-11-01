import { l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createServerRpc } from "./createServerRpc-B9Fjl2_y.mjs";
import { _ as requireUser, b as reviewSchema, r as checkoutSchema } from "./auth.server-BtcIQrdK.mjs";
import { S as postMessage, T as retryPayment, a as confirmPayment, b as openDispute, d as getOrderDetail, g as listBuyerOrders, h as leaveReview, o as confirmReceived, s as createOrder, w as replyToReview } from "./orders.server-BlUc8kv0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-BO-ZSaGq.js
var idOnly = objectType({ orderId: numberType().int().positive() });
var checkoutFn_createServerFn_handler = createServerRpc({
	id: "920275e22eb53510668ccfb5ccd0a58d8ceaa9527f2f5567e156c332f1c5e690",
	name: "checkoutFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => checkoutFn.__executeServer(opts));
var checkoutFn = createServerFn({ method: "POST" }).validator((d) => checkoutSchema.parse(d)).handler(checkoutFn_createServerFn_handler, async ({ data }) => createOrder(await requireUser(), data));
var retryPaymentFn_createServerFn_handler = createServerRpc({
	id: "a50f2b7636b3c59c112f67f0fd373275274ae1435af513977d6d75481cedcf94",
	name: "retryPaymentFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => retryPaymentFn.__executeServer(opts));
var retryPaymentFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(retryPaymentFn_createServerFn_handler, async ({ data }) => retryPayment(await requireUser(), data.orderId));
var confirmCheckoutFn_createServerFn_handler = createServerRpc({
	id: "1ddf139d20205c3abf21a8d81f454426308abc8b47842b2f4a1c78ca3fe38f55",
	name: "confirmCheckoutFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => confirmCheckoutFn.__executeServer(opts));
var confirmCheckoutFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(confirmCheckoutFn_createServerFn_handler, async ({ data }) => {
	const d = await getOrderDetail(await requireUser(), data.orderId);
	if (!d || d.role !== "buyer") return { status: null };
	return { status: await confirmPayment(data.orderId) };
});
var fetchMyOrders_createServerFn_handler = createServerRpc({
	id: "1b59486dfcf6a141a7e13bad5ca07b039bfa8ef600257872ff7525866b9bb9a5",
	name: "fetchMyOrders",
	filename: "src/lib/orders.functions.ts"
}, (opts) => fetchMyOrders.__executeServer(opts));
var fetchMyOrders = createServerFn({ method: "GET" }).handler(fetchMyOrders_createServerFn_handler, async () => listBuyerOrders(await requireUser()));
var fetchOrder_createServerFn_handler = createServerRpc({
	id: "a4c89aa853a3acad8a3dc1215e02a7b340d9d12fb445ef9f4d72f83d4983dfe0",
	name: "fetchOrder",
	filename: "src/lib/orders.functions.ts"
}, (opts) => fetchOrder.__executeServer(opts));
var fetchOrder = createServerFn({ method: "GET" }).validator((d) => objectType({ id: numberType().int().positive() }).parse(d)).handler(fetchOrder_createServerFn_handler, async ({ data }) => getOrderDetail(await requireUser(), data.id));
var sendMessageFn_createServerFn_handler = createServerRpc({
	id: "528928d0b3d0fbc20d324a74151be2ae6455b37fd1a7cfca724ed768752f4f7f",
	name: "sendMessageFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => sendMessageFn.__executeServer(opts));
var sendMessageFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({
	body: stringType().trim().min(1).max(4e3),
	deliver: booleanType().default(false)
}).parse(d)).handler(sendMessageFn_createServerFn_handler, async ({ data }) => {
	await postMessage(await requireUser(), data.orderId, data.body, data.deliver);
	return { ok: true };
});
var confirmReceivedFn_createServerFn_handler = createServerRpc({
	id: "1b34ff36913e8d0c6fc3d9ed7af4d4734c15c58fdc922e98fdaa1df25e476e8b",
	name: "confirmReceivedFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => confirmReceivedFn.__executeServer(opts));
var confirmReceivedFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(confirmReceivedFn_createServerFn_handler, async ({ data }) => {
	await confirmReceived(await requireUser(), data.orderId);
	return { ok: true };
});
var disputeFn_createServerFn_handler = createServerRpc({
	id: "86a019a33eb245e942cc6a8e3ce438ff7da481178ba227962cf0146b240eecba",
	name: "disputeFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => disputeFn.__executeServer(opts));
var disputeFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({ reason: stringType().trim().min(5).max(2e3) }).parse(d)).handler(disputeFn_createServerFn_handler, async ({ data }) => {
	await openDispute(await requireUser(), data.orderId, data.reason);
	return { ok: true };
});
var reviewFn_createServerFn_handler = createServerRpc({
	id: "e7d809d740b30ac2fb4d0fbe2a7efe052116f79cfc365b0d6c50ed88c60047d8",
	name: "reviewFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => reviewFn.__executeServer(opts));
var reviewFn = createServerFn({ method: "POST" }).validator((d) => reviewSchema.parse(d)).handler(reviewFn_createServerFn_handler, async ({ data }) => {
	await leaveReview(await requireUser(), data);
	return { ok: true };
});
var replyReviewFn_createServerFn_handler = createServerRpc({
	id: "5816df292b700eaf5886728c24aeb4c8da78081547ac6f853eb1cbbbc22a835b",
	name: "replyReviewFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => replyReviewFn.__executeServer(opts));
var replyReviewFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({ reply: stringType().trim().min(1).max(1e3) }).parse(d)).handler(replyReviewFn_createServerFn_handler, async ({ data }) => {
	await replyToReview(await requireUser("seller", "admin"), data.orderId, data.reply);
	return { ok: true };
});
//#endregion
export { checkoutFn_createServerFn_handler, confirmCheckoutFn_createServerFn_handler, confirmReceivedFn_createServerFn_handler, disputeFn_createServerFn_handler, fetchMyOrders_createServerFn_handler, fetchOrder_createServerFn_handler, replyReviewFn_createServerFn_handler, retryPaymentFn_createServerFn_handler, reviewFn_createServerFn_handler, sendMessageFn_createServerFn_handler };
