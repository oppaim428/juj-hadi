import { C as sendTemplate, E as tx, b as reviewSchema, f as m, l as listOffersSchema, m as one, r as checkoutSchema, s as exec, t as appUrl, x as rows } from "./auth.server-BtcIQrdK.mjs";
import { t as Stripe } from "../_libs/stripe.mjs";
import { createHmac, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.server-BlUc8kv0.js
var env = (k) => process.env[k] ?? "";
var _stripe;
var stripe = () => _stripe ??= new Stripe(env("STRIPE_SECRET_KEY"));
var paypalBase = () => env("PAYPAL_MODE") === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
var rzpAuth = () => `Basic ${Buffer.from(`${env("RAZORPAY_KEY_ID")}:${env("RAZORPAY_KEY_SECRET")}`).toString("base64")}`;
function configuredProviders() {
	return {
		stripe: !!env("STRIPE_SECRET_KEY"),
		paypal: !!(env("PAYPAL_CLIENT_ID") && env("PAYPAL_CLIENT_SECRET")),
		razorpay: !!(env("RAZORPAY_KEY_ID") && env("RAZORPAY_KEY_SECRET")),
		crypto: !!(env("NOWPAYMENTS_API_KEY") && env("NOWPAYMENTS_IPN_SECRET"))
	};
}
var returnUrl = (o, provider) => `${appUrl()}/checkout/return?order=${o.id}&provider=${provider}`;
var cancelUrl = (o) => `${appUrl()}/orders/${o.id}?cancelled=1`;
async function paypalToken() {
	const r = await fetch(`${paypalBase()}/v1/oauth2/token`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(`${env("PAYPAL_CLIENT_ID")}:${env("PAYPAL_CLIENT_SECRET")}`).toString("base64")}`,
			"content-type": "application/x-www-form-urlencoded"
		},
		body: "grant_type=client_credentials"
	});
	if (!r.ok) throw new Error(`PayPal auth failed ${r.status}`);
	return (await r.json()).access_token;
}
async function stripeSession(o) {
	const base = {
		mode: "payment",
		line_items: [{
			quantity: o.quantity,
			price_data: {
				currency: o.currency.toLowerCase(),
				unit_amount: o.unit,
				product_data: {
					name: o.title.slice(0, 250),
					tax_code: "txcd_10000000"
				}
			}
		}],
		success_url: `${returnUrl(o, "stripe")}&session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: cancelUrl(o),
		client_reference_id: String(o.id),
		metadata: { order_id: String(o.id) }
	};
	const attempts = [
		{ managed_payments: { enabled: true } },
		{
			automatic_tax: { enabled: true },
			billing_address_collection: "required"
		},
		{}
	];
	let last;
	for (const extra of attempts) try {
		return await stripe().checkout.sessions.create({
			...base,
			...extra
		});
	} catch (e) {
		last = e;
		if (!(e instanceof Stripe.errors.StripeInvalidRequestError)) throw e;
	}
	throw last;
}
async function createCheckout(provider, o) {
	const amount = (o.total / 100).toFixed(2);
	if (provider === "stripe") {
		const s = await stripeSession(o);
		return {
			url: s.url,
			externalId: s.id
		};
	}
	if (provider === "paypal") {
		const r = await fetch(`${paypalBase()}/v2/checkout/orders`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${await paypalToken()}`,
				"content-type": "application/json"
			},
			body: JSON.stringify({
				intent: "CAPTURE",
				purchase_units: [{
					reference_id: String(o.id),
					description: o.title.slice(0, 120),
					amount: {
						currency_code: o.currency,
						value: amount
					}
				}],
				application_context: {
					return_url: returnUrl(o, "paypal"),
					cancel_url: cancelUrl(o),
					user_action: "PAY_NOW",
					shipping_preference: "NO_SHIPPING"
				}
			})
		});
		const d = await r.json();
		const link = d.links?.find((l) => l.rel === "approve" || l.rel === "payer-action");
		if (!r.ok || !link) throw new Error(`PayPal order failed ${r.status}`);
		return {
			url: link.href,
			externalId: d.id
		};
	}
	if (provider === "razorpay") {
		const r = await fetch("https://api.razorpay.com/v1/payment_links", {
			method: "POST",
			headers: {
				Authorization: rzpAuth(),
				"content-type": "application/json"
			},
			body: JSON.stringify({
				amount: o.total,
				currency: o.currency,
				description: o.title.slice(0, 200),
				reference_id: `juj-${o.id}-${Date.now()}`,
				callback_url: returnUrl(o, "razorpay"),
				callback_method: "get",
				notify: {
					sms: false,
					email: false
				}
			})
		});
		const d = await r.json();
		if (!r.ok) throw new Error(`Razorpay link failed ${r.status}`);
		return {
			url: d.short_url,
			externalId: d.id
		};
	}
	const r = await fetch("https://api.nowpayments.io/v1/invoice", {
		method: "POST",
		headers: {
			"x-api-key": env("NOWPAYMENTS_API_KEY"),
			"content-type": "application/json"
		},
		body: JSON.stringify({
			price_amount: Number(amount),
			price_currency: o.currency.toLowerCase(),
			order_id: String(o.id),
			order_description: o.title.slice(0, 200),
			ipn_callback_url: `${appUrl()}/api/payments/crypto/ipn`,
			success_url: returnUrl(o, "crypto"),
			cancel_url: cancelUrl(o)
		})
	});
	const d = await r.json();
	if (!r.ok) throw new Error(`NOWPayments invoice failed ${r.status}`);
	return {
		url: d.invoice_url,
		externalId: String(d.id)
	};
}
/** Asks the provider whether the payment went through. Crypto is confirmed only by its signed IPN. */
async function checkPayment(provider, externalId, txStatus) {
	if (provider === "stripe") {
		const s = await stripe().checkout.sessions.retrieve(externalId);
		if (s.payment_status === "paid" || s.status === "complete") return "paid";
		return s.status === "expired" ? "failed" : "pending";
	}
	if (provider === "paypal") {
		const token = await paypalToken();
		const cap = await fetch(`${paypalBase()}/v2/checkout/orders/${encodeURIComponent(externalId)}/capture`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/json"
			}
		});
		if (cap.ok && (await cap.json()).status === "COMPLETED") return "paid";
		const st = (await (await fetch(`${paypalBase()}/v2/checkout/orders/${encodeURIComponent(externalId)}`, { headers: { Authorization: `Bearer ${token}` } })).json()).status;
		return st === "COMPLETED" ? "paid" : st === "VOIDED" ? "failed" : "pending";
	}
	if (provider === "razorpay") {
		const st = (await (await fetch(`https://api.razorpay.com/v1/payment_links/${encodeURIComponent(externalId)}`, { headers: { Authorization: rzpAuth() } })).json()).status;
		return st === "paid" ? "paid" : st === "cancelled" || st === "expired" ? "failed" : "pending";
	}
	return txStatus === "paid" ? "paid" : txStatus === "failed" ? "failed" : "pending";
}
async function refundPayment(provider, externalId) {
	if (provider !== "stripe") return false;
	try {
		const s = await stripe().checkout.sessions.retrieve(externalId);
		if (!s.payment_intent) return false;
		await stripe().refunds.create({ payment_intent: String(s.payment_intent) });
		return true;
	} catch (e) {
		console.error("[refund] stripe", e);
		return false;
	}
}
function stripeEvent(body, sig) {
	return stripe().webhooks.constructEvent(body, sig, env("STRIPE_WEBHOOK_SECRET"));
}
function sortKeys(v) {
	if (Array.isArray(v)) return v.map(sortKeys);
	if (v && typeof v === "object") return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]));
	return v;
}
function verifyNowPayments(body, sig) {
	const expected = createHmac("sha512", env("NOWPAYMENTS_IPN_SECRET")).update(JSON.stringify(sortKeys(body))).digest("hex");
	return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
var PROVIDERS = [
	"stripe",
	"paypal",
	"razorpay",
	"crypto"
];
async function getSettings() {
	const data = Object.fromEntries((await rows("SELECT setting_key, value FROM settings")).map((r) => [r.setting_key, r.value]));
	let methods = {};
	try {
		methods = JSON.parse(data.payment_methods ?? "{}");
	} catch {}
	return {
		site_name: data.site_name ?? "JUJ",
		support_email: data.support_email ?? "",
		auto_complete_hours: Number(data.auto_complete_hours ?? 72) || 72,
		payment_methods: Object.fromEntries(PROVIDERS.map((p) => [p, methods[p] !== false]))
	};
}
async function saveSettings(s) {
	const pairs = [
		["site_name", s.site_name],
		["support_email", s.support_email],
		["auto_complete_hours", String(s.auto_complete_hours)],
		["payment_methods", JSON.stringify(s.payment_methods)]
	];
	for (const [k, v] of pairs) await exec("INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [k, v]);
}
var tr = (alias, type, idExpr) => `LEFT JOIN content_translations ${alias} ON ${alias}.entity_type = '${type}' AND ${alias}.entity_id = ${idExpr} AND ${alias}.locale = ?`;
var OFFER_TR = tr("t", "offer", "CAST(o.id AS CHAR)");
var CARD = "o.id, o.slug, COALESCE(t.title, o.title) AS title, o.image_url, o.price_minor, o.old_price_minor, o.currency, o.sales_count";
async function getCategoryTree(locale) {
	const data = await rows(`SELECT c.id, c.parent_id, c.slug, COALESCE(t.title, c.name) AS name, c.icon, COALESCE(t.description, c.seo_text) AS seo_text,
       c.sort_order, c.show_in_header FROM categories c ${tr("t", "category", "c.id")} WHERE c.is_active = 1 ORDER BY c.sort_order`, [locale]);
	const nodes = /* @__PURE__ */ new Map();
	for (const c of data) nodes.set(c.id, {
		...c,
		children: []
	});
	const roots = [];
	for (const n of nodes.values()) {
		const parent = n.parent_id ? nodes.get(n.parent_id) : void 0;
		if (parent) parent.children.push(n);
		else if (!n.parent_id) roots.push(n);
	}
	return roots;
}
function flattenTree(tree) {
	return tree.flatMap((n) => [n, ...flattenTree(n.children)]);
}
function categoryPath(tree, id) {
	const byId = new Map(flattenTree(tree).map((n) => [n.id, n]));
	const path = [];
	let cur = byId.get(id);
	while (cur) {
		path.unshift(cur);
		cur = cur.parent_id ? byId.get(cur.parent_id) : void 0;
	}
	return path;
}
function subtreeIds(tree, slugValue) {
	const node = flattenTree(tree).find((n) => n.slug === slugValue);
	return node ? flattenTree([node]).map((n) => n.id) : null;
}
var encodeCursor = (c) => btoa(JSON.stringify(c)).replace(/=+$/, "");
function decodeCursor(s) {
	if (!s) return null;
	try {
		const c = JSON.parse(atob(s));
		if (Number.isSafeInteger(c.v) && Number.isSafeInteger(c.id)) return c;
	} catch {}
	return null;
}
async function listOffers(raw, locale) {
	const input = listOffersSchema.parse(raw);
	const where = ["o.status = 'active'"];
	const params = [locale];
	if (input.categorySlug) {
		const ids = subtreeIds(await getCategoryTree(locale), input.categorySlug);
		if (!ids?.length) return {
			items: [],
			nextCursor: null
		};
		where.push("o.category_id IN (?)");
		params.push(ids);
	}
	if (input.sellerId) {
		where.push("o.seller_id = ?");
		params.push(input.sellerId);
	}
	const term = input.q?.replace(/[%_\\]/g, " ").trim();
	if (term) {
		where.push("(o.title LIKE ? OR t.title LIKE ?)");
		params.push(`%${term}%`, `%${term}%`);
	}
	const c = decodeCursor(input.cursor);
	let order;
	switch (input.sort) {
		case "price_asc":
			if (c) {
				where.push("(o.price_minor > ? OR (o.price_minor = ? AND o.id > ?))");
				params.push(c.v, c.v, c.id);
			}
			order = "o.price_minor ASC, o.id ASC";
			break;
		case "price_desc":
			if (c) {
				where.push("(o.price_minor < ? OR (o.price_minor = ? AND o.id < ?))");
				params.push(c.v, c.v, c.id);
			}
			order = "o.price_minor DESC, o.id DESC";
			break;
		case "newest":
			if (c) {
				where.push("o.id < ?");
				params.push(c.id);
			}
			order = "o.id DESC";
			break;
		default:
			if (c) {
				where.push("(o.sales_count < ? OR (o.sales_count = ? AND o.id < ?))");
				params.push(c.v, c.v, c.id);
			}
			order = "o.sales_count DESC, o.id DESC";
	}
	params.push(input.limit + 1);
	const data = await rows(`SELECT ${CARD} FROM offers o ${OFFER_TR} WHERE ${where.join(" AND ")} ORDER BY ${order} LIMIT ?`, params);
	const hasMore = data.length > input.limit;
	const items = data.slice(0, input.limit);
	const last = items[items.length - 1];
	const sortVal = (o) => input.sort === "popular" ? o.sales_count : input.sort === "newest" ? o.id : o.price_minor;
	return {
		items,
		nextCursor: hasMore && last ? encodeCursor({
			v: sortVal(last),
			id: last.id
		}) : null
	};
}
async function getCategoryBySlug(slugValue, locale) {
	const tree = await getCategoryTree(locale);
	const node = flattenTree(tree).find((n) => n.slug === slugValue);
	if (!node) return null;
	const count = await one("SELECT COUNT(*) n FROM offers WHERE status = 'active' AND category_id IN (?)", [flattenTree([node]).map((n) => n.id)]);
	return {
		category: node,
		path: categoryPath(tree, node.id),
		offerCount: count?.n ?? 0
	};
}
async function getOffer(id, locale) {
	const offer = await one(`SELECT o.id, o.slug, COALESCE(t.title, o.title) AS title, COALESCE(t.description, o.description) AS description, o.image_url,
       o.price_minor, o.old_price_minor, o.currency, o.delivery_type, o.stock_count, o.sales_count, o.region, o.platform,
       o.category_id, o.seller_id, o.created_at FROM offers o ${OFFER_TR} WHERE o.id = ? AND o.status = 'active'`, [locale, id]);
	if (!offer) return null;
	const [options, fields, seller, tree] = await Promise.all([
		rows("SELECT id, label, price_minor, sort_order FROM offer_options WHERE offer_id = ? ORDER BY sort_order", [id]),
		rows("SELECT id, field_key AS `key`, label, type, select_options, required, sort_order FROM offer_input_fields WHERE offer_id = ? ORDER BY sort_order", [id]),
		getSeller(offer.seller_id),
		getCategoryTree(locale)
	]);
	return {
		offer,
		options,
		fields: fields.map((f) => ({
			...f,
			select_options: f.select_options ? JSON.parse(f.select_options) : []
		})),
		seller,
		categoryPath: categoryPath(tree, offer.category_id).map(({ children: _c, ...n }) => n)
	};
}
async function getSeller(id) {
	return one("SELECT user_id, display_name, bio, country, verification_status, rating_avg, rating_count, sales_count, created_at FROM seller_profiles WHERE user_id = ?", [id]);
}
var maskEmail = (e) => `${e.slice(0, 2)}***`;
async function getSellerReviews(sellerId, locale, limit = 20) {
	return (await rows(`SELECT r.id, r.rating, r.comment, r.seller_reply, r.created_at, u.email, COALESCE(t.title, o.title) AS offer_title
     FROM reviews r JOIN users u ON u.id = r.buyer_id JOIN offers o ON o.id = r.offer_id ${OFFER_TR}
     WHERE r.seller_id = ? AND r.status = 'visible' ORDER BY r.id DESC LIMIT ?`, [
		locale,
		sellerId,
		limit
	])).map(({ email, ...r }) => ({
		...r,
		buyer: maskEmail(email)
	}));
}
async function listFavorites(userId, locale) {
	return rows(`SELECT ${CARD} FROM favorites f JOIN offers o ON o.id = f.offer_id ${OFFER_TR} WHERE f.user_id = ? ORDER BY f.created_at DESC`, [locale, userId]);
}
async function setFavorite(userId, offerId, on) {
	if (on) await exec("INSERT IGNORE INTO favorites (user_id, offer_id) SELECT ?, id FROM offers WHERE id = ? AND status = 'active'", [userId, offerId]);
	else await exec("DELETE FROM favorites WHERE user_id = ? AND offer_id = ?", [userId, offerId]);
}
var sysMsg = (orderId, body, c) => exec("INSERT INTO order_messages (order_id, kind, body) VALUES (?, 'system', ?)", [orderId, body], c);
var emailOf = async (id) => (await one("SELECT email FROM users WHERE id = ?", [id]))?.email;
async function startPayment(order) {
	const { url, externalId } = await createCheckout(order.payment_provider, {
		id: order.id,
		title: order.offer_title + (order.option_label ? ` — ${order.option_label}` : ""),
		unit: order.unit_price_minor,
		quantity: order.quantity,
		total: order.total_minor,
		currency: order.currency
	});
	await exec("INSERT INTO payment_transactions (order_id, provider, external_id, amount_minor, currency) VALUES (?, ?, ?, ?, ?)", [
		order.id,
		order.payment_provider,
		externalId,
		order.total_minor,
		order.currency
	]);
	await exec("UPDATE orders SET payment_ref = ? WHERE id = ?", [externalId, order.id]);
	return url;
}
async function availableMethods() {
	const [settings, configured] = [await getSettings(), configuredProviders()];
	return Object.keys(configured).map((id) => ({
		id,
		available: settings.payment_methods[id] && configured[id]
	}));
}
async function createOrder(user, raw) {
	const input = checkoutSchema.parse(raw);
	if (!(await availableMethods()).find((x) => x.id === input.provider)?.available) return {
		ok: false,
		error: m("This payment method is not available right now.")
	};
	const offer = await one("SELECT o.id, o.seller_id, o.title, o.price_minor, o.currency, o.delivery_type, o.stock_count, c.commission_percent FROM offers o JOIN categories c ON c.id = o.category_id WHERE o.id = ? AND o.status = 'active'", [input.offerId]);
	if (!offer) return {
		ok: false,
		error: m("This offer isn't available.")
	};
	if (offer.seller_id === user.id) return {
		ok: false,
		error: m("You can't buy your own offer.")
	};
	if (offer.stock_count < input.quantity) return {
		ok: false,
		error: m("Not enough stock for this quantity.")
	};
	const options = await rows("SELECT id, label, price_minor FROM offer_options WHERE offer_id = ?", [offer.id]);
	const opt = options.find((o) => o.id === input.optionId);
	if (options.length && !opt) return {
		ok: false,
		error: m("Choose an option.")
	};
	const fields = await rows("SELECT field_key, label, type, select_options, required FROM offer_input_fields WHERE offer_id = ? ORDER BY sort_order", [offer.id]);
	const values = {};
	for (const f of fields) {
		const v = (input.inputs[f.field_key] ?? "").trim();
		if (!v) {
			if (f.required) return {
				ok: false,
				error: m("Please fill in all required fields.")
			};
			continue;
		}
		if (f.type === "number" && !/^\d{1,20}$/.test(v)) return {
			ok: false,
			error: m("Please fill in all required fields.")
		};
		if (f.type === "select" && !JSON.parse(f.select_options ?? "[]").includes(v)) return {
			ok: false,
			error: m("Please fill in all required fields.")
		};
		values[f.label] = v;
	}
	const unit = opt?.price_minor ?? offer.price_minor;
	const total = unit * input.quantity;
	const commission = Math.round(total * Number(offer.commission_percent) / 100);
	const order = await one("SELECT * FROM orders WHERE id = ?", [(await exec(`INSERT INTO orders (buyer_id, seller_id, offer_id, option_id, offer_title, option_label, quantity, unit_price_minor, total_minor,
       commission_minor, currency, input_values, delivery_type, payment_provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
		user.id,
		offer.seller_id,
		offer.id,
		opt?.id ?? null,
		offer.title,
		opt?.label ?? null,
		input.quantity,
		unit,
		total,
		commission,
		offer.currency,
		JSON.stringify(values),
		offer.delivery_type,
		input.provider
	])).insertId]);
	try {
		return {
			ok: true,
			orderId: order.id,
			url: await startPayment(order)
		};
	} catch (e) {
		console.error("[checkout]", e);
		await exec("UPDATE orders SET status = 'cancelled' WHERE id = ?", [order.id]);
		return {
			ok: false,
			error: m("Could not start the payment. Please try another method.")
		};
	}
}
async function retryPayment(user, orderId) {
	const order = await one("SELECT * FROM orders WHERE id = ? AND buyer_id = ? AND status = 'pending_payment'", [orderId, user.id]);
	if (!order) return {
		ok: false,
		error: m("This order can't be paid anymore.")
	};
	try {
		return {
			ok: true,
			url: await startPayment(order)
		};
	} catch (e) {
		console.error("[checkout:retry]", e);
		return {
			ok: false,
			error: m("Could not start the payment. Please try another method.")
		};
	}
}
/** Marks an order paid exactly once, then delivers codes automatically when the offer has them. */
async function markPaid(orderId) {
	const done = await tx(async (c) => {
		if ((await exec("UPDATE orders SET status = 'paid', paid_at = NOW() WHERE id = ? AND status = 'pending_payment'", [orderId], c)).affectedRows !== 1) return null;
		const o = await one("SELECT * FROM orders WHERE id = ?", [orderId], c);
		await exec("UPDATE offers SET stock_count = GREATEST(stock_count - ?, 0), sales_count = sales_count + ? WHERE id = ?", [
			o.quantity,
			o.quantity,
			o.offer_id
		], c);
		await exec("UPDATE seller_profiles SET pending_minor = pending_minor + ?, sales_count = sales_count + ? WHERE user_id = ?", [
			o.total_minor - o.commission_minor,
			o.quantity,
			o.seller_id
		], c);
		await sysMsg(orderId, m("Payment received. The money is held by the platform until the order is completed."), c);
		let delivered = false;
		if (o.delivery_type === "auto_codes") {
			const codes = await rows("SELECT id, code FROM offer_codes WHERE offer_id = ? AND status = 'available' ORDER BY id LIMIT ? FOR UPDATE", [o.offer_id, o.quantity], c);
			if (codes.length === o.quantity) {
				await exec("UPDATE offer_codes SET status = 'sold', order_id = ?, sold_at = NOW() WHERE id IN (?)", [orderId, codes.map((x) => x.id)], c);
				await exec("INSERT INTO order_messages (order_id, kind, body) VALUES (?, 'delivery', ?)", [orderId, codes.map((x) => x.code).join("\n")], c);
				await exec("UPDATE orders SET status = 'delivered', delivered_at = NOW() WHERE id = ?", [orderId], c);
				delivered = true;
			} else await sysMsg(orderId, m("Codes are out of stock right now. The seller will deliver your item manually."), c);
		}
		return {
			o,
			delivered
		};
	});
	if (!done) return;
	const [buyer, seller] = await Promise.all([emailOf(done.o.buyer_id), emailOf(done.o.seller_id)]);
	if (buyer) await sendTemplate(buyer, "order_paid", {
		orderId,
		title: done.o.offer_title,
		delivered: done.delivered
	});
	if (seller) await sendTemplate(seller, "new_order", {
		orderId,
		title: done.o.offer_title
	});
}
async function confirmPayment(orderId) {
	const order = await one("SELECT status, payment_provider FROM orders WHERE id = ?", [orderId]);
	if (!order || order.status !== "pending_payment") return order?.status ?? null;
	const t = await one("SELECT id, external_id, payment_status FROM payment_transactions WHERE order_id = ? ORDER BY id DESC LIMIT 1", [orderId]);
	if (!t) return order.status;
	let state = "pending";
	try {
		state = await checkPayment(order.payment_provider, t.external_id, t.payment_status);
	} catch (e) {
		console.error("[payment:check]", e);
	}
	if (state !== "pending") await exec("UPDATE payment_transactions SET status = ?, payment_status = ? WHERE id = ? AND payment_status <> 'paid'", [
		state === "paid" ? "completed" : "failed",
		state,
		t.id
	]);
	if (state === "paid") await markPaid(orderId);
	return (await one("SELECT status FROM orders WHERE id = ?", [orderId])).status;
}
/** Called by provider webhooks after their signature was verified. */
async function paymentNotified(provider, externalId, state) {
	const t = await one("SELECT id, order_id FROM payment_transactions WHERE provider = ? AND external_id = ?", [provider, externalId]);
	if (!t) return;
	await exec("UPDATE payment_transactions SET status = ?, payment_status = ? WHERE id = ? AND payment_status <> 'paid'", [
		state === "paid" ? "completed" : state,
		state,
		t.id
	]);
	if (state === "paid") await markPaid(t.order_id);
}
async function completeOrder(orderId, note = m("Order completed. The payment was released to the seller.")) {
	return tx(async (c) => {
		if ((await exec("UPDATE orders SET status = 'completed', completed_at = NOW() WHERE id = ? AND status IN ('paid', 'delivered', 'disputed')", [orderId], c)).affectedRows !== 1) return false;
		const o = await one("SELECT * FROM orders WHERE id = ?", [orderId], c);
		const net = o.total_minor - o.commission_minor;
		await exec("UPDATE seller_profiles SET pending_minor = GREATEST(pending_minor - ?, 0), balance_minor = balance_minor + ? WHERE user_id = ?", [
			net,
			net,
			o.seller_id
		], c);
		await sysMsg(orderId, note, c);
		return true;
	});
}
async function refundOrder(orderId) {
	if (!await tx(async (c) => {
		if ((await exec("UPDATE orders SET status = 'refunded' WHERE id = ? AND status IN ('paid', 'delivered', 'disputed')", [orderId], c)).affectedRows !== 1) return false;
		const o = await one("SELECT * FROM orders WHERE id = ?", [orderId], c);
		await exec("UPDATE seller_profiles SET pending_minor = GREATEST(pending_minor - ?, 0) WHERE user_id = ?", [o.total_minor - o.commission_minor, o.seller_id], c);
		return true;
	})) return false;
	const o = await one("SELECT payment_provider, payment_ref FROM orders WHERE id = ?", [orderId]);
	await sysMsg(orderId, (o.payment_ref ? await refundPayment(o.payment_provider, o.payment_ref) : false) ? m("The order was refunded to the buyer.") : m("The order was refunded. The admin sends the money back through the payment provider."));
	return true;
}
async function autoCompleteOrders() {
	const { auto_complete_hours } = await getSettings();
	const due = await rows("SELECT id FROM orders WHERE status = 'delivered' AND delivered_at < NOW() - INTERVAL ? HOUR LIMIT 100", [auto_complete_hours]);
	for (const d of due) await completeOrder(d.id, m("Order completed automatically. The payment was released to the seller."));
}
var LIST = `SELECT o.id, o.offer_id, o.offer_title, o.option_label, o.quantity, o.total_minor, o.currency, o.status, o.payment_provider,
  o.created_at, f.image_url FROM orders o JOIN offers f ON f.id = o.offer_id`;
async function listBuyerOrders(user) {
	await autoCompleteOrders();
	return rows(`${LIST} WHERE o.buyer_id = ? AND o.status <> 'cancelled' ORDER BY o.id DESC LIMIT 200`, [user.id]);
}
async function listSellerOrders(user, status) {
	await autoCompleteOrders();
	const params = [user.id];
	let where = "o.seller_id = ? AND o.status NOT IN ('pending_payment', 'cancelled')";
	if (status) {
		where += " AND o.status = ?";
		params.push(status);
	}
	return rows(`${LIST} WHERE ${where} ORDER BY o.id DESC LIMIT 200`, params);
}
async function getOrderDetail(user, id) {
	await autoCompleteOrders();
	const o = await one(`SELECT o.*, s.display_name AS seller_name, u.email AS buyer_email, f.image_url, f.slug FROM orders o
     JOIN seller_profiles s ON s.user_id = o.seller_id JOIN users u ON u.id = o.buyer_id JOIN offers f ON f.id = o.offer_id WHERE o.id = ?`, [id]);
	if (!o) return null;
	const role = user.role === "admin" ? "admin" : o.buyer_id === user.id ? "buyer" : o.seller_id === user.id ? "seller" : null;
	if (!role) return null;
	const [messages, review] = await Promise.all([rows("SELECT id, kind, body, created_at, sender_id FROM order_messages WHERE order_id = ? ORDER BY id", [id]), one("SELECT id, rating, comment, seller_reply, created_at FROM reviews WHERE order_id = ?", [id])]);
	const s = o.status;
	const open = [
		"paid",
		"delivered",
		"disputed"
	].includes(s);
	return {
		role,
		order: {
			id: o.id,
			offer_id: o.offer_id,
			slug: o.slug,
			image_url: o.image_url,
			offer_title: o.offer_title,
			option_label: o.option_label,
			quantity: o.quantity,
			unit_price_minor: o.unit_price_minor,
			total_minor: o.total_minor,
			commission_minor: o.commission_minor,
			currency: o.currency,
			status: s,
			payment_provider: o.payment_provider,
			delivery_type: o.delivery_type,
			seller_id: o.seller_id,
			seller_name: o.seller_name,
			buyer: role === "seller" ? maskEmail(o.buyer_email) : o.buyer_email,
			inputs: JSON.parse(o.input_values ?? "{}"),
			created_at: o.created_at,
			paid_at: o.paid_at,
			delivered_at: o.delivered_at,
			completed_at: o.completed_at
		},
		messages: messages.map((x) => ({
			...x,
			mine: x.sender_id === user.id,
			from: x.sender_id === o.buyer_id ? "buyer" : x.sender_id === o.seller_id ? "seller" : x.sender_id ? "admin" : "system"
		})),
		review,
		can: {
			pay: role === "buyer" && s === "pending_payment",
			confirm: role === "buyer" && (s === "paid" || s === "delivered"),
			dispute: role === "buyer" && (s === "paid" || s === "delivered"),
			review: role === "buyer" && s === "completed" && !review,
			deliver: role === "seller" && s === "paid",
			reply: role === "seller" && !!review && !review.seller_reply,
			message: s !== "pending_payment" && s !== "cancelled",
			resolve: role === "admin" && open,
			cancel: role === "admin" && s === "pending_payment"
		}
	};
}
async function orderFor(user, id) {
	const d = await getOrderDetail(user, id);
	if (!d) throw new Error(m("Order not found."));
	return d;
}
async function postMessage(user, orderId, body, deliver = false) {
	const d = await orderFor(user, orderId);
	if (!d.can.message) throw new Error(m("You can't write in this order."));
	if (deliver && !d.can.deliver) throw new Error(m("This order can't be delivered now."));
	await exec("INSERT INTO order_messages (order_id, sender_id, kind, body) VALUES (?, ?, ?, ?)", [
		orderId,
		user.id,
		deliver ? "delivery" : "message",
		body
	]);
	if (deliver) {
		await exec("UPDATE orders SET status = 'delivered', delivered_at = NOW() WHERE id = ? AND status = 'paid'", [orderId]);
		const buyer = await one("SELECT u.email FROM orders o JOIN users u ON u.id = o.buyer_id WHERE o.id = ?", [orderId]);
		if (buyer) await sendTemplate(buyer.email, "order_delivered", {
			orderId,
			title: d.order.offer_title
		});
	}
}
async function confirmReceived(user, orderId) {
	if (!(await orderFor(user, orderId)).can.confirm) throw new Error(m("This order can't be confirmed now."));
	await completeOrder(orderId);
}
async function openDispute(user, orderId, reason) {
	const d = await orderFor(user, orderId);
	if (!d.can.dispute) throw new Error(m("You can't open a dispute for this order."));
	if ((await exec("UPDATE orders SET status = 'disputed' WHERE id = ? AND status IN ('paid', 'delivered')", [orderId])).affectedRows !== 1) throw new Error(m("You can't open a dispute for this order."));
	await exec("INSERT INTO order_messages (order_id, sender_id, kind, body) VALUES (?, ?, 'message', ?)", [
		orderId,
		user.id,
		reason
	]);
	await sysMsg(orderId, m("The buyer opened a dispute. The platform team will review this order."));
	const seller = await emailOf(d.order.seller_id);
	if (seller) await sendTemplate(seller, "dispute", {
		orderId,
		title: d.order.offer_title
	});
}
async function leaveReview(user, raw) {
	const input = reviewSchema.parse(raw);
	const d = await orderFor(user, input.orderId);
	if (!d.can.review) throw new Error(m("You can review an order once it is completed."));
	await tx(async (c) => {
		await exec("INSERT INTO reviews (order_id, buyer_id, seller_id, offer_id, rating, comment) VALUES (?, ?, ?, ?, ?, ?)", [
			input.orderId,
			user.id,
			d.order.seller_id,
			d.order.offer_id,
			input.rating,
			input.comment || null
		], c);
		await exec("UPDATE seller_profiles SET rating_avg = ROUND((rating_avg * rating_count + ?) / (rating_count + 1), 2), rating_count = rating_count + 1 WHERE user_id = ?", [input.rating, d.order.seller_id], c);
	});
}
async function replyToReview(user, orderId, reply) {
	if (!(await orderFor(user, orderId)).can.reply) throw new Error(m("You can't reply to this review."));
	await exec("UPDATE reviews SET seller_reply = ? WHERE order_id = ? AND seller_id = ?", [
		reply,
		orderId,
		user.id
	]);
}
//#endregion
export { refundOrder as C, setFavorite as D, saveSettings as E, stripeEvent as O, postMessage as S, retryPayment as T, listFavorites as _, confirmPayment as a, openDispute as b, getCategoryBySlug as c, getOrderDetail as d, getSeller as f, listBuyerOrders as g, leaveReview as h, configuredProviders as i, verifyNowPayments as k, getCategoryTree as l, getSettings as m, availableMethods as n, confirmReceived as o, getSellerReviews as p, completeOrder as r, createOrder as s, autoCompleteOrders as t, getOffer as u, listOffers as v, replyToReview as w, paymentNotified as x, listSellerOrders as y };
