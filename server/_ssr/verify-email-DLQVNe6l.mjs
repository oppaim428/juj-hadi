import { l as stringType, s as objectType } from "../_libs/zod.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-DLQVNe6l.js
var $$splitComponentImporter = () => import("./verify-email-BUZPqeYy.mjs");
var Route = createFileRoute("/verify-email")({
	ssr: false,
	validateSearch: objectType({ token: stringType().max(200).catch("") }),
	head: () => ({ meta: [{ title: "Confirm email — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
