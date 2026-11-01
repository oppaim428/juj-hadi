import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { W as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Crumbs-CM05IIuy.js
var import_jsx_runtime = require_jsx_runtime();
function Crumbs({ path, last }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": "breadcrumbs",
		className: "flex flex-wrap items-center gap-1 text-sm text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "hover:text-foreground",
				children: t("Home")
			}),
			path.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 rtl:rotate-180" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog/$categorySlug",
					params: { categorySlug: c.slug },
					className: "hover:text-foreground",
					children: c.name
				})]
			}, c.id)),
			last && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 rtl:rotate-180" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-clamp-1 text-foreground",
					children: last
				})]
			})
		]
	});
}
//#endregion
export { Crumbs as t };
