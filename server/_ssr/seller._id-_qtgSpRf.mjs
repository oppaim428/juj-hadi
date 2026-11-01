import { Z as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as fetchSeller } from "./catalog.functions-Dh4mxjZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller._id-_qtgSpRf.js
var $$splitComponentImporter = () => import("./seller._id-CH0XiFSM.mjs");
var $$splitNotFoundComponentImporter = () => import("./seller._id-FFIvLNzp.mjs");
var Route = createFileRoute("/seller/$id")({
	loader: async ({ params }) => {
		if (!/^[0-9a-f-]{36}$/i.test(params.id)) throw notFound();
		const s = await fetchSeller({ data: { id: params.id } });
		if (!s) throw notFound();
		return s;
	},
	head: ({ loaderData }) => {
		const n = loaderData?.seller.display_name ?? "Seller";
		return { meta: [
			{ title: `${n} — Seller on JUJ` },
			{
				name: "description",
				content: `Offers from ${n} on JUJ.`
			},
			{
				property: "og:title",
				content: `${n} on JUJ`
			},
			{
				property: "og:description",
				content: `Offers from ${n} on JUJ.`
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
