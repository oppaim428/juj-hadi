import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { s as forgotPasswordFn } from "./catalog.functions-Dh4mxjZI.mjs";
import { t as Field } from "./auth-9d8UJB90.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password--i9epnY3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 text-3xl font-bold",
			children: t("Forgot password")
		}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			"data-testid": "forgot-sent",
			children: t("If that email has an account, a reset link is on its way.")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: async (e) => {
				e.preventDefault();
				await forgotPasswordFn({ data: { email: String(new FormData(e.currentTarget).get("email")).trim() } });
				setSent(true);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				name: "email",
				label: t("Email"),
				type: "email"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				"data-testid": "forgot-submit",
				children: t("Send reset link")
			})]
		})]
	});
}
//#endregion
export { Page as component };
