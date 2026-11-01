import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as formatPrice } from "./money-B4hGHpjt.mjs";
import { l as fetchAdminStats } from "./admin.functions-BYyVESXN.mjs";
import { r as StatCard, t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Cexx9NN_.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { t } = useI18n();
	const s = useQuery({
		queryKey: ["admin-stats"],
		queryFn: () => fetchAdminStats()
	}).data;
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: t("Loading…")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, { children: t("Dashboard") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-gmv",
					label: t("Sales volume"),
					value: formatPrice(s.gmv)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-commission",
					label: t("Platform earnings"),
					value: formatPrice(s.commission)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-disputes",
					label: t("Open disputes"),
					value: s.orders.disputed ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-payouts",
					label: t("Payout requests"),
					value: s.payouts.n,
					hint: formatPrice(s.payouts.amount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-buyers",
					label: t("Buyers"),
					value: s.users.buyer ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-sellers",
					label: t("Sellers"),
					value: s.users.seller ?? 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-offers",
					label: t("Active offers"),
					value: `${s.offers.active} / ${s.offers.total}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "admin-stat-todo",
					label: t("Orders to deliver"),
					value: s.orders.paid ?? 0
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-1 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Recent orders")
			}), s.recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/orders/$id",
				params: { id: String(o.id) },
				className: "flex justify-between gap-2 rounded-lg p-2 text-sm hover:bg-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate",
					children: [
						"#",
						o.id,
						" · ",
						o.offer_title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						formatPrice(o.total_minor, o.currency),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })
					]
				})]
			}, o.id))]
		})
	] });
}
//#endregion
export { Page as component };
