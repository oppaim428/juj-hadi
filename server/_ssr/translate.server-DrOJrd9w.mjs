import { a as literalType, i as enumType, l as stringType, n as booleanType, o as numberType, s as objectType, t as arrayType } from "../_libs/zod.mjs";
import { D as uuidSchema, s as exec, w as slug } from "./auth.server-BtcIQrdK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translate.server-DrOJrd9w.js
var minor = numberType().int().min(0).max(1e8);
var offerEditSchema = objectType({
	id: numberType().int().positive().optional(),
	title: stringType().trim().min(3).max(160),
	description: stringType().trim().max(8e3).default(""),
	category_id: uuidSchema,
	image_url: stringType().trim().max(500).regex(/^(https:\/\/|\/)/, "Use an https:// link or a /images path").or(literalType("")).default(""),
	price_minor: minor.min(1),
	old_price_minor: minor.nullable().default(null),
	delivery_type: enumType(["auto_codes", "manual"]),
	stock_count: numberType().int().min(0).max(1e6),
	status: enumType([
		"draft",
		"active",
		"paused"
	]),
	region: stringType().trim().max(40).default(""),
	platform: stringType().trim().max(60).default(""),
	options: arrayType(objectType({
		label: stringType().trim().min(1).max(80),
		price_minor: minor.min(1)
	})).max(30).default([]),
	fields: arrayType(objectType({
		key: stringType().regex(/^[a-z][a-z0-9_]{0,39}$/).refine((k) => !/pass|pwd|secret/i.test(k), "Password fields are not allowed"),
		label: stringType().trim().min(1).max(80).refine((l) => !/password/i.test(l), "Password fields are not allowed"),
		type: enumType([
			"text",
			"select",
			"number"
		]),
		select_options: arrayType(stringType().trim().min(1).max(80)).max(50).default([]),
		required: booleanType().default(true)
	})).max(10).default([])
});
var categoryEditSchema = objectType({
	id: uuidSchema.optional(),
	parent_id: uuidSchema.nullable(),
	slug,
	name: stringType().trim().min(1).max(120),
	icon: stringType().trim().max(60).default(""),
	seo_text: stringType().trim().max(2e3).default(""),
	commission_percent: numberType().min(0).max(100),
	sort_order: numberType().int().min(0).max(1e4),
	show_in_header: booleanType(),
	is_active: booleanType()
});
var payoutRequestSchema = objectType({
	amount_minor: numberType().int().min(100).max(1e8),
	method: enumType([
		"bank",
		"paypal",
		"crypto",
		"other"
	]),
	details: stringType().trim().min(3).max(500)
});
var settingsSchema = objectType({
	site_name: stringType().trim().min(1).max(60),
	support_email: stringType().trim().email().max(254),
	auto_complete_hours: numberType().int().min(1).max(720),
	payment_methods: objectType({
		stripe: booleanType(),
		paypal: booleanType(),
		razorpay: booleanType(),
		crypto: booleanType()
	})
});
var sellerProfileSchema = objectType({
	display_name: stringType().trim().min(2).max(60),
	bio: stringType().trim().max(2e3).default(""),
	country: stringType().trim().toUpperCase().regex(/^[A-Z]{2}$/).or(literalType("")).default("")
});
var TARGETS = [
	"ar",
	"fr",
	"ko",
	"id",
	"zh",
	"ru",
	"es"
];
/** AI-translates titles/descriptions via the helper service and stores them. Safe to fire-and-forget. */
async function translateItems(items) {
	const base = process.env.TRANSLATE_SERVICE_URL;
	if (!base || !items.length) return 0;
	try {
		const r = await fetch(`${base}/api/internal/translate`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-internal-secret": process.env.INTERNAL_API_SECRET ?? ""
			},
			body: JSON.stringify({
				items: items.map((i) => ({
					id: `${i.type}:${i.id}`,
					title: i.title,
					description: i.description
				})),
				locales: TARGETS
			})
		});
		if (!r.ok) throw new Error(`translate service ${r.status}`);
		const { results } = await r.json();
		let n = 0;
		for (const [key, byLocale] of Object.entries(results)) {
			const [type, id] = key.split(":");
			for (const [loc, v] of Object.entries(byLocale)) {
				if (!v.title) continue;
				await exec(`INSERT INTO content_translations (entity_type, entity_id, locale, title, description) VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description)`, [
					type,
					id,
					loc,
					v.title.slice(0, 255),
					v.description ?? null
				]);
				n++;
			}
		}
		return n;
	} catch (e) {
		console.error("[translate] failed", e);
		return 0;
	}
}
//#endregion
export { settingsSchema as a, sellerProfileSchema as i, offerEditSchema as n, translateItems as o, payoutRequestSchema as r, categoryEditSchema as t };
