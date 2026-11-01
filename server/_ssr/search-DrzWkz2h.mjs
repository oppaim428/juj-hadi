import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useRootData } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { t as OfferGrid } from "./OfferCard-wYrUBDkt.mjs";
import { t as Route } from "./search-CJP7o4ib.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DrzWkz2h.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q, category } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { tree } = useRootData();
	const { t } = useI18n();
	const term = q.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				"data-testid": "search-title",
				children: term ? t("Results for “{q}”", { q: term }) : t("Search")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [{
					slug: void 0,
					name: t("All")
				}, ...tree].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-testid": `search-filter-${c.slug ?? "all"}`,
					onClick: () => navigate({
						search: {
							q,
							category: c.slug
						},
						replace: true
					}),
					className: `rounded-full border px-3 py-1 text-sm ${category === c.slug ? "border-primary bg-accent" : "hover:border-primary"}`,
					children: c.name
				}, c.slug ?? "all"))
			}),
			term ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferGrid, { filter: {
				q: term,
				categorySlug: category
			} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-16 text-center text-muted-foreground",
				children: t("Type in the search bar above to find offers.")
			})
		]
	});
}
//#endregion
export { SearchPage as component };
