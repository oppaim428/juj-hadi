import { Z as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parseOfferParam } from "./money-B4hGHpjt.mjs";
import { i as fetchOffer } from "./catalog.functions-Dh4mxjZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.product._offer-DyHBRKdx.js
var $$splitComponentImporter = () => import("./catalog.product._offer-D4aEmDOF.mjs");
var $$splitNotFoundComponentImporter = () => import("./catalog.product._offer-Bqud-u1u.mjs");
var Route = createFileRoute("/catalog/product/$offer")({
	loader: async ({ params }) => {
		const id = parseOfferParam(params.offer);
		if (!id) throw notFound();
		const data = await fetchOffer({ data: { id } });
		if (!data) throw notFound();
		return data;
	},
	head: ({ loaderData }) => {
		const title = loaderData?.offer.title ?? "Offer";
		const d = loaderData ? loaderData.offer.description.slice(0, 155) || `Buy ${title} on JUJ.` : "Offer unavailable.";
		return { meta: [
			{ title: `${title} — JUJ` },
			{
				name: "description",
				content: d
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: d
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
