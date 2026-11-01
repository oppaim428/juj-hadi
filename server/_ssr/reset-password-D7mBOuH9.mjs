import { l as stringType, s as objectType } from "../_libs/zod.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-D7mBOuH9.js
var $$splitComponentImporter = () => import("./reset-password-CP9tCiUZ.mjs");
var Route = createFileRoute("/reset-password")({
	validateSearch: objectType({ token: stringType().max(200).catch("") }),
	head: () => ({ meta: [{ title: "Set a new password — JUJ" }, {
		name: "description",
		content: "Choose a new password for your JUJ account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
