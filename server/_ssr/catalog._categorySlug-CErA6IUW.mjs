import { i as enumType, s as objectType } from "../_libs/zod.mjs";
import { Z as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchCategory } from "./catalog.functions-Dh4mxjZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog._categorySlug-CErA6IUW.js
var $$splitComponentImporter = () => import("./catalog._categorySlug-B4Bjmnqx.mjs");
var $$splitNotFoundComponentImporter = () => import("./catalog._categorySlug-Cx1D8nvp.mjs");
var searchSchema = objectType({ sort: enumType([
	"popular",
	"price_asc",
	"price_desc"
]).optional().catch(void 0) });
var Route = createFileRoute("/catalog/$categorySlug")({
	validateSearch: searchSchema,
	loader: async ({ params }) => {
		if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(params.categorySlug)) throw notFound();
		const data = await fetchCategory({ data: { slug: params.categorySlug } });
		if (!data) throw notFound();
		return data;
	},
	head: ({ loaderData }) => {
		const name = loaderData?.category.name ?? "Category";
		const desc = loaderData?.category.seo_text ?? `Buy ${name} from trusted sellers on JUJ.`;
		return { meta: [
			{ title: `${name} — JUJ` },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: `${name} — JUJ`
			},
			{
				property: "og:description",
				content: desc
			},
			...loaderData ? [] : [{
				name: "robots",
				content: "noindex"
			}]
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
