import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useAuth } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sell-C44YOjiq.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { user } = useAuth();
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl font-bold",
			children: t("Start selling on JUJ")
		}), user?.role === "seller" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			"data-testid": "sell-open-cabinet",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cabinet",
				children: t("Open seller cabinet")
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted-foreground",
			children: t("New seller accounts open soon. Questions? Write to support@juj.gg.")
		})]
	});
}
//#endregion
export { Page as component };
