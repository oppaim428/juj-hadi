import { l as stringType, s as objectType } from "../_libs/zod.mjs";
import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-CJP7o4ib.js
var $$splitComponentImporter = () => import("./search-DrzWkz2h.mjs");
var schema = objectType({
	q: stringType().max(100).catch(""),
	category: stringType().regex(/^[a-z0-9-]{1,80}$/).optional().catch(void 0)
});
var Route = createFileRoute("/search")({
	validateSearch: schema,
	head: () => ({ meta: [
		{ title: "Search — JUJ" },
		{
			name: "description",
			content: "Search digital goods on JUJ."
		},
		{
			property: "og:title",
			content: "Search — JUJ"
		},
		{
			property: "og:description",
			content: "Search digital goods on JUJ."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
