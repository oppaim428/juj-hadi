import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as formatPrice, s as toMinor, t as fmtDate } from "./money-B4hGHpjt.mjs";
import { i as selectCls, r as StatCard, t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { t as StatusBadge } from "./StatusBadge-C-vpbayq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as fetchPayouts, o as fetchSellerDashboard, u as requestPayoutFn } from "./seller.functions-DBYRn_25.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payouts-BuwG85VZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { t, locale } = useI18n();
	const qc = useQueryClient();
	const dash = useQuery({
		queryKey: ["seller-dash"],
		queryFn: () => fetchSellerDashboard()
	});
	const list = useQuery({
		queryKey: ["payouts"],
		queryFn: () => fetchPayouts()
	});
	const [f, setF] = (0, import_react.useState)({
		amount: "",
		method: "bank",
		details: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const p = dash.data?.profile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, { children: t("Payouts") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				testId: "payout-balance",
				label: t("Available balance"),
				value: formatPrice(p?.balance_minor ?? 0)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				testId: "payout-pending",
				label: t("On hold"),
				value: formatPrice(p?.pending_minor ?? 0)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-[140px_160px_1fr_auto] md:items-end",
			"data-testid": "payout-form",
			onSubmit: async (e) => {
				e.preventDefault();
				const amount = toMinor(f.amount);
				if (Number.isNaN(amount)) return toast.error(t("Enter prices like 4.99"));
				setBusy(true);
				try {
					await requestPayoutFn({ data: {
						amount_minor: amount,
						method: f.method,
						details: f.details
					} });
					toast.success(t("Payout requested"));
					setF({
						amount: "",
						method: f.method,
						details: ""
					});
					qc.invalidateQueries({ queryKey: ["payouts"] });
					qc.invalidateQueries({ queryKey: ["seller-dash"] });
				} catch (err) {
					toast.error(t(err.message.split("\n")[0]));
				}
				setBusy(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Amount (USD)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						inputMode: "decimal",
						value: f.amount,
						onChange: (e) => setF({
							...f,
							amount: e.target.value
						}),
						"data-testid": "payout-amount"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Method") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: `${selectCls} w-full`,
						value: f.method,
						onChange: (e) => setF({
							...f,
							method: e.target.value
						}),
						"data-testid": "payout-method",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "bank",
								children: t("Bank transfer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "paypal",
								children: "PayPal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "crypto",
								children: t("Crypto")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "other",
								children: t("Other")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Where to send it") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						minLength: 3,
						maxLength: 500,
						placeholder: t("IBAN, PayPal email or wallet address"),
						value: f.details,
						onChange: (e) => setF({
							...f,
							details: e.target.value
						}),
						"data-testid": "payout-details"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: busy,
					"data-testid": "payout-submit",
					children: t("Request payout")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "divide-y rounded-xl border bg-card",
			"data-testid": "payout-history",
			children: [(list.data ?? []).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-2 p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatPrice(x.amount_minor) }),
						" · ",
						x.method,
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: x.details
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							fmtDate(x.created_at, locale),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })
						]
					}),
					x.admin_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "w-full text-xs text-muted-foreground",
						children: x.admin_note
					})
				]
			}, x.id)), list.data && !list.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "p-6 text-center text-muted-foreground",
				children: t("No payouts yet.")
			})]
		})
	] });
}
//#endregion
export { Page as component };
