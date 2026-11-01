import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useRefreshSession } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as resetPasswordFn } from "./catalog.functions-Dh4mxjZI.mjs";
import { t as Field } from "./auth-9d8UJB90.mjs";
import { t as Route } from "./reset-password-D7mBOuH9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CP9tCiUZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { token } = Route.useSearch();
	const [err, setErr] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const refresh = useRefreshSession();
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 text-3xl font-bold",
			children: t("Set a new password")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: async (e) => {
				e.preventDefault();
				const password = String(new FormData(e.currentTarget).get("password"));
				const r = await resetPasswordFn({ data: {
					token,
					password
				} });
				if (!r.ok) return setErr(r.error);
				toast.success(t("Password updated"));
				await refresh();
				navigate({ to: "/" });
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					name: "password",
					label: t("New password"),
					type: "password"
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					"data-testid": "reset-error",
					children: t(err)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					"data-testid": "reset-submit",
					children: t("Save password")
				})
			]
		})]
	});
}
//#endregion
export { Page as component };
