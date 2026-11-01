import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { F as ImageUp, O as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageInput-BOoZfMh-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Paste an image link or upload a file to object storage. */
function ImageInput({ value, onChange, testId, previewClass = "h-20 w-32", accept = "image/png,image/jpeg,image/webp,image/gif" }) {
	const { t } = useI18n();
	const ref = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const upload = async (file) => {
		setBusy(true);
		const fd = new FormData();
		fd.append("file", file);
		const r = await fetch("/api/uploads", {
			method: "POST",
			body: fd,
			credentials: "include"
		}).catch(() => null);
		const d = await r?.json().catch(() => ({}));
		setBusy(false);
		if (!r?.ok || !d?.url) {
			toast.error(t(d?.error ?? "Upload failed. Please try again."));
			return;
		}
		onChange(d.url);
		toast.success(t("Image uploaded"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: t("https://… or upload an image"),
					value,
					onChange: (e) => onChange(e.target.value),
					"data-testid": `${testId}-url`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref,
					type: "file",
					hidden: true,
					accept,
					"data-testid": `${testId}-file`,
					onChange: (e) => {
						const f = e.target.files?.[0];
						if (f) upload(f);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					disabled: busy,
					onClick: () => ref.current?.click(),
					"data-testid": `${testId}-upload`,
					children: [
						busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUp, { className: "h-4 w-4" }),
						" ",
						t("Upload")
					]
				})
			]
		}), value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: value,
			alt: "",
			className: `${previewClass} rounded-md border object-cover`,
			"data-testid": `${testId}-preview`
		})]
	});
}
//#endregion
export { ImageInput as t };
