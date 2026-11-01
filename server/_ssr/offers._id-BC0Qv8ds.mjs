import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { r as useRootData } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { r as fromMinor, s as toMinor } from "./money-B4hGHpjt.mjs";
import { i as selectCls, t as PageTitle } from "./PanelLayout-DR36NCGf.mjs";
import { g as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ImageInput } from "./ImageInput-BOoZfMh-.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { d as saveOfferFn, r as deleteCodeFn, s as fetchSellerOffer, t as addCodesFn } from "./seller.functions-DBYRn_25.mjs";
import { n as flatten } from "./queries-BI1eUs-w.mjs";
import { t as Route } from "./offers._id-7l2Xlljr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers._id-BC0Qv8ds.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OptionsEditor({ rows, onChange }) {
	const { t } = useI18n();
	const upd = (i, p) => onChange(rows.map((r, j) => j === i ? {
		...r,
		...p
	} : r));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 rounded-xl border bg-card p-4",
		"data-testid": "options-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Options")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("For example 80 / 160 / 500 Robux. Each option has its own price.")
			})] }),
			rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: t("Label"),
						maxLength: 80,
						value: r.label,
						onChange: (e) => upd(i, { label: e.target.value }),
						"data-testid": `option-label-${i}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "4.99",
						inputMode: "decimal",
						className: "w-28",
						value: r.price,
						onChange: (e) => upd(i, { price: e.target.value }),
						"data-testid": `option-price-${i}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						"aria-label": "Remove",
						onClick: () => onChange(rows.filter((_, j) => j !== i)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "sm",
				variant: "secondary",
				"data-testid": "add-option",
				onClick: () => onChange([...rows, {
					label: "",
					price: ""
				}]),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
					" ",
					t("Add option")
				]
			})
		]
	});
}
function FieldsEditor({ rows, onChange }) {
	const { t } = useI18n();
	const upd = (i, p) => onChange(rows.map((r, j) => j === i ? {
		...r,
		...p
	} : r));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 rounded-xl border bg-card p-4",
		"data-testid": "fields-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: t("Buyer input fields")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("What you need from the buyer, like a username or region. Password fields are not allowed.")
			})] }),
			rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 rounded-lg border p-2 sm:grid-cols-[1fr_1fr_110px_auto_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "roblox_username",
						maxLength: 40,
						value: r.key,
						onChange: (e) => upd(i, { key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") }),
						"data-testid": `field-key-${i}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: t("Label"),
						maxLength: 80,
						value: r.label,
						onChange: (e) => upd(i, { label: e.target.value }),
						"data-testid": `field-label-${i}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: r.type,
						onChange: (e) => upd(i, { type: e.target.value }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "text",
								children: t("Text")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "number",
								children: t("Number")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "select",
								children: t("Choice")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: r.required,
								onChange: (e) => upd(i, { required: e.target.checked })
							}),
							" ",
							t("Required")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						"aria-label": "Remove",
						onClick: () => onChange(rows.filter((_, j) => j !== i)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					}),
					r.type === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "sm:col-span-5",
						placeholder: t("Choices, separated by commas"),
						value: r.options,
						onChange: (e) => upd(i, { options: e.target.value })
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "sm",
				variant: "secondary",
				"data-testid": "add-field",
				onClick: () => onChange([...rows, {
					key: "",
					label: "",
					type: "text",
					options: "",
					required: true
				}]),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
					" ",
					t("Add field")
				]
			})
		]
	});
}
function CodesManager({ offerId, codes, onChanged }) {
	const { t } = useI18n();
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3 rounded-xl border bg-card p-4",
		"data-testid": "codes-manager",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-lg font-bold",
				children: [
					t("Codes for instant delivery"),
					" (",
					codes.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("One code per line. Each sale sends the next code to the buyer automatically.")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 4,
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "XXXX-XXXX-XXXX",
				className: "font-mono",
				"data-testid": "codes-input"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				disabled: busy || !text.trim(),
				"data-testid": "codes-add",
				onClick: async () => {
					setBusy(true);
					try {
						const r = await addCodesFn({ data: {
							id: offerId,
							codes: text.split("\n")
						} });
						toast.success(t("{n} codes added", { n: r.added }));
						setText("");
						onChanged();
					} catch (e) {
						toast.error(t(e.message));
					}
					setBusy(false);
				},
				children: t("Add codes")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-64 divide-y overflow-y-auto rounded-lg border",
				children: codes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between px-3 py-1.5 font-mono text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: c.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						"aria-label": "Delete",
						"data-testid": `delete-code-${c.id}`,
						onClick: async () => {
							await deleteCodeFn({ data: { id: c.id } });
							onChanged();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})]
				}, c.id))
			})
		]
	});
}
var STOCK_IMAGES = [
	"robux",
	"giftcard",
	"topup",
	"limited",
	"console",
	"game",
	"software",
	"subscription"
].map((n) => `/images/offers/${n}.jpg`);
var blank = {
	title: "",
	description: "",
	category_id: "",
	image_url: STOCK_IMAGES[0],
	price: "",
	old_price: "",
	delivery_type: "auto_codes",
	stock_count: "0",
	status: "active",
	region: "",
	platform: ""
};
function Page() {
	const { id } = Route.useParams();
	const isNew = id === "new";
	const offerId = isNew ? 0 : Number(id);
	const { t } = useI18n();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { tree } = useRootData();
	const cats = flatten(tree);
	const q = useQuery({
		queryKey: ["seller-offer", offerId],
		queryFn: () => fetchSellerOffer({ data: { id: offerId } }),
		enabled: !isNew
	});
	const [f, setF] = (0, import_react.useState)(blank);
	const [options, setOptions] = (0, import_react.useState)([]);
	const [fields, setFields] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const d = q.data;
		if (!d?.offer) return;
		const o = d.offer;
		setF({
			title: String(o.title),
			description: String(o.description ?? ""),
			category_id: String(o.category_id),
			image_url: String(o.image_url ?? ""),
			price: fromMinor(Number(o.price_minor)),
			old_price: fromMinor(o.old_price_minor),
			delivery_type: o.delivery_type,
			stock_count: String(o.stock_count),
			status: o.status === "archived" ? "paused" : o.status,
			region: String(o.region ?? ""),
			platform: String(o.platform ?? "")
		});
		setOptions(d.options.map((x) => ({
			label: x.label,
			price: fromMinor(x.price_minor)
		})));
		setFields(d.fields.map((x) => ({
			key: x.key,
			label: x.label,
			type: x.type,
			options: x.select_options.join(", "),
			required: x.required
		})));
	}, [q.data]);
	const set = (k) => (e) => setF({
		...f,
		[k]: e.target.value
	});
	const save = async (e) => {
		e.preventDefault();
		const price = toMinor(f.price);
		const old = f.old_price.trim() ? toMinor(f.old_price) : null;
		const opts = options.map((o) => ({
			label: o.label,
			price_minor: toMinor(o.price)
		}));
		if (Number.isNaN(price) || old !== null && Number.isNaN(old) || opts.some((o) => Number.isNaN(o.price_minor))) return toast.error(t("Enter prices like 4.99"));
		setBusy(true);
		try {
			const r = await saveOfferFn({ data: {
				id: isNew ? void 0 : offerId,
				title: f.title,
				description: f.description,
				category_id: f.category_id,
				image_url: f.image_url,
				price_minor: price,
				old_price_minor: old,
				delivery_type: f.delivery_type,
				stock_count: Number(f.stock_count) || 0,
				status: f.status,
				region: f.region,
				platform: f.platform,
				options: opts,
				fields: fields.map((x) => ({
					key: x.key,
					label: x.label,
					type: x.type,
					required: x.required,
					select_options: x.options.split(",").map((s) => s.trim()).filter(Boolean)
				}))
			} });
			toast.success(t("Offer saved. Translations update in a minute."));
			qc.invalidateQueries({ queryKey: ["seller-offers"] });
			if (isNew) navigate({
				to: "/cabinet/offers/$id",
				params: { id: String(r.id) }
			});
			else qc.invalidateQueries({ queryKey: ["seller-offer", offerId] });
		} catch (err) {
			toast.error(t(err.message.split("\n")[0]));
		}
		setBusy(false);
	};
	if (!isNew && q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: t("Loading…")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, { children: isNew ? t("New offer") : t("Edit offer") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "space-y-5",
			"data-testid": "offer-editor-form",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								minLength: 3,
								maxLength: 160,
								value: f.title,
								onChange: set("title"),
								"data-testid": "offer-title-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Description") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 5,
								maxLength: 8e3,
								value: f.description,
								onChange: set("description"),
								"data-testid": "offer-description-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Category") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								className: `${selectCls} w-full`,
								value: f.category_id,
								onChange: set("category_id"),
								"data-testid": "offer-category-select",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "—"
								}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Status") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: `${selectCls} w-full`,
								value: f.status,
								onChange: set("status"),
								"data-testid": "offer-status-select",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "active",
										children: t("Active")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "paused",
										children: t("Paused")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "draft",
										children: t("Draft")
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Price (USD)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								inputMode: "decimal",
								placeholder: "4.99",
								value: f.price,
								onChange: set("price"),
								"data-testid": "offer-price-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Old price (optional)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: f.old_price,
								onChange: set("old_price"),
								"data-testid": "offer-old-price-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Delivery") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: `${selectCls} w-full`,
								value: f.delivery_type,
								onChange: set("delivery_type"),
								"data-testid": "offer-delivery-select",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "auto_codes",
									children: t("Instant codes")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "manual",
									children: t("Seller delivers by hand")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Stock") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: f.stock_count,
								onChange: set("stock_count"),
								"data-testid": "offer-stock-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Region") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								maxLength: 40,
								value: f.region,
								onChange: set("region"),
								"data-testid": "offer-region-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Platform") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								maxLength: 60,
								value: f.platform,
								onChange: set("platform"),
								"data-testid": "offer-platform-input"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 md:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("Image") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: STOCK_IMAGES.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setF({
											...f,
											image_url: src
										}),
										className: `h-14 w-14 overflow-hidden rounded-lg border-2 ${f.image_url === src ? "border-primary" : "border-transparent"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src,
											alt: "",
											className: "h-full w-full object-cover"
										})
									}, src))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
									value: f.image_url,
									onChange: (v) => setF({
										...f,
										image_url: v
									}),
									testId: "offer-image",
									previewClass: "h-24 w-24"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionsEditor, {
					rows: options,
					onChange: setOptions
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsEditor, {
					rows: fields,
					onChange: setFields
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: busy,
					"data-testid": "offer-save-button",
					children: busy ? t("Saving…") : t("Save offer")
				})
			]
		}),
		!isNew && f.delivery_type === "auto_codes" && q.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodesManager, {
			offerId,
			codes: q.data.codes,
			onChanged: () => {
				qc.invalidateQueries({ queryKey: ["seller-offer", offerId] });
				qc.invalidateQueries({ queryKey: ["seller-offers"] });
			}
		})
	] });
}
//#endregion
export { Page as component };
