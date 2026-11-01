import { C as useRouter, b as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-BxnIqOmJ.js
var root = getRouteApi("__root__");
function useAuth() {
	const { session } = root.useLoaderData();
	return {
		user: session.user,
		ready: true
	};
}
function useRootData() {
	return root.useLoaderData();
}
/** Re-reads the cookie session after login/logout. */
function useRefreshSession() {
	const router = useRouter();
	const qc = useQueryClient();
	return async () => {
		qc.removeQueries({ queryKey: ["session"] });
		qc.removeQueries({ queryKey: ["favorites"] });
		await router.invalidate();
	};
}
//#endregion
export { useRefreshSession as n, useRootData as r, useAuth as t };
