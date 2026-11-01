import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as formatPrice, t as fmtDate } from "./money-B4hGHpjt.mjs";
import { i as selectCls, t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { n as orderStatusLabel, t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
import { l as fetchSellerOrders } from "./seller.functions-DBYRn_25.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BEUvd-iI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"paid",
	"delivered",
	"completed",
	"disputed",
	"refunded"
];
function Page() {
	const { t, locale } = useI18n();
	const [status, setStatus] = (0, import_react.useState)("");
	const q = useQuery({
		queryKey: ["seller-orders", status],
		queryFn: () => fetchSellerOrders({ data: { status: status || void 0 } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: selectCls,
			value: status,
			onChange: (e) => setStatus(e.target.value),
			"data-testid": "seller-orders-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: t("All")
			}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: s,
				children: orderStatusLabel(t, s)
			}, s))]
		}),
		children: t("Orders")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto rounded-xl border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-testid": "seller-orders-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "#" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Offer") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Total") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Status") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Date") })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (q.data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/orders/$id",
					params: { id: String(o.id) },
					className: "font-semibold underline",
					"data-testid": `seller-order-${o.id}`,
					children: ["#", o.id]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "max-w-xs truncate",
					children: [
						o.offer_title,
						o.option_label ? ` — ${o.option_label}` : "",
						" ×",
						o.quantity
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatPrice(o.total_minor, o.currency) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "whitespace-nowrap text-xs",
					children: fmtDate(o.created_at, locale, true)
				})
			] }, o.id)) })]
		}), q.data && !q.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-center text-muted-foreground",
			children: t("No orders yet.")
		})]
	})] });
}
//#endregion
export { Page as component };
