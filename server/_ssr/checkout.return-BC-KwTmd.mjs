import { r as coerce, s as objectType } from "../_libs/zod.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.return-BC-KwTmd.js
var $$splitComponentImporter = () => import("./checkout.return-CngzFHew.mjs");
var Route = createFileRoute("/_authenticated/checkout/return")({
	validateSearch: objectType({ order: coerce.number().int().positive().catch(0) }),
	head: () => ({ meta: [{ title: "Confirming payment — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
