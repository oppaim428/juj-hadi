import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as formatPrice, t as fmtDate } from "./money-B4hGHpjt.mjs";
import { r as StatCard, t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
import { n as Stars } from "./Stars-BSAod481.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { f as saveSellerProfileFn, o as fetchSellerDashboard } from "./seller.functions-DBYRn_25.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cabinet-DcnNWSB9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileForm({ p }) {
	const { t } = useI18n();
	const qc = useQueryClient();
	const [f, setF] = (0, import_react.useState)({
		display_name: p.display_name,
		bio: p.bio ?? "",
		country: p.country ?? ""
	});
	(0, import_react.useEffect)(() => setF({
		display_name: p.display_name,
		bio: p.bio ?? "",
		country: p.country ?? ""
	}), [p]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 rounded-xl border bg-card p-4",
		"data-testid": "seller-profile-form",
		onSubmit: async (e) => {
			e.preventDefault();
			try {
				await saveSellerProfileFn({ data: f });
				toast.success(t("Saved"));
				qc.invalidateQueries({ queryKey: ["seller-dash"] });
			} catch (err) {
				toast.error(t(err.message));
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Shop profile")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_120px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Shop name") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.display_name,
						maxLength: 60,
						onChange: (e) => setF({
							...f,
							display_name: e.target.value
						}),
						"data-testid": "seller-display-name"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Country") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.country,
						maxLength: 2,
						placeholder: "US",
						onChange: (e) => setF({
							...f,
							country: e.target.value
						}),
						"data-testid": "seller-country"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("About your shop") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: f.bio,
					maxLength: 2e3,
					onChange: (e) => setF({
						...f,
						bio: e.target.value
					}),
					"data-testid": "seller-bio"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				"data-testid": "seller-profile-save",
				children: t("Save")
			})
		]
	});
}
function Page() {
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["seller-dash"],
		queryFn: () => fetchSellerDashboard()
	});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: t("Loading…")
	});
	const { profile: p, offers, orders, recent } = q.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				"data-testid": "dash-new-offer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cabinet/offers/$id",
					params: { id: "new" },
					children: t("New offer")
				})
			}),
			children: p.display_name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "stat-balance",
					label: t("Available balance"),
					value: formatPrice(p.balance_minor),
					hint: t("Ready to withdraw")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "stat-pending",
					label: t("On hold"),
					value: formatPrice(p.pending_minor),
					hint: t("Released when orders complete")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "stat-todo",
					label: t("Orders to deliver"),
					value: orders.todo,
					hint: orders.disputed ? t("{n} disputed", { n: orders.disputed }) : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					testId: "stat-offers",
					label: t("Active offers"),
					value: `${offers.active} / ${offers.total}`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-4 rounded-xl border bg-card p-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: p.rating_avg }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: Number(p.rating_avg).toFixed(2) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [
						t("{n} reviews", { n: p.rating_count }),
						" · ",
						t("{n} sales", { n: p.sales_count }),
						" · ",
						t("Earned"),
						": ",
						formatPrice(orders.revenue)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.verification_status })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: t("Recent orders")
					}),
					recent.length ? recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/orders/$id",
						params: { id: String(o.id) },
						className: "flex items-center justify-between gap-2 rounded-lg p-2 text-sm hover:bg-accent",
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
					}, o.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("No orders yet.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: fmtDate(/* @__PURE__ */ new Date(), locale)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, { p })]
		})
	] });
}
//#endregion
export { Page as component };
