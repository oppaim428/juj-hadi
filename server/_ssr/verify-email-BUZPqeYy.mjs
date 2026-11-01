import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useRefreshSession } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { H as CircleX, U as CircleCheck } from "../_libs/lucide-react.mjs";
import { h as verifyEmailFn } from "./catalog.functions-Dh4mxjZI.mjs";
import { t as Route } from "./verify-email-DLQVNe6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-BUZPqeYy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { token } = Route.useSearch();
	const refresh = useRefreshSession();
	const { t } = useI18n();
	const [state, setState] = (0, import_react.useState)("busy");
	const ran = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (ran.current) return;
		ran.current = true;
		verifyEmailFn({ data: { token } }).then(async (r) => {
			if (r.ok) await refresh();
			setState(r.ok ? "ok" : r.error);
		}).catch(() => setState("This link is invalid or expired."));
	}, [token, refresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md px-4 py-16 text-center",
		"data-testid": "verify-email-page",
		children: state === "busy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: t("Confirming your email…")
		}) : state === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-12 w-12 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: t("Your email is confirmed")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: t("Start shopping")
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mx-auto h-12 w-12 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: t(state)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: t("Log in")
					})
				})
			]
		})
	});
}
//#endregion
export { Page as component };
