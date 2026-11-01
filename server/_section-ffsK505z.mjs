import { o as __toESM } from "./_runtime.mjs";
import { t as GLOWS } from "./_ssr/content.schemas-CHAMcqAS.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-BkEeRci-.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { C as useRouter, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as useQuery, o as useQueryClient } from "./_libs/tanstack__react-query.mjs";
import { r as useRootData } from "./_ssr/useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./_ssr/i18n-WFJnVUKq.mjs";
import { c as saveBannerFn, d as setMessageStatusFn, i as fetchAdminPages, l as savePageFn, n as deletePageFn, o as fetchMessages, r as fetchAdminBanners, t as deleteBannerFn, u as saveSiteInfoFn } from "./_ssr/content.functions-B4GAVbjF.mjs";
import { t as Route } from "./_section-Bk4FypOq.mjs";
import { n as formatPrice, t as fmtDate } from "./_ssr/money-B4hGHpjt.mjs";
import { _ as setReviewStatusFn, a as fetchAdminPayouts, c as fetchAdminSettings, d as processPayoutFn, f as resolveOrderFn, g as setOfferStatusFn, h as saveSettingsFn, i as fetchAdminOrders, m as saveCategoryFn, n as fetchAdminCategories, o as fetchAdminReviews, p as retranslateFn, r as fetchAdminOffers, s as fetchAdminSellers, t as deleteCategoryFn, u as fetchAdminUsers, v as setSellerVerificationFn, y as updateUserFn } from "./_ssr/admin.functions-BYyVESXN.mjs";
import { i as selectCls, t as PageTitle } from "./_ssr/PanelLayout-DR36NCGf.mjs";
import { n as orderStatusLabel, t as StatusBadge } from "./_ssr/StatusBadge-C-vpbayq.mjs";
import { n as Stars } from "./_ssr/Stars-BSAod481.mjs";
import { t as ConfirmButton } from "./_ssr/ConfirmButton-DuzhZhsy.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as ImageInput } from "./_ssr/ImageInput-BOoZfMh-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_section-ffsK505z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useRun$1(keys) {
	const qc = useQueryClient();
	const router = useRouter();
	const { t } = useI18n();
	return async (fn, ok = t("Saved")) => {
		try {
			await fn();
			toast.success(ok);
			for (const k of keys) qc.invalidateQueries({ queryKey: [k] });
			if (keys.includes("site-info")) await router.invalidate();
			return true;
		} catch (e) {
			toast.error(t(e.message.split("\n")[0] ?? ""));
			return false;
		}
	};
}
var Field = ({ label, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
	className: "block space-y-1 text-sm",
	children: [label, children]
});
var Check = ({ label, checked, onChange, testId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
	className: "flex items-center gap-2 text-sm",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked),
			"data-testid": testId
		}),
		" ",
		label
	]
});
var emptyBanner = {
	id: void 0,
	title: "",
	subtitle: "",
	image_url: "",
	link_url: "",
	button_label: "",
	placement: "home",
	sort_order: 0,
	is_active: true
};
function BannersAdmin() {
	const { t } = useI18n();
	const run = useRun$1(["admin-banners", "banners"]);
	const d = useQuery({
		queryKey: ["admin-banners"],
		queryFn: () => fetchAdminBanners()
	});
	const [f, setF] = (0, import_react.useState)(emptyBanner);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-2",
		"data-testid": "banner-form",
		onSubmit: async (e) => {
			e.preventDefault();
			if (await run(() => saveBannerFn({ data: f }))) setF(emptyBanner);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("Banner image (wide, e.g. 1600×500)"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
						value: f.image_url,
						onChange: (v) => setF({
							...f,
							image_url: v
						}),
						testId: "banner-image",
						previewClass: "h-24 w-full max-w-md"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.title,
					maxLength: 120,
					onChange: (e) => setF({
						...f,
						title: e.target.value
					}),
					"data-testid": "banner-title"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Subtitle"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.subtitle,
					maxLength: 255,
					onChange: (e) => setF({
						...f,
						subtitle: e.target.value
					}),
					"data-testid": "banner-subtitle"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Link (/catalog/… or https://…)"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.link_url,
					onChange: (e) => setF({
						...f,
						link_url: e.target.value
					}),
					"data-testid": "banner-link"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Button text"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.button_label,
					maxLength: 40,
					onChange: (e) => setF({
						...f,
						button_label: e.target.value
					}),
					"data-testid": "banner-button"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Show on"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: `${selectCls} w-full`,
					value: f.placement,
					onChange: (e) => setF({
						...f,
						placement: e.target.value
					}),
					"data-testid": "banner-placement",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "home",
							children: t("Home page")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "category",
							children: t("Category pages")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "both",
							children: t("Home and category pages")
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Sort order"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: f.sort_order,
					onChange: (e) => setF({
						...f,
						sort_order: Number(e.target.value)
					}),
					"data-testid": "banner-sort"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				label: t("Active"),
				checked: f.is_active,
				onChange: (v) => setF({
					...f,
					is_active: v
				}),
				testId: "banner-active"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 md:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					"data-testid": "banner-save",
					children: f.id ? t("Save") : t("Add banner")
				}), f.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					type: "button",
					variant: "ghost",
					onClick: () => setF(emptyBanner),
					children: t("Cancel")
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "grid gap-3 sm:grid-cols-2",
		"data-testid": "admin-banners-list",
		children: [(d.data ?? []).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "overflow-hidden rounded-xl border bg-card",
			"data-testid": `admin-banner-${b.id}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: b.image_url,
				alt: "",
				className: "h-28 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1 truncate",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: b.title || t("(no title)") }),
							" · ",
							b.placement,
							" · #",
							b.sort_order,
							" ",
							!b.is_active && `· ${t("Hidden")}`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						"data-testid": `admin-banner-edit-${b.id}`,
						onClick: () => setF({
							...b,
							is_active: !!b.is_active
						}),
						children: t("Edit")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
						testId: `admin-banner-delete-${b.id}`,
						question: t("Delete this banner?"),
						onConfirm: () => run(() => deleteBannerFn({ data: { id: b.id } })),
						children: t("Delete")
					})
				]
			})]
		}, b.id)), d.data && !d.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "p-6 text-muted-foreground",
			children: t("No banners yet.")
		})]
	})] });
}
var emptyPage = {
	id: void 0,
	slug: "",
	title: "",
	body: "",
	is_published: true,
	show_in_footer: true,
	sort_order: 0
};
function PagesAdmin() {
	const { t } = useI18n();
	const run = useRun$1(["admin-pages", "site-info"]);
	const d = useQuery({
		queryKey: ["admin-pages"],
		queryFn: () => fetchAdminPages()
	});
	const [f, setF] = (0, import_react.useState)(emptyPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-3",
		"data-testid": "page-form",
		onSubmit: async (e) => {
			e.preventDefault();
			if (await run(() => savePageFn({ data: f }))) setF(emptyPage);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: f.title,
					maxLength: 150,
					onChange: (e) => setF({
						...f,
						title: e.target.value,
						slug: f.id ? f.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
					}),
					"data-testid": "page-title-input"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Address: /pages/…"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: f.slug,
					onChange: (e) => setF({
						...f,
						slug: e.target.value.toLowerCase()
					}),
					"data-testid": "page-slug-input"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("Sort order"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: f.sort_order,
					onChange: (e) => setF({
						...f,
						sort_order: Number(e.target.value)
					}),
					"data-testid": "page-sort-input"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("Content — blank line = new paragraph, start a line with ## for a heading"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 10,
						value: f.body,
						onChange: (e) => setF({
							...f,
							body: e.target.value
						}),
						"data-testid": "page-body-input"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				label: t("Published"),
				checked: f.is_published,
				onChange: (v) => setF({
					...f,
					is_published: v
				}),
				testId: "page-published"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				label: t("Show in footer"),
				checked: f.show_in_footer,
				onChange: (v) => setF({
					...f,
					show_in_footer: v
				}),
				testId: "page-footer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					"data-testid": "page-save",
					children: f.id ? t("Save") : t("Add page")
				}), f.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					type: "button",
					variant: "ghost",
					onClick: () => setF(emptyPage),
					children: t("Cancel")
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y rounded-xl border bg-card",
		"data-testid": "admin-pages-list",
		children: (d.data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center gap-2 p-3 text-sm",
			"data-testid": `admin-page-${p.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.title }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"/pages/",
								p.slug,
								" ",
								!p.is_published && `· ${t("Draft")}`
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pages/$slug",
					params: { slug: p.slug },
					className: "text-sm underline",
					"data-testid": `admin-page-view-${p.slug}`,
					children: t("View")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					"data-testid": `admin-page-edit-${p.slug}`,
					onClick: () => setF({
						...p,
						is_published: !!p.is_published,
						show_in_footer: !!p.show_in_footer
					}),
					children: t("Edit")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
					testId: `admin-page-delete-${p.slug}`,
					question: t("Delete this page?"),
					onConfirm: () => run(() => deletePageFn({ data: { id: p.id } })),
					children: t("Delete")
				})
			]
		}, p.id))
	})] });
}
function MessagesAdmin() {
	const { t, locale } = useI18n();
	const [status, setStatus] = (0, import_react.useState)("");
	const run = useRun$1(["admin-messages"]);
	const d = useQuery({
		queryKey: ["admin-messages", status],
		queryFn: () => fetchMessages({ data: { status: status || void 0 } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		className: selectCls,
		value: status,
		onChange: (e) => setStatus(e.target.value),
		"data-testid": "admin-messages-filter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: t("All")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "new",
				children: t("New")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "read",
				children: t("Read")
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "space-y-3",
		"data-testid": "admin-messages-list",
		children: [(d.data ?? []).map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: `space-y-2 rounded-xl border bg-card p-4 text-sm ${msg.status === "new" ? "border-primary" : ""}`,
			"data-testid": `admin-message-${msg.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: msg.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`,
							className: "underline",
							children: msg.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: fmtDate(msg.created_at, locale)
						}),
						msg.status === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground",
							children: t("New")
						})
					]
				}),
				msg.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: msg.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line break-words text-muted-foreground",
					children: msg.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						"data-testid": `admin-message-toggle-${msg.id}`,
						onClick: () => run(() => setMessageStatusFn({ data: {
							id: msg.id,
							status: msg.status === "new" ? "read" : "new"
						} })),
						children: msg.status === "new" ? t("Mark as read") : t("Mark as new")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
						testId: `admin-message-delete-${msg.id}`,
						question: t("Delete this message?"),
						onConfirm: () => run(() => setMessageStatusFn({ data: {
							id: msg.id,
							status: "delete"
						} })),
						children: t("Delete")
					})]
				})
			]
		}, msg.id)), d.data && !d.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "rounded-xl border bg-card p-6 text-center text-muted-foreground",
			children: t("No messages.")
		})]
	})] });
}
var glowSwatch = {
	green: "oklch(0.75 0.18 127)",
	orange: "oklch(0.7 0.21 45)",
	yellow: "oklch(0.9 0.2 95)",
	blue: "oklch(0.55 0.25 260)"
};
function SiteAdmin() {
	const { t } = useI18n();
	const { site } = useRootData();
	const run = useRun$1(["site-info"]);
	const [s, setS] = (0, import_react.useState)(site);
	(0, import_react.useEffect)(() => setS(site), [site]);
	const set = (k) => (e) => setS({
		...s,
		[k]: e.target.value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-6",
		"data-testid": "site-form",
		onSubmit: (e) => {
			e.preventDefault();
			run(() => saveSiteInfoFn({ data: s })).then(() => {
				try {
					if (!localStorage.getItem("juj-glow")) document.documentElement.dataset["glow"] = s.default_glow;
				} catch {}
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold md:col-span-2",
						children: t("Website info")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Site name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							value: s.site_name,
							maxLength: 60,
							onChange: set("site_name"),
							"data-testid": "site-name"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Tagline (footer)"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: s.site_tagline,
							maxLength: 255,
							onChange: set("site_tagline"),
							"data-testid": "site-tagline"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Logo (leave empty to show the site name)"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
							value: s.logo_url,
							onChange: (v) => setS({
								...s,
								logo_url: v
							}),
							testId: "site-logo",
							previewClass: "h-12 w-auto"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Favicon (square PNG or ICO)"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageInput, {
							value: s.favicon_url,
							onChange: (v) => setS({
								...s,
								favicon_url: v
							}),
							testId: "site-favicon",
							previewClass: "h-10 w-10",
							accept: "image/png,image/x-icon,image/vnd.microsoft.icon,image/webp"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: t("Standard color")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("Everyone sees this color first. Visitors can still pick another one with the palette button.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: GLOWS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setS({
								...s,
								default_glow: g
							}),
							"data-testid": `site-glow-${g}`,
							className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm capitalize ${s.default_glow === g ? "border-primary bg-accent font-semibold" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-4 w-4 rounded-full",
									style: { background: glowSwatch[g] }
								}),
								" ",
								t(g)
							]
						}, g))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold md:col-span-3",
						children: t("Contact info")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Email"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: s.contact_email,
							onChange: set("contact_email"),
							"data-testid": "site-contact-email"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Phone"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: s.contact_phone,
							maxLength: 40,
							onChange: set("contact_phone"),
							"data-testid": "site-contact-phone"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("Address"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: s.contact_address,
							maxLength: 255,
							onChange: set("contact_address"),
							"data-testid": "site-contact-address"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("Social links — one per line: Name | https://link"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 4,
								value: s.social_links,
								onChange: set("social_links"),
								placeholder: "Instagram | https://instagram.com/…\nTelegram | https://t.me/…",
								"data-testid": "site-social"
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-testid": "site-save",
				children: t("Save")
			})
		]
	});
}
function useRun(keys) {
	const qc = useQueryClient();
	const { t } = useI18n();
	return async (fn, ok = t("Saved")) => {
		try {
			await fn();
			toast.success(ok);
			for (const k of keys) qc.invalidateQueries({ queryKey: [k] });
		} catch (e) {
			toast.error(t(e.message.split("\n")[0]));
		}
	};
}
var Row = ({ children, id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	className: "flex flex-wrap items-center gap-2 p-3 text-sm",
	"data-testid": id,
	children
});
var List = ({ children, id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	className: "divide-y rounded-xl border bg-card",
	"data-testid": id,
	children
});
function Orders() {
	const { t, locale } = useI18n();
	const [status, setStatus] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const d = useQuery({
		queryKey: [
			"admin-orders",
			status,
			q
		],
		queryFn: () => fetchAdminOrders({ data: {
			status,
			q
		} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "max-w-xs",
			placeholder: t("Order #, title or email"),
			value: q,
			onChange: (e) => setQ(e.target.value),
			"data-testid": "admin-orders-search"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: selectCls,
			value: status,
			onChange: (e) => setStatus(e.target.value),
			"data-testid": "admin-orders-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: t("All")
			}), [
				"pending_payment",
				"paid",
				"delivered",
				"completed",
				"disputed",
				"refunded",
				"cancelled"
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: s,
				children: orderStatusLabel(t, s)
			}, s))]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		id: "admin-orders-list",
		children: (d.data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			id: `admin-order-${o.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/orders/$id",
					params: { id: String(o.id) },
					className: "font-semibold underline",
					children: ["#", o.id]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1 truncate",
					children: [
						o.offer_title,
						" · ",
						o.buyer,
						" → ",
						o.seller
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(o.total_minor, o.currency) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs capitalize text-muted-foreground",
					children: [
						o.payment_provider,
						" · ",
						fmtDate(o.created_at, locale)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderActions, {
					id: o.id,
					status: o.status
				})
			]
		}, o.id))
	})] });
}
function OrderActions({ id, status }) {
	const { t } = useI18n();
	const run = useRun(["admin-orders", "admin-stats"]);
	const act = (action) => run(() => resolveOrderFn({ data: {
		id,
		action
	} }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex gap-1",
		children: [[
			"paid",
			"delivered",
			"disputed"
		].includes(status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
			variant: "outline",
			testId: `admin-order-release-${id}`,
			question: t("Complete this order and pay the seller?"),
			onConfirm: () => act("release"),
			children: t("Release")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
			testId: `admin-order-refund-${id}`,
			question: t("Refund this order to the buyer?"),
			onConfirm: () => act("refund"),
			children: t("Refund")
		})] }), status === "pending_payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
			testId: `admin-order-cancel-${id}`,
			question: t("Cancel this unpaid order?"),
			onConfirm: () => act("cancel"),
			children: t("Cancel")
		})]
	});
}
function Users() {
	const { t } = useI18n();
	const [q, setQ] = (0, import_react.useState)("");
	const run = useRun(["admin-users", "admin-sellers"]);
	const users = useQuery({
		queryKey: ["admin-users", q],
		queryFn: () => fetchAdminUsers({ data: { q } })
	});
	const sellers = useQuery({
		queryKey: ["admin-sellers"],
		queryFn: () => fetchAdminSellers()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-bold",
			children: t("Sellers")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
			id: "admin-sellers-list",
			children: (sellers.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				id: `admin-seller-${s.user_id}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seller/$id",
						params: { id: s.user_id },
						className: "font-semibold underline",
						children: s.display_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex-1 text-muted-foreground",
						children: [
							s.email,
							" · ",
							s.offers,
							" ",
							t("Offers"),
							" · ★ ",
							Number(s.rating_avg).toFixed(2)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t("Balance"),
						": ",
						formatPrice(s.balance_minor),
						" · ",
						t("On hold"),
						": ",
						formatPrice(s.pending_minor)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: selectCls,
						value: s.verification_status,
						"data-testid": `admin-seller-verify-${s.user_id}`,
						onChange: (e) => run(() => setSellerVerificationFn({ data: {
							id: s.user_id,
							status: e.target.value
						} })),
						children: [
							"unverified",
							"pending",
							"verified",
							"rejected"
						].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: v,
							children: orderStatusLabel(t, v)
						}, v))
					})
				]
			}, s.user_id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-bold",
			children: t("Users")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "max-w-xs",
			placeholder: t("Search by email"),
			value: q,
			onChange: (e) => setQ(e.target.value),
			"data-testid": "admin-users-search"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
			id: "admin-users-list",
			children: (users.data ?? []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				id: `admin-user-${u.email}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate font-medium",
						children: u.email
					}),
					!u.email_verified_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => run(() => updateUserFn({ data: {
							id: u.id,
							verify: true
						} })),
						children: t("Mark email confirmed")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: u.role,
						"data-testid": `admin-user-role-${u.email}`,
						onChange: (e) => run(() => updateUserFn({ data: {
							id: u.id,
							role: e.target.value
						} })),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "buyer",
								children: t("Buyer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "seller",
								children: t("Seller")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "admin",
								children: t("Admin")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: selectCls,
						value: u.status,
						"data-testid": `admin-user-status-${u.email}`,
						onChange: (e) => run(() => updateUserFn({ data: {
							id: u.id,
							status: e.target.value
						} })),
						children: [
							"active",
							"suspended",
							"banned"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: orderStatusLabel(t, s)
						}, s))
					})
				]
			}, u.id))
		})
	] });
}
function Offers() {
	const { t } = useI18n();
	const [q, setQ] = (0, import_react.useState)("");
	const run = useRun(["admin-offers"]);
	const d = useQuery({
		queryKey: ["admin-offers", q],
		queryFn: () => fetchAdminOffers({ data: { q } })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "max-w-xs",
			placeholder: t("Search offers"),
			value: q,
			onChange: (e) => setQ(e.target.value),
			"data-testid": "admin-offers-search"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			"data-testid": "admin-offer-new",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cabinet/offers/$id",
				params: { id: "new" },
				children: t("Post new offer")
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		id: "admin-offers-list",
		children: (d.data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			id: `admin-offer-${o.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1 truncate",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: o.title }),
						" · ",
						o.seller,
						" · ",
						o.category
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					formatPrice(o.price_minor, o.currency),
					" · ",
					t("Stock"),
					" ",
					o.stock_count
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "outline",
					"data-testid": `admin-offer-edit-${o.id}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cabinet/offers/$id",
						params: { id: String(o.id) },
						children: t("Edit")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: selectCls,
					value: o.status,
					"data-testid": `admin-offer-status-${o.id}`,
					onChange: (e) => run(() => setOfferStatusFn({ data: {
						id: o.id,
						status: e.target.value
					} })),
					children: [
						"active",
						"paused",
						"draft",
						"archived"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: orderStatusLabel(t, s)
					}, s))
				})
			]
		}, o.id))
	})] });
}
var emptyCat = {
	id: void 0,
	parent_id: "",
	slug: "",
	name: "",
	icon: "",
	seo_text: "",
	commission_percent: "10",
	sort_order: "0",
	show_in_header: false,
	is_active: true
};
function Categories() {
	const { t } = useI18n();
	const run = useRun(["admin-categories", "categories"]);
	const d = useQuery({
		queryKey: ["admin-categories"],
		queryFn: () => fetchAdminCategories()
	});
	const [f, setF] = (0, import_react.useState)(emptyCat);
	const edit = (c) => setF({
		...c,
		parent_id: c.parent_id ?? "",
		icon: c.icon ?? "",
		seo_text: c.seo_text ?? "",
		commission_percent: String(c.commission_percent),
		sort_order: String(c.sort_order)
	});
	const name = (id) => d.data?.find((c) => c.id === id)?.name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-2 rounded-xl border bg-card p-4 md:grid-cols-3",
		"data-testid": "category-form",
		onSubmit: (e) => {
			e.preventDefault();
			run(() => saveCategoryFn({ data: {
				...f,
				parent_id: f.parent_id || null,
				commission_percent: Number(f.commission_percent),
				sort_order: Number(f.sort_order)
			} })).then(() => setF(emptyCat));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				placeholder: t("Name"),
				value: f.name,
				onChange: (e) => setF({
					...f,
					name: e.target.value
				}),
				"data-testid": "category-name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				placeholder: "slug",
				value: f.slug,
				onChange: (e) => setF({
					...f,
					slug: e.target.value.toLowerCase()
				}),
				"data-testid": "category-slug"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: selectCls,
				value: f.parent_id,
				onChange: (e) => setF({
					...f,
					parent_id: e.target.value
				}),
				"aria-label": t("Parent category"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: t("No parent")
				}), (d.data ?? []).filter((c) => c.id !== f.id).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.name
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "space-y-1 text-sm",
				children: [t("Commission %"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.commission_percent,
					onChange: (e) => setF({
						...f,
						commission_percent: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "space-y-1 text-sm",
				children: [t("Sort order"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.sort_order,
					onChange: (e) => setF({
						...f,
						sort_order: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "space-y-1 text-sm",
				children: [t("SEO text"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.seo_text,
					onChange: (e) => setF({
						...f,
						seo_text: e.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: f.show_in_header,
						onChange: (e) => setF({
							...f,
							show_in_header: e.target.checked
						})
					}),
					" ",
					t("Show in header")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: f.is_active,
						onChange: (e) => setF({
							...f,
							is_active: e.target.checked
						})
					}),
					" ",
					t("Active")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					"data-testid": "category-save",
					children: f.id ? t("Save") : t("Add category")
				}), f.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					type: "button",
					variant: "ghost",
					onClick: () => setF(emptyCat),
					children: t("Cancel")
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		id: "admin-categories-list",
		children: (d.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			id: `admin-category-${c.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: c.name }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"/",
								c.slug,
								" · ",
								name(c.parent_id),
								" · ",
								c.commission_percent,
								"% · ",
								c.offers,
								" ",
								t("Offers")
							]
						})
					]
				}),
				!c.is_active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					"data-testid": `admin-category-edit-${c.slug}`,
					onClick: () => edit(c),
					children: t("Edit")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
					testId: `admin-category-delete-${c.slug}`,
					question: t("Delete this category?"),
					onConfirm: () => run(() => deleteCategoryFn({ data: { id: c.id } })),
					children: t("Delete")
				})
			]
		}, c.id))
	})] });
}
function Reviews() {
	const { t, locale } = useI18n();
	const run = useRun(["admin-reviews"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		id: "admin-reviews-list",
		children: (useQuery({
			queryKey: ["admin-reviews"],
			queryFn: () => fetchAdminReviews()
		}).data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			id: `admin-review-${r.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: r.rating }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [
						r.comment ?? "—",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								"· ",
								r.buyer,
								" → ",
								r.seller,
								" · ",
								fmtDate(r.created_at, locale)
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					"data-testid": `admin-review-toggle-${r.id}`,
					onClick: () => run(() => setReviewStatusFn({ data: {
						id: r.id,
						status: r.status === "visible" ? "hidden" : "visible"
					} })),
					children: r.status === "visible" ? t("Hide") : t("Show")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
					testId: `admin-review-delete-${r.id}`,
					question: t("Delete this review?"),
					onConfirm: () => run(() => setReviewStatusFn({ data: {
						id: r.id,
						status: "delete"
					} })),
					children: t("Delete")
				})
			]
		}, r.id))
	});
}
function Payouts() {
	const { t, locale } = useI18n();
	const run = useRun(["admin-payouts"]);
	const d = useQuery({
		queryKey: ["admin-payouts"],
		queryFn: () => fetchAdminPayouts()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, {
		id: "admin-payouts-list",
		children: [(d.data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			id: `admin-payout-${p.id}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatPrice(p.amount_minor) }),
						" · ",
						p.seller,
						" · ",
						p.method,
						": ",
						p.details,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: ["· ", fmtDate(p.created_at, locale)]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }),
				p.status === "requested" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					"data-testid": `payout-paid-${p.id}`,
					onClick: () => run(() => processPayoutFn({ data: {
						id: p.id,
						action: "paid",
						note: ""
					} })),
					children: t("Mark as paid")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
					variant: "outline",
					withNote: true,
					testId: `payout-reject-${p.id}`,
					question: t("Reject this payout? The amount goes back to the seller's balance."),
					onConfirm: (note) => run(() => processPayoutFn({ data: {
						id: p.id,
						action: "rejected",
						note
					} })),
					children: t("Reject")
				})] })
			]
		}, p.id)), d.data && !d.data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "p-6 text-center text-muted-foreground",
			children: t("No payouts yet.")
		})]
	});
}
function SettingsForm() {
	const { t } = useI18n();
	const run = useRun(["admin-settings"]);
	const d = useQuery({
		queryKey: ["admin-settings"],
		queryFn: () => fetchAdminSettings()
	});
	const [s, setS] = (0, import_react.useState)(d.data?.settings);
	(0, import_react.useEffect)(() => setS(d.data?.settings), [d.data]);
	if (!s || !d.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: t("Loading…")
	});
	const cfg = d.data.configured;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4 rounded-xl border bg-card p-4",
		"data-testid": "settings-form",
		onSubmit: (e) => {
			e.preventDefault();
			run(() => saveSettingsFn({ data: s }));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-sm",
						children: [t("Site name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: s.site_name,
							onChange: (e) => setS({
								...s,
								site_name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-sm",
						children: [t("Support email"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: s.support_email,
							onChange: (e) => setS({
								...s,
								support_email: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-sm",
						children: [t("Auto-complete delivered orders after (hours)"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: s.auto_complete_hours,
							onChange: (e) => setS({
								...s,
								auto_complete_hours: Number(e.target.value)
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: t("Payment methods")
				}), Object.keys(s.payment_methods).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm capitalize",
					"data-testid": `settings-method-${p}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: s.payment_methods[p],
							onChange: (e) => setS({
								...s,
								payment_methods: {
									...s.payment_methods,
									[p]: e.target.checked
								}
							})
						}),
						p,
						" ",
						!cfg[p] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs normal-case text-destructive",
							children: ["— ", t("keys missing in .env")]
						})
					]
				}, p))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					"data-testid": "settings-save",
					children: t("Save")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					type: "button",
					variant: "outline",
					"data-testid": "retranslate",
					onClick: () => run(() => retranslateFn(), t("Translation started. It takes a few minutes.")),
					children: t("Re-translate all offers and categories")
				})]
			})
		]
	});
}
var VIEWS = {
	orders: Orders,
	users: Users,
	offers: Offers,
	categories: Categories,
	reviews: Reviews,
	payouts: Payouts,
	settings: SettingsForm,
	banners: BannersAdmin,
	pages: PagesAdmin,
	messages: MessagesAdmin,
	site: SiteAdmin
};
function Page() {
	const { section } = Route.useLoaderData();
	const { t } = useI18n();
	const titles = {
		orders: t("Orders"),
		users: t("Users & sellers"),
		offers: t("Offers"),
		categories: t("Categories"),
		reviews: t("Reviews"),
		payouts: t("Payouts"),
		settings: t("Settings"),
		banners: t("Banners & sliders"),
		pages: t("Pages"),
		messages: t("Contact messages"),
		site: t("Website & colors")
	};
	const View = VIEWS[section];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, { children: titles[section] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(View, {})] });
}
//#endregion
export { Page as component };
