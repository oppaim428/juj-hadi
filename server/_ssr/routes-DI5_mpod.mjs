import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useRootData } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as flatten } from "./queries-BI1eUs-w.mjs";
import { t as OfferGrid } from "./OfferCard-wYrUBDkt.mjs";
import { t as BannerSlider } from "./BannerSlider-B-UTh8k8.mjs";
import { r as QuickChips } from "./Header-CJHAIqoj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DI5_mpod.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { tree } = useRootData();
	const { t } = useI18n();
	const all = flatten(tree);
	const tiles = all.filter((c) => c.parent_id === null || c.children.length === 0).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-10 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerSlider, { placement: "home" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10",
				"data-testid": "home-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-xl text-3xl font-bold sm:text-5xl",
					children: t("Digital goods, delivered instantly.")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg opacity-80",
					children: t("Robux, game keys, gift cards and subscriptions from trusted sellers. Your money is held until you get your item.")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickChips, { items: all.filter((c) => c.show_in_header) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-2xl font-bold",
				children: t("Categories")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: tiles.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog/$categorySlug",
					params: { categorySlug: c.slug },
					"data-testid": `category-tile-${c.slug}`,
					className: "rounded-xl border bg-card p-4 font-display font-semibold transition hover:border-primary hover:bg-accent",
					children: c.name
				}, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-2xl font-bold",
				children: t("Popular offers")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferGrid, { filter: { sort: "popular" } })] })
		]
	});
}
//#endregion
export { Index as component };
