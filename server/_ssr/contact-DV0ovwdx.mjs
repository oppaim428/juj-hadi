import { o as __toESM } from "../_runtime.mjs";
import { a as parseSocial } from "./content.schemas-CHAMcqAS.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { r as useRootData } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { p as submitContactFn } from "./content.functions-B4GAVbjF.mjs";
import { D as Mail, E as MapPin, _ as Phone, m as Send } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DV0ovwdx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	name: "",
	email: "",
	subject: "",
	message: ""
};
function Page() {
	const { site } = useRootData();
	const { t } = useI18n();
	const [f, setF] = (0, import_react.useState)(empty);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const set = (k) => (e) => setF({
		...f,
		[k]: e.target.value
	});
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			await submitContactFn({ data: f });
			setSent(true);
			setF(empty);
		} catch (err) {
			toast.error(t(err.message.split("\n")[0] ?? "") || t("Please check the form and try again."));
		} finally {
			setBusy(false);
		}
	};
	const info = [
		site.contact_email && {
			icon: Mail,
			label: site.contact_email,
			href: `mailto:${site.contact_email}`
		},
		site.contact_phone && {
			icon: Phone,
			label: site.contact_phone,
			href: `tel:${site.contact_phone.replace(/\s/g, "")}`
		},
		site.contact_address && {
			icon: MapPin,
			label: site.contact_address
		}
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_1.3fr]",
		"data-testid": "contact-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold sm:text-5xl",
					children: t("Contact us")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t("Questions about an order or selling on JUJ? Send us a message and we'll reply by email.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					"data-testid": "contact-info",
					children: info.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "h-4 w-4" })
						}), i.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: i.href,
							className: "hover:underline",
							children: i.label
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.label })]
					}, i.label))
				}),
				parseSocial(site.social_links).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: parseSocial(site.social_links).map(([label, url]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: url,
						target: "_blank",
						rel: "noreferrer",
						className: "rounded-full border px-3 py-1 text-sm hover:border-primary",
						children: label
					}, url))
				})
			]
		}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start justify-center gap-3 rounded-2xl border bg-card p-8",
			"data-testid": "contact-success",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-8 w-8 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: t("Message sent")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: t("Thanks! We'll get back to you by email soon.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setSent(false),
					"data-testid": "contact-send-another",
					children: t("Send another message")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4 rounded-2xl border bg-card p-6",
			"data-testid": "contact-form",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-name",
							children: t("Name")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "c-name",
							required: true,
							maxLength: 100,
							value: f.name,
							onChange: set("name"),
							"data-testid": "contact-name"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-email",
							children: t("Email")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "c-email",
							type: "email",
							required: true,
							maxLength: 254,
							value: f.email,
							onChange: set("email"),
							"data-testid": "contact-email"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-subject",
						children: t("Subject")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-subject",
						maxLength: 150,
						value: f.subject,
						onChange: set("subject"),
						"data-testid": "contact-subject"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-message",
						children: t("Message")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "c-message",
						required: true,
						minLength: 5,
						maxLength: 5e3,
						rows: 6,
						value: f.message,
						onChange: set("message"),
						"data-testid": "contact-message"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "button-glow",
					disabled: busy,
					"data-testid": "contact-submit",
					children: busy ? t("Sending…") : t("Send message")
				})
			]
		})]
	});
}
//#endregion
export { Page as component };
