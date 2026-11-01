import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { i as offerPath, n as formatPrice, o as salesBucket } from "./money-B4hGHpjt.mjs";
import { r as offersInfiniteQuery } from "./queries-BI1eUs-w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OfferCard-wYrUBDkt.js
var import_jsx_runtime = require_jsx_runtime();
function OfferCard({ o }) {
	const { t } = useI18n();
	const sales = salesBucket(o.sales_count);
	const to = {
		to: "/catalog/product/$offer",
		params: { offer: offerPath(o.slug, o.id) }
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:border-primary",
		"data-testid": `offer-card-${o.id}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			...to,
			className: "block aspect-square overflow-hidden bg-muted",
			children: o.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: o.image_url,
				alt: o.title,
				loading: "lazy",
				className: "h-full w-full object-cover transition group-hover:scale-105"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-1 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						"data-testid": "offer-card-price",
						children: formatPrice(o.price_minor, o.currency)
					}), o.old_price_minor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground line-through",
						children: formatPrice(o.old_price_minor, o.currency)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					...to,
					className: "line-clamp-2 text-sm leading-snug hover:underline",
					"data-testid": "offer-card-title",
					children: o.title
				}),
				sales && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: t("{n} sold", { n: sales })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "mt-auto w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						...to,
						"data-testid": `offer-card-buy-${o.id}`,
						children: t("Buy")
					})
				})
			]
		})]
	});
}
function OfferGridView({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
		children: items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, { o }, o.id))
	});
}
/** Offers grid with "Show more" (cursor-based load more). */
function OfferGrid({ filter }) {
	const { t } = useI18n();
	const q = useInfiniteQuery(offersInfiniteQuery(filter));
	const items = q.data?.pages.flatMap((p) => p.items) ?? [];
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center text-destructive",
		"data-testid": "offers-error",
		children: [
			t("Could not load offers. Please try again."),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "link",
				onClick: () => q.refetch(),
				children: t("Retry")
			})
		]
	});
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-16 text-center text-muted-foreground",
		children: t("Loading offers…")
	});
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-16 text-center text-muted-foreground",
		"data-testid": "no-offers",
		children: t("No offers found.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferGridView, { items }), q.hasNextPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => q.fetchNextPage(),
				disabled: q.isFetchingNextPage,
				"data-testid": "show-more-button",
				children: q.isFetchingNextPage ? t("Loading…") : t("Show more")
			})
		})]
	});
}
//#endregion
export { OfferGridView as n, OfferGrid as t };
