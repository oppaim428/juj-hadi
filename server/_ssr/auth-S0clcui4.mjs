import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useRefreshSession } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as registerSchema } from "./auth.server-BtcIQrdK.mjs";
import { c as loginFn, d as resendVerificationFn, u as registerFn } from "./catalog.functions-Dh4mxjZI.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as Route } from "./auth-9d8UJB90.mjs";
import { i as TabsTrigger$1, n as TabsContent$1, r as TabsList$1, t as Tabs$1 } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-S0clcui4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Tabs$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsList$1.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsTrigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent$1, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsContent$1.displayName;
var safe = (r) => r && r.startsWith("/") && !r.startsWith("//") ? r : "/";
function AuthPage() {
	const { redirect } = Route.useSearch();
	const navigate = useNavigate();
	const refresh = useRefreshSession();
	const { t } = useI18n();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const [unverified, setUnverified] = (0, import_react.useState)(null);
	const onLogin = async (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const email = String(f.get("email"));
		setBusy(true);
		setErr(null);
		const r = await loginFn({ data: {
			email,
			password: String(f.get("password"))
		} });
		if (!r.ok) {
			setBusy(false);
			setUnverified(r.error.includes("confirm your email") ? email : null);
			return setErr(r.error);
		}
		await refresh();
		setBusy(false);
		const home = r.role === "admin" ? "/admin" : r.role === "seller" ? "/cabinet" : "/";
		navigate({ href: redirect ? safe(redirect) : home });
	};
	const onRegister = async (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const p = registerSchema.safeParse({
			email: f.get("email"),
			password: f.get("password")
		});
		setErr(null);
		if (!p.success) return setErr(p.error.issues[0]?.message ?? "Invalid input");
		setBusy(true);
		const r = await registerFn({ data: p.data });
		setBusy(false);
		if (!r.ok) return setErr(r.error);
		toast.success(t("Check your inbox to confirm your email."));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 text-3xl font-bold",
			children: t("Welcome to JUJ")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "login",
			onValueChange: () => setErr(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid w-full grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "login",
						"data-testid": "auth-tab-login",
						children: t("Log in")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "register",
						"data-testid": "auth-tab-register",
						children: t("Sign up")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "login",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						method: "post",
						onSubmit: onLogin,
						className: "space-y-4 pt-4",
						"data-testid": "login-form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "email",
								label: t("Email"),
								type: "email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "password",
								label: t("Password"),
								type: "password"
							}),
							err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								"data-testid": "auth-error",
								children: t(err)
							}),
							unverified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-testid": "resend-verification",
								className: "text-sm text-primary underline",
								onClick: async () => {
									await resendVerificationFn({ data: { email: unverified } });
									toast.success(t("If the account exists, a new confirmation email is on its way."));
								},
								children: t("Send the confirmation email again")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								disabled: busy,
								"data-testid": "login-submit",
								children: busy ? t("Logging in…") : t("Log in")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/forgot-password",
								className: "block text-center text-sm text-muted-foreground hover:underline",
								"data-testid": "forgot-password-link",
								children: t("Forgot password?")
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "register",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						method: "post",
						onSubmit: onRegister,
						className: "space-y-4 pt-4",
						"data-testid": "register-form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "email",
								label: t("Email"),
								type: "email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								name: "password",
								label: t("Password (8+ chars, a letter and a number)"),
								type: "password"
							}),
							err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								"data-testid": "register-error",
								children: t(err)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								disabled: busy,
								"data-testid": "register-submit",
								children: busy ? t("Creating…") : t("Create account")
							})
						]
					})
				})
			]
		})]
	});
}
function Field({ name, label, type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			type,
			required: true,
			maxLength: 254,
			"data-testid": `field-${name}`
		})]
	});
}
//#endregion
export { Field, AuthPage as component };
