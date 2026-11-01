import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Stars-BSAod481.js
var import_jsx_runtime = require_jsx_runtime();
function Stars({ value, size = "h-4 w-4" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center gap-0.5",
		"aria-label": `${value} / 5`,
		children: [
			1,
			2,
			3,
			4,
			5
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `${size} ${i <= Math.round(value) ? "fill-primary text-primary" : "text-muted-foreground/40"}` }, i))
	});
}
function StarInput({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1",
		role: "radiogroup",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"data-testid": `review-star-${i}`,
			"aria-label": `${i}`,
			onClick: () => onChange(i),
			className: "rounded p-0.5 transition-transform hover:scale-110",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-7 w-7 ${i <= value ? "fill-primary text-primary" : "text-muted-foreground/40"}` })
		}, i))
	});
}
//#endregion
export { Stars as n, StarInput as t };
