import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { t as fmtDate } from "./money-B4hGHpjt.mjs";
import { T as MessageSquareReply, u as Star } from "../_libs/lucide-react.mjs";
import { n as Stars } from "./Stars-BSAod481.mjs";
import { t as OfferGrid } from "./OfferCard-wYrUBDkt.mjs";
import { t as Route } from "./seller._id-_qtgSpRf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller._id-CH0XiFSM.js
var import_jsx_runtime = require_jsx_runtime();
function Reviews() {
	const { reviews } = Route.useLoaderData();
	const { t, locale } = useI18n();
	if (!reviews.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		"data-testid": "no-reviews",
		children: t("No reviews yet.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		"data-testid": "seller-reviews",
		children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "space-y-2 rounded-xl border bg-card p-4",
			"data-testid": `review-${r.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: r.rating }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: fmtDate(r.created_at, locale)
					})]
				}),
				r.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: r.comment
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						r.buyer,
						" · ",
						r.offer_title
					]
				}),
				r.seller_reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex gap-2 rounded-lg bg-muted p-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareReply, { className: "h-4 w-4 shrink-0" }),
						" ",
						r.seller_reply
					]
				})
			]
		}, r.id))
	});
}
function SellerPage() {
	const { seller: s } = Route.useLoaderData();
	const { t, locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold",
						"data-testid": "seller-name",
						children: s.display_name
					}),
					s.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-muted-foreground",
						children: s.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								"data-testid": "seller-rating",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
									" ",
									Number(s.rating_avg).toFixed(1),
									" (",
									t("{n} reviews", { n: s.rating_count }),
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("{n} sales", { n: s.sales_count.toLocaleString(locale) }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Member since {date}", { date: new Date(s.created_at).toLocaleDateString(locale, {
								month: "long",
								year: "numeric"
							}) }) }),
							s.verification_status === "verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-success",
								children: t("Verified")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold",
				children: t("Offers")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferGrid, { filter: { sellerId: s.user_id } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold",
				children: t("Buyer reviews")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {})
		]
	});
}
//#endregion
export { SellerPage as component };
