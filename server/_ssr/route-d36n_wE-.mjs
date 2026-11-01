import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as PanelLayout } from "./PanelLayout-DR36NCGf.mjs";
import { A as LayoutDashboard, L as Globe, N as Inbox, P as Image, R as FolderTree, b as Package, c as Store, d as ShoppingBag, l as StickyNote, n as Wallet, p as Settings, r as Users, w as MessageSquare } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-d36n_wE-.js
var import_jsx_runtime = require_jsx_runtime();
function Layout() {
	const { t } = useI18n();
	const nav = [
		{
			to: "/admin",
			label: t("Dashboard"),
			icon: LayoutDashboard,
			exact: true
		},
		{
			to: "/admin/orders",
			label: t("Orders"),
			icon: ShoppingBag
		},
		{
			to: "/admin/users",
			label: t("Users & sellers"),
			icon: Users
		},
		{
			to: "/admin/offers",
			label: t("Offers"),
			icon: Package
		},
		{
			to: "/admin/categories",
			label: t("Categories"),
			icon: FolderTree
		},
		{
			to: "/admin/reviews",
			label: t("Reviews"),
			icon: MessageSquare
		},
		{
			to: "/admin/payouts",
			label: t("Payouts"),
			icon: Wallet
		},
		{
			to: "/admin/banners",
			label: t("Banners"),
			icon: Image
		},
		{
			to: "/admin/pages",
			label: t("Pages"),
			icon: StickyNote
		},
		{
			to: "/admin/messages",
			label: t("Messages"),
			icon: Inbox
		},
		{
			to: "/admin/site",
			label: t("Website & colors"),
			icon: Globe
		},
		{
			to: "/admin/settings",
			label: t("Settings"),
			icon: Settings
		},
		{
			to: "/cabinet",
			label: t("My shop (seller)"),
			icon: Store
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLayout, {
		title: t("Admin panel"),
		nav,
		testId: "admin-panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { Layout as component };
