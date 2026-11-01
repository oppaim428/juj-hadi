//#region node_modules/.nitro/vite/services/ssr/assets/money-B4hGHpjt.js
/** Money is always stored as integer minor units (cents). */
function formatPrice(minor, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	}).format(minor / 100);
}
/** Sales count buckets: "100+", "1 000+", exact above 10 000. */
function salesBucket(n) {
	if (n > 1e4) return n.toLocaleString("en-US").replace(/,/g, " ");
	for (const s of [
		5e3,
		1e3,
		500,
		100,
		50,
		10
	]) if (n >= s) return `${s.toLocaleString("en-US").replace(/,/g, " ")}+`;
	return n > 0 ? String(n) : null;
}
function offerPath(slug, id) {
	return `${slug}-${id}`;
}
function parseOfferParam(param) {
	const m = /-(\d+)$/.exec(param) ?? /^(\d+)$/.exec(param);
	if (!m) return null;
	const id = Number(m[1]);
	return Number.isSafeInteger(id) && id > 0 ? id : null;
}
var fmtDate = (d, locale, time = false) => d ? new Date(d).toLocaleString(locale, time ? {
	dateStyle: "medium",
	timeStyle: "short"
} : { dateStyle: "medium" }) : "—";
/** "12.50" -> 1250 cents; returns NaN for bad input. */
var toMinor = (v) => /^\d+(\.\d{1,2})?$/.test(v.trim()) ? Math.round(Number(v) * 100) : NaN;
var fromMinor = (n) => n == null ? "" : (n / 100).toFixed(2);
//#endregion
export { parseOfferParam as a, offerPath as i, formatPrice as n, salesBucket as o, fromMinor as r, toMinor as s, fmtDate as t };
