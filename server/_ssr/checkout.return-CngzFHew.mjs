import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { O as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as confirmCheckoutFn } from "./orders.functions-B_jXhxHU.mjs";
import { t as Route } from "./checkout.return-BC-KwTmd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.return-CngzFHew.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { order } = Route.useSearch();
	const navigate = useNavigate();
	const { t } = useI18n();
	const [waiting, setWaiting] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let tries = 0;
		let stop = false;
		const tick = async () => {
			if (stop || !order) return;
			const r = await confirmCheckoutFn({ data: { orderId: order } }).catch(() => ({ status: null }));
			if (r.status && r.status !== "pending_payment") {
				navigate({
					to: "/orders/$id",
					params: { id: String(order) },
					replace: true
				});
				return;
			}
			if (++tries >= 20) return setWaiting(false);
			setTimeout(tick, 3e3);
		};
		tick();
		return () => {
			stop = true;
		};
	}, [order, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md px-4 py-24 text-center",
		"data-testid": "checkout-return",
		children: waiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto h-10 w-10 animate-spin text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-bold",
				children: t("Confirming your payment…")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: t("This usually takes a few seconds. Crypto payments can take longer.")
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: t("We're still waiting for the payment")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: t("You can check the order page later — it updates on its own.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders/$id",
					params: { id: String(order) },
					children: t("Open order")
				})
			})
		] })
	});
}
//#endregion
export { Page as component };
