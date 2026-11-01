import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Route } from "./pages._slug-DDcOTGGg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages._slug-B5qJ3tKN.js
var import_jsx_runtime = require_jsx_runtime();
/** Plain text with blank-line paragraphs and "## " headings. */
function RichText({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4 leading-relaxed",
		"data-testid": "rich-text",
		children: text.replace(/\r/g, "").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b, i) => {
			if (!b.startsWith("## ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-line text-muted-foreground",
				children: b
			}, i);
			const [heading, ...rest] = b.split("\n");
			const body = rest.join("\n").trim();
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pt-2 font-display text-xl font-bold",
					children: heading.slice(3)
				}), body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line text-muted-foreground",
					children: body
				})]
			}, i);
		})
	});
}
function Page() {
	const p = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl space-y-6 px-4 py-10",
		"data-testid": `page-${p.slug}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl font-bold sm:text-5xl",
			"data-testid": "page-title",
			children: p.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: p.body })]
	});
}
//#endregion
export { Page as component };
