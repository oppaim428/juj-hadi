import { Z as notFound, _ as lazyRouteComponent, v as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_section-Bk4FypOq.js
var $$splitComponentImporter = () => import("./_section-ffsK505z.mjs");
var SECTIONS = [
	"orders",
	"users",
	"offers",
	"categories",
	"reviews",
	"payouts",
	"settings",
	"banners",
	"pages",
	"messages",
	"site"
];
var Route = createFileRoute("/_authenticated/admin/$section")({
	loader: ({ params }) => {
		if (!SECTIONS.includes(params.section)) throw notFound();
		return { section: params.section };
	},
	head: () => ({ meta: [{ title: "Admin — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
