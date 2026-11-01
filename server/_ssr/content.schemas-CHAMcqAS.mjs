import { a as literalType, i as enumType, l as stringType, n as booleanType, o as numberType, s as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.schemas-CHAMcqAS.js
var imageUrl = stringType().trim().max(500).regex(/^(https:\/\/|\/)/, "Use an https:// link or upload an image").or(literalType(""));
var GLOWS = [
	"green",
	"orange",
	"yellow",
	"blue"
];
var siteInfoSchema = objectType({
	site_name: stringType().trim().min(1).max(60),
	site_tagline: stringType().trim().max(255).default(""),
	logo_url: imageUrl.default(""),
	favicon_url: imageUrl.default(""),
	default_glow: enumType(GLOWS).default("orange"),
	contact_email: stringType().trim().email().max(254).or(literalType("")).default(""),
	contact_phone: stringType().trim().max(40).default(""),
	contact_address: stringType().trim().max(255).default(""),
	social_links: stringType().trim().max(2e3).default("")
});
var bannerSchema = objectType({
	id: numberType().int().positive().optional(),
	title: stringType().trim().max(120).default(""),
	subtitle: stringType().trim().max(255).default(""),
	image_url: imageUrl.refine((v) => v !== "", "Add an image"),
	link_url: stringType().trim().max(500).regex(/^(https:\/\/|\/)/, "Links start with / or https://").or(literalType("")).default(""),
	button_label: stringType().trim().max(40).default(""),
	placement: enumType([
		"home",
		"category",
		"both"
	]).default("home"),
	sort_order: numberType().int().min(0).max(9999).default(0),
	is_active: booleanType().default(true)
});
var pageSchema = objectType({
	id: numberType().int().positive().optional(),
	slug: stringType().trim().toLowerCase().regex(/^[a-z0-9-]{1,80}$/, "Use lowercase letters, numbers and dashes"),
	title: stringType().trim().min(1).max(150),
	body: stringType().max(1e5).default(""),
	is_published: booleanType().default(true),
	show_in_footer: booleanType().default(true),
	sort_order: numberType().int().min(0).max(9999).default(0)
});
var contactSchema = objectType({
	name: stringType().trim().min(1).max(100),
	email: stringType().trim().email().max(254),
	subject: stringType().trim().max(150).default(""),
	message: stringType().trim().min(5).max(5e3)
});
/** "Label | https://url" per line. */
var parseSocial = (s) => s.split("\n").map((l) => l.split("|").map((x) => x.trim())).filter((p) => p.length === 2 && !!p[0] && /^https:\/\//.test(p[1] ?? ""));
//#endregion
export { parseSocial as a, pageSchema as i, bannerSchema as n, siteInfoSchema as o, contactSchema as r, GLOWS as t };
