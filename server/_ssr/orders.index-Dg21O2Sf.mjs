import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as formatPrice, t as fmtDate } from "./money-B4hGHpjt.mjs";
import { t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
import { b as Package } from "../_libs/lucide-react.mjs";
import { a as fetchMyOrders } from "./orders.functions-B_jXhxHU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.index-Dg21O2Sf.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["my-orders"],
		queryFn: () => fetchMyOrders()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-5 px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: t("My orders")
		}), q.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center text-muted-foreground",
			children: t("Loading…")
		}) : !q.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-16 text-center text-muted-foreground",
			"data-testid": "orders-empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto mb-3 h-10 w-10" }), t("No orders yet.")]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y rounded-xl border bg-card",
			"data-testid": "orders-list",
			children: q.data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/orders/$id",
				params: { id: String(o.id) },
				"data-testid": `order-row-${o.id}`,
				className: "flex items-center gap-4 p-4 transition-colors hover:bg-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted",
						children: o.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: o.image_url,
							alt: "",
							className: "h-full w-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate font-medium",
							children: [o.offer_title, o.option_label ? ` — ${o.option_label}` : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"#",
								o.id,
								" · ",
								fmtDate(o.created_at, locale),
								" · ×",
								o.quantity
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-bold",
							children: formatPrice(o.total_minor, o.currency)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })]
					})
				]
			}) }, o.id))
		})]
	});
}
//#endregion
export { Page as component };
