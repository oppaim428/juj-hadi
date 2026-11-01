import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { S as useNavigate, p as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as formatPrice, o as salesBucket } from "./money-B4hGHpjt.mjs";
import { C as Minus, I as Heart, K as Bitcoin, M as IndianRupee, f as ShieldCheck, g as Plus, n as Wallet, u as Star, z as CreditCard } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { m as setFavoriteFn } from "./catalog.functions-Dh4mxjZI.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as favoritesQuery } from "./queries-BI1eUs-w.mjs";
import { t as Crumbs } from "./Crumbs-CM05IIuy.mjs";
import { t as Route } from "./catalog.product._offer-DyHBRKdx.mjs";
import { t as checkoutFn } from "./orders.functions-B_jXhxHU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.product._offer-D4aEmDOF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useMethodMeta() {
	const { t } = useI18n();
	return {
		stripe: {
			label: t("Card"),
			icon: CreditCard
		},
		paypal: {
			label: "PayPal",
			icon: Wallet
		},
		razorpay: {
			label: "Razorpay",
			icon: IndianRupee
		},
		crypto: {
			label: t("Crypto"),
			icon: Bitcoin
		}
	};
}
function BuyBox({ data }) {
	const { offer, options, fields, methods } = data;
	const { t } = useI18n();
	const { user } = useAuth();
	const navigate = useNavigate();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const meta = useMethodMeta();
	const [optId, setOptId] = (0, import_react.useState)(options[0]?.id ?? "");
	const [qty, setQty] = (0, import_react.useState)(1);
	const [inputs, setInputs] = (0, import_react.useState)(() => Object.fromEntries(fields.map((f) => [f.key, f.type === "select" ? f.select_options[0] ?? "" : ""])));
	const [provider, setProvider] = (0, import_react.useState)(methods.find((m) => m.available)?.id);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const opt = options.find((o) => o.id === optId);
	const unit = opt?.price_minor ?? offer.price_minor;
	const maxQty = Math.max(1, Math.min(10, offer.stock_count));
	const soldOut = offer.stock_count < 1;
	const buy = async () => {
		if (!user) return navigate({
			to: "/auth",
			search: { redirect: path }
		});
		if (!provider) return;
		setBusy(true);
		setErr(null);
		try {
			const r = await checkoutFn({ data: {
				offerId: offer.id,
				optionId: opt?.id,
				quantity: qty,
				inputs,
				provider
			} });
			if (!r.ok) {
				setErr(r.error);
				setBusy(false);
				return;
			}
			window.location.href = r.url;
		} catch (e) {
			setErr(e.message);
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		"data-testid": "buy-box",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-4xl font-bold",
					"data-testid": "offer-price",
					children: formatPrice(unit * qty, offer.currency)
				}), !opt && qty === 1 && offer.old_price_minor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg text-muted-foreground line-through",
					children: formatPrice(offer.old_price_minor, offer.currency)
				})]
			}),
			options.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "opt",
					children: t("Option")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "opt",
					"data-testid": "offer-option-select",
					value: optId,
					onChange: (e) => setOptId(e.target.value),
					className: "w-full rounded-md border bg-background px-3 py-2",
					children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: o.id,
						children: [
							o.label,
							" — ",
							formatPrice(o.price_minor, offer.currency)
						]
					}, o.id))
				})]
			}),
			fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
					htmlFor: f.key,
					children: [f.label, f.required && " *"]
				}), f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: f.key,
					"data-testid": `offer-field-${f.key}`,
					value: inputs[f.key],
					onChange: (e) => setInputs({
						...inputs,
						[f.key]: e.target.value
					}),
					className: "w-full rounded-md border bg-background px-3 py-2",
					children: f.select_options.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: f.key,
					"data-testid": `offer-field-${f.key}`,
					value: inputs[f.key],
					onChange: (e) => setInputs({
						...inputs,
						[f.key]: e.target.value
					}),
					type: f.type === "number" ? "number" : "text",
					maxLength: 200
				})]
			}, f.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Quantity") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-md border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "qty-minus",
								className: "p-2 disabled:opacity-40",
								disabled: qty <= 1,
								onClick: () => setQty(qty - 1),
								"aria-label": "-",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-center font-semibold",
								"data-testid": "qty-value",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "qty-plus",
								className: "p-2 disabled:opacity-40",
								disabled: qty >= maxQty,
								onClick: () => setQty(qty + 1),
								"aria-label": "+",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: soldOut ? t("Out of stock") : t("{n} in stock", { n: offer.stock_count })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Payment method") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: methods.map((m) => {
						const M = meta[m.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-testid": `payment-method-${m.id}`,
							disabled: !m.available,
							onClick: () => setProvider(m.id),
							className: `flex items-center gap-2 rounded-lg border px-3 py-2.5 text-start text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${provider === m.id ? "border-primary bg-accent font-semibold" : "hover:border-primary"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(M.icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: M.label
								}), !m.available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase leading-tight text-muted-foreground",
									children: t("Not set up")
								})]
							})]
						}, m.id);
					})
				})]
			}),
			err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				"data-testid": "buy-error",
				children: t(err)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "w-full",
				disabled: busy || soldOut || !provider,
				onClick: buy,
				"data-testid": "buy-button",
				children: busy ? t("Redirecting to payment…") : soldOut ? t("Out of stock") : t("Buy now")
			})
		]
	});
}
function FavoriteButton({ offerId }) {
	const { user } = useAuth();
	const { t } = useI18n();
	const qc = useQueryClient();
	const favs = useQuery(favoritesQuery(user?.id));
	const isFav = !!favs.data?.some((o) => o.id === offerId);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "outline",
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/auth",
			"data-testid": "favorite-signin-button",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" }),
				" ",
				t("Sign in to save to favorites")
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		className: "w-full",
		disabled: busy || favs.isPending,
		"data-testid": "favorite-toggle-button",
		onClick: async () => {
			setBusy(true);
			try {
				await setFavoriteFn({ data: {
					offerId,
					on: !isFav
				} });
				toast.success(isFav ? t("Removed from favorites") : t("Added to favorites"));
				await qc.invalidateQueries({ queryKey: ["favorites", user.id] });
			} catch {
				toast.error(t("Could not update favorites"));
			}
			setBusy(false);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${isFav ? "fill-primary text-primary" : ""}` }), isFav ? t("In favorites") : t("Add to favorites")]
	});
}
function OfferPage() {
	const data = Route.useLoaderData();
	const { offer, seller, categoryPath } = data;
	const { t, locale } = useI18n();
	const sales = salesBucket(offer.sales_count);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, {
				path: categoryPath,
				last: offer.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-square overflow-hidden rounded-2xl border bg-muted",
					children: offer.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: offer.image_url,
						alt: offer.title,
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold sm:text-3xl",
							"data-testid": "offer-title",
							children: offer.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								offer.platform,
								offer.region,
								sales && t("{n} sold", { n: sales }),
								offer.delivery_type === "auto_codes" ? t("Instant delivery") : t("Manual delivery")
							].filter(Boolean).join(" · ")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyBox, { data }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, { offerId: offer.id }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 rounded-xl border border-primary/40 bg-accent p-4 text-sm",
							"data-testid": "trust-box",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("Your money is held by the platform until you receive the item. We refund if it is not received or does not match the description.") })]
						}),
						seller && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border bg-card p-4",
							"data-testid": "seller-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase text-muted-foreground",
									children: t("Seller")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/seller/$id",
									params: { id: seller.user_id },
									"data-testid": "seller-card-link",
									className: "font-display text-lg font-semibold hover:underline",
									children: seller.display_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
										" ",
										Number(seller.rating_avg).toFixed(1),
										" · ",
										t("{n} reviews", { n: seller.rating_count }),
										" · ",
										t("{n} sales", { n: seller.sales_count.toLocaleString(locale) })
									]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-xl font-bold",
					children: t("About the product")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line text-muted-foreground",
					"data-testid": "offer-description",
					children: offer.description
				})]
			})
		]
	});
}
//#endregion
export { OfferPage as component };
