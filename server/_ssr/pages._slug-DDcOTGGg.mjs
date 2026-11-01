import { Z as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as fetchPage } from "./content.functions-B4GAVbjF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages._slug-DDcOTGGg.js
var $$splitComponentImporter = () => import("./pages._slug-B5qJ3tKN.mjs");
var Route = createFileRoute("/pages/$slug")({
	loader: async ({ params }) => {
		const page = await fetchPage({ data: { slug: params.slug } });
		if (!page) throw notFound();
		return page;
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Page"} — JUJ` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
