import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { i as offerPath, n as formatPrice } from "./money-B4hGHpjt.mjs";
import { t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
import { Y as Archive, g as Plus, v as Pencil } from "../_libs/lucide-react.mjs";
import { t as ConfirmButton } from "./ConfirmButton-DuzhZhsy.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as fetchSellerOffers, n as archiveOfferFn } from "./seller.functions-DBYRn_25.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers.index-B7EUyZq_.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { t } = useI18n();
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["seller-offers"],
		queryFn: () => fetchSellerOffers()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			"data-testid": "new-offer-button",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cabinet/offers/$id",
				params: { id: "new" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
					" ",
					t("New offer")
				]
			})
		}),
		children: t("My offers")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto rounded-xl border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-testid": "seller-offers-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Offer") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Price") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Stock") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Sold") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("Status") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: (q.data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				"data-testid": `seller-offer-row-${o.id}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/catalog/product/$offer",
							params: { offer: offerPath(o.slug, o.id) },
							className: "line-clamp-1 font-medium hover:underline",
							children: o.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: o.delivery_type === "auto_codes" ? t("{n} codes ready", { n: o.codes }) : t("Manual delivery")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatPrice(o.price_minor, o.currency) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: o.stock_count }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: o.sales_count }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "whitespace-nowrap text-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "icon",
							variant: "ghost",
							"aria-label": "Edit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cabinet/offers/$id",
								params: { id: String(o.id) },
								"data-testid": `edit-offer-${o.id}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
							testId: `archive-offer-${o.id}`,
							question: t("Archive this offer? Buyers won't see it anymore."),
							onConfirm: async () => {
								await archiveOfferFn({ data: { id: o.id } });
								toast.success(t("Offer archived"));
								qc.invalidateQueries({ queryKey: ["seller-offers"] });
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "h-4 w-4" })
						})]
					})
				]
			}, o.id)) })]
		}), q.data && !q.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-center text-muted-foreground",
			children: t("No offers yet.")
		})]
	})] });
}
//#endregion
export { Page as component };
