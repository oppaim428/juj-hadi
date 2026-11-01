import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as PanelLayout } from "./PanelLayout-DR36NCGf.mjs";
import { A as LayoutDashboard, b as Package, d as ShoppingBag, n as Wallet, w as MessageSquare } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-D0yEuL_1.js
var import_jsx_runtime = require_jsx_runtime();
function Layout() {
	const { t } = useI18n();
	const nav = [
		{
			to: "/cabinet",
			label: t("Dashboard"),
			icon: LayoutDashboard,
			exact: true
		},
		{
			to: "/cabinet/offers",
			label: t("Offers"),
			icon: Package
		},
		{
			to: "/cabinet/orders",
			label: t("Orders"),
			icon: ShoppingBag
		},
		{
			to: "/cabinet/payouts",
			label: t("Payouts"),
			icon: Wallet
		},
		{
			to: "/cabinet/reviews",
			label: t("Reviews"),
			icon: MessageSquare
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLayout, {
		title: t("Seller cabinet"),
		nav,
		testId: "seller-cabinet",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { Layout as component };
