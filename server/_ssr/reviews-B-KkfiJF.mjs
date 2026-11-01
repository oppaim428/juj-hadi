import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { t as fmtDate } from "./money-B4hGHpjt.mjs";
import { t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { n as Stars } from "./Stars-BSAod481.mjs";
import { i as fetchMyReviews } from "./seller.functions-DBYRn_25.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-B-KkfiJF.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["my-reviews"],
		queryFn: () => fetchMyReviews()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, { children: t("Reviews") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		"data-testid": "seller-reviews-list",
		children: [(q.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "space-y-1 rounded-xl border bg-card p-4",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: r.offer_title
				}),
				r.seller_reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-lg bg-muted p-2 text-xs",
					children: [
						t("Your reply"),
						": ",
						r.seller_reply
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders/$id",
					params: { id: String(r.order_id) },
					className: "text-xs text-primary underline",
					"data-testid": `reply-review-${r.order_id}`,
					children: t("Reply")
				})
			]
		}, r.order_id)), q.data && !q.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: t("No reviews yet.")
		})]
	})] });
}
//#endregion
export { Page as component };
