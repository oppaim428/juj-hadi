import { r as coerce, s as objectType } from "../_libs/zod.mjs";
import { Z as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-Bnjq7yRB.js
var $$splitComponentImporter = () => import("./orders._id-Dmhc5rRG.mjs");
var $$splitNotFoundComponentImporter = () => import("./orders._id-BK75LHKo.mjs");
var Route = createFileRoute("/_authenticated/orders/$id")({
	validateSearch: objectType({ cancelled: coerce.number().optional().catch(void 0) }),
	loader: ({ params }) => {
		const id = Number(params.id);
		if (!Number.isSafeInteger(id) || id < 1) throw notFound();
		return { id };
	},
	head: () => ({ meta: [{ title: "Order — JUJ" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
