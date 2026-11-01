import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { t as Route } from "./catalog._categorySlug-CErA6IUW.mjs";
import { t as OfferGrid } from "./OfferCard-wYrUBDkt.mjs";
import { t as BannerSlider } from "./BannerSlider-B-UTh8k8.mjs";
import { t as Crumbs } from "./Crumbs-CM05IIuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog._categorySlug-B4Bjmnqx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category, path, offerCount } = Route.useLoaderData();
	const { sort = "popular" } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { t } = useI18n();
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const subs = showAll ? category.children : category.children.slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerSlider, { placement: "category" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { path }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold",
					"data-testid": "category-title",
					children: category.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					"data-testid": "category-offer-count",
					children: t("{n} offers", { n: offerCount })
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [t("Sort"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						"data-testid": "category-sort-select",
						onChange: (e) => navigate({
							search: { sort: e.target.value },
							replace: true
						}),
						className: "rounded-md border bg-background px-2 py-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "popular",
								children: t("Popular")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price_asc",
								children: t("Price: low to high")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price_desc",
								children: t("Price: high to low")
							})
						]
					})]
				})]
			}),
			category.children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [subs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog/$categorySlug",
					params: { categorySlug: c.slug },
					"data-testid": `subcategory-chip-${c.slug}`,
					className: "rounded-full border px-3 py-1 text-sm hover:border-primary hover:bg-accent",
					children: c.name
				}, c.id)), category.children.length > 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAll((v) => !v),
					className: "rounded-full px-3 py-1 text-sm text-primary underline-offset-2 hover:underline",
					children: showAll ? t("Show less") : t("Show all")
				})]
			}),
			category.seo_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-3xl text-sm text-muted-foreground",
				children: category.seo_text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferGrid, { filter: {
				categorySlug: category.slug,
				sort
			} })
		]
	});
}
//#endregion
export { CategoryPage as component };
