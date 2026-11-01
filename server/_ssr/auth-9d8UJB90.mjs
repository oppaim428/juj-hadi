import { l as stringType, s as objectType } from "../_libs/zod.mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-9d8UJB90.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./auth-S0clcui4.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: objectType({ redirect: stringType().optional().catch(void 0) }),
	head: () => ({ meta: [{ title: "Log in or sign up — JUJ" }, {
		name: "description",
		content: "Log in to your JUJ account or create a new one."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
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
export { Route as n, Field as t };
