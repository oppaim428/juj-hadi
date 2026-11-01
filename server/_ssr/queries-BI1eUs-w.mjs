import { n as infiniteQueryOptions, r as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { a as fetchOffers, r as fetchFavorites } from "./catalog.functions-Dh4mxjZI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-BI1eUs-w.js
var offersInfiniteQuery = (f) => infiniteQueryOptions({
	queryKey: ["offers", f],
	queryFn: ({ pageParam }) => fetchOffers({ data: {
		...f,
		sort: f.sort ?? "popular",
		cursor: pageParam
	} }),
	initialPageParam: void 0,
	getNextPageParam: (last) => last.nextCursor ?? void 0
});
var favoritesQuery = (userId) => queryOptions({
	queryKey: ["favorites", userId],
	enabled: !!userId,
	queryFn: () => fetchFavorites()
});
function flatten(tree) {
	return tree.flatMap((n) => [n, ...flatten(n.children)]);
}
//#endregion
export { flatten as n, offersInfiniteQuery as r, favoritesQuery as t };
