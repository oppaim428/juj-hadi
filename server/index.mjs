globalThis.__nitro_main__ = import.meta.url;
import { o as NodeResponse, s as serve } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-10-25T20:52:12.071Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/ConfirmButton-CElmKsWq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1155-iBVvI4skPNpy/b7z03+uILRo0gk\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 4437,
		"path": "../public/assets/ConfirmButton-CElmKsWq.js"
	},
	"/assets/Crumbs-BAzqkE3R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37b-Um3RrjbqQw3ASTpUpYd747FR6Ho\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 891,
		"path": "../public/assets/Crumbs-BAzqkE3R.js"
	},
	"/assets/ImageInput-B0kWRcPg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"73b-WAFG95fv4TjM0B+0zvE318DA7WI\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1851,
		"path": "../public/assets/ImageInput-B0kWRcPg.js"
	},
	"/assets/OfferCard-Bl4HBGT-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb2-oro7hFKAPf/DdUZs8mGPM4jQOdM\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 3762,
		"path": "../public/assets/OfferCard-Bl4HBGT-.js"
	},
	"/assets/PanelLayout-BJqkzEkw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"674-q1r9Phg5BPUFOKlDVIeWdcDMbWE\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1652,
		"path": "../public/assets/PanelLayout-BJqkzEkw.js"
	},
	"/assets/QueryClientProvider-DAYDZb1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19e-aE5xv2cDM9jobIn80LGzxDGpMHI\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 414,
		"path": "../public/assets/QueryClientProvider-DAYDZb1j.js"
	},
	"/assets/Stars-CKyMwc2T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"316-ABpaqOPrYjOENh+0MIxRu/MnSVY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 790,
		"path": "../public/assets/Stars-CKyMwc2T.js"
	},
	"/assets/StatusBadge-C4I_GI5P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f5-pdC4bzAJ5R4pNyKwPKyfk2RspIM\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1269,
		"path": "../public/assets/StatusBadge-C4I_GI5P.js"
	},
	"/assets/_section-LUNoAxsw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a07-Vl0G3aEs1MSFB9V/kyWCGWjijwE\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 27143,
		"path": "../public/assets/_section-LUNoAxsw.js"
	},
	"/assets/admin-DQ2FCZFd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7cf-m+q+sYFUmy8YorwZZpmT9DgQ8FI\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1999,
		"path": "../public/assets/admin-DQ2FCZFd.js"
	},
	"/assets/admin.functions-BsjpyW8e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"827-XaKY55vxrQ/gcmQBfHteE01gKHs\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 2087,
		"path": "../public/assets/admin.functions-BsjpyW8e.js"
	},
	"/assets/auth-Ct9vdXjf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f75-CIuiSLHrVU0uhIWx7MpL7/wIOMQ\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 8053,
		"path": "../public/assets/auth-Ct9vdXjf.js"
	},
	"/assets/button-CRZu9KQ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1375-kka8NWSF/35GJbBUcvoH+ACb6dw\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 4981,
		"path": "../public/assets/button-CRZu9KQ6.js"
	},
	"/assets/cabinet-D29vdtde.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112a-HFlSFzrjgByB285FDgtUiFfDDl0\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 4394,
		"path": "../public/assets/cabinet-D29vdtde.js"
	},
	"/assets/catalog._categorySlug-BFJ318Ny.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad-6yJTtzHF+lePv00rL6jbvHUKbHw\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 173,
		"path": "../public/assets/catalog._categorySlug-BFJ318Ny.js"
	},
	"/assets/BannerSlider-B6_1hE3N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f5b-qSzQZRZ3As3HoGCnJA4ni020ESY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 24411,
		"path": "../public/assets/BannerSlider-B6_1hE3N.js"
	},
	"/assets/catalog._categorySlug-vnrcLOAI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"883-h21Ma5W4U45iA4CjpqgZWQ+ALHM\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 2179,
		"path": "../public/assets/catalog._categorySlug-vnrcLOAI.js"
	},
	"/assets/catalog.functions-6fvZbk3F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"725-n/IMZyVozBUW/n45CRjuCJAHutw\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1829,
		"path": "../public/assets/catalog.functions-6fvZbk3F.js"
	},
	"/assets/catalog.product._offer-BTcJtTBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22e2-qvGybXRlWZ2KwEu2FrET2aIiORM\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 8930,
		"path": "../public/assets/catalog.product._offer-BTcJtTBM.js"
	},
	"/assets/catalog.product._offer-Buap82th.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5-PW2ax1mG4oBpDZEidkw1R6gZ5I0\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 181,
		"path": "../public/assets/catalog.product._offer-Buap82th.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-25T20:52:12.071Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/checkout.return-DOrM2uew.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"674-QrOApGo48YF9VcDCD56FZVDSvM4\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1652,
		"path": "../public/assets/checkout.return-DOrM2uew.js"
	},
	"/assets/circle-check-CJ9N4Hca.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-2YAamCMYnFYa1c9vRIo3T0enGDY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 178,
		"path": "../public/assets/circle-check-CJ9N4Hca.js"
	},
	"/assets/contact-DLhBRH9v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1202-+Weoc5ay9X5MTZW2a6oogJO08WE\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 4610,
		"path": "../public/assets/contact-DLhBRH9v.js"
	},
	"/assets/content.functions-ycKJkQSu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"614-MMl8FS86+6bTiseoLJsFkLFqJMc\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1556,
		"path": "../public/assets/content.functions-ycKJkQSu.js"
	},
	"/assets/createLucideIcon-CH8ziGDO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d2-eqqVV7ke5H3n7FgLDogcLSBpnBA\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1234,
		"path": "../public/assets/createLucideIcon-CH8ziGDO.js"
	},
	"/assets/createServerFn-B64wbHMM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9162-OjV6Jpm626WsWuyctmAmEZLeOvA\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 37218,
		"path": "../public/assets/createServerFn-B64wbHMM.js"
	},
	"/assets/dist-1DvFWGWe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b0-AcqSn7rslmcUzB8fC35FBTq8GHk\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 5040,
		"path": "../public/assets/dist-1DvFWGWe.js"
	},
	"/assets/dist-CyXzWLor.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d62-qdDCmyGrDIBzw55dVeeXsXiEk+w\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 7522,
		"path": "../public/assets/dist-CyXzWLor.js"
	},
	"/assets/favorites-ggRdGrm2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1-wVuJDxcDi9cRZkiDbzQ/1NQSPsU\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 673,
		"path": "../public/assets/favorites-ggRdGrm2.js"
	},
	"/assets/forgot-password-Dhk49KL5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ce-bNrRtT8csuO2RY+1KFNhYzv1Kpk\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 974,
		"path": "../public/assets/forgot-password-Dhk49KL5.js"
	},
	"/assets/invariant-CgFvOqN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-OtvVxjJzKVqOT1XQL6Tnz3B8fGk\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 450,
		"path": "../public/assets/invariant-CgFvOqN2.js"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/label-CwNwkd9L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f1-KsoFcy0B/iPkAoiq6eGRX4Hx1eo\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 753,
		"path": "../public/assets/label-CwNwkd9L.js"
	},
	"/assets/link-CV9_ARC1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"241d-UJvyjjKvD2eYfi4utbbUDeUabAk\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 9245,
		"path": "../public/assets/link-CV9_ARC1.js"
	},
	"/assets/matchContext-BMDgnJWk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-GiC6gkJF7NlpZ08G9LbWnEF5Owc\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 201,
		"path": "../public/assets/matchContext-BMDgnJWk.js"
	},
	"/assets/loader-circle-_BQHudlQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-sj/8unrM4o/Z63sPd4tRX7HHB6E\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 144,
		"path": "../public/assets/loader-circle-_BQHudlQ.js"
	},
	"/assets/offers._id-grQAWSnQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2dee-KoV69v81/Wi/4EgQXJWdHlArA+s\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 11758,
		"path": "../public/assets/offers._id-grQAWSnQ.js"
	},
	"/assets/offers.index-D3c6kia1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c66-oFQWYX7FJ/vGEZ70kYQNEnwSdQo\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 3174,
		"path": "../public/assets/offers.index-D3c6kia1.js"
	},
	"/assets/orders-CrkkPwW1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"817-fdQHxTBvmfmKKULsrQq4CY8VHnw\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 2071,
		"path": "../public/assets/orders-CrkkPwW1.js"
	},
	"/assets/orders._id-B1alOQ3h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ed2-vOKFfVlolNHgQPSkR6nMjQ5bi80\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 11986,
		"path": "../public/assets/orders._id-B1alOQ3h.js"
	},
	"/assets/orders._id-BglcJVmC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-L88aOmBuvenwRSFCZiAqKi57vPg\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 170,
		"path": "../public/assets/orders._id-BglcJVmC.js"
	},
	"/assets/orders.functions-DpRzeUov.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"461-uWwh+SsO555y0/36QBFDhvhI+W4\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1121,
		"path": "../public/assets/orders.functions-DpRzeUov.js"
	},
	"/assets/orders.index-T0n5hAfc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"732-+791IINpoehqtd4b2KKVVh1z/QY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1842,
		"path": "../public/assets/orders.index-T0n5hAfc.js"
	},
	"/assets/pages._slug-Bt2pmCcs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ed-Z9LotFcN2OxfOsYS/9WjDdn3FdQ\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1005,
		"path": "../public/assets/pages._slug-Bt2pmCcs.js"
	},
	"/assets/payouts-C2VXPu1H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0b-74SGnraJMInvQYvTt5i8hQm8sqQ\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 3595,
		"path": "../public/assets/payouts-C2VXPu1H.js"
	},
	"/assets/plus-_bk5skzM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-Mhu5q+iA3i1Cfjt/qQIGdjVRLAY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 153,
		"path": "../public/assets/plus-_bk5skzM.js"
	},
	"/assets/preload-helper--0g-4cfA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"791-eVTkxpCo5mrNmMEmmaotUCR8vFs\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1937,
		"path": "../public/assets/preload-helper--0g-4cfA.js"
	},
	"/assets/index-eQwyVcH_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90745-VWsBtyZD4tqBF3zkt+doLaaKFnY\"",
		"mtime": "2026-10-25T20:52:10.243Z",
		"size": 591685,
		"path": "../public/assets/index-eQwyVcH_.js"
	},
	"/assets/queries-C9YJ6Jq-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c4-v5hn1Ocs5sr7O+UkCDw0a2O7xm0\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 452,
		"path": "../public/assets/queries-C9YJ6Jq-.js"
	},
	"/assets/queryOptions-Dfvzj6n2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-swOrbCYhZ0gnyks4Amdj937R/Ts\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 38,
		"path": "../public/assets/queryOptions-Dfvzj6n2.js"
	},
	"/assets/reset-password-C1S6YELi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-GBonk76F2QNoK4lilWnUMex5nxA\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1125,
		"path": "../public/assets/reset-password-C1S6YELi.js"
	},
	"/assets/reviews-wINl9w15.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ad-I7kuO49EfG3tDkfAgas18e/bET0\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1453,
		"path": "../public/assets/reviews-wINl9w15.js"
	},
	"/assets/route-6a_-R80C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ef-UKvHJ0cDVCZlu6g3HDBwqHIYUCY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 4335,
		"path": "../public/assets/route-6a_-R80C.js"
	},
	"/assets/route-BgV5Tr_w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b08-Kqu9jau15FK1BHpAEpRGeaThI3A\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 2824,
		"path": "../public/assets/route-BgV5Tr_w.js"
	},
	"/assets/route-DQG0iv0x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"297-S0mn4XXduWQMH2MA+NF6YRPV2nE\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 663,
		"path": "../public/assets/route-DQG0iv0x.js"
	},
	"/assets/route-DncL03N6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-Ghl2tCVEBw4tuIeVQue7U0QDNss\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 142,
		"path": "../public/assets/route-DncL03N6.js"
	},
	"/assets/routes-CtwlNA8x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"663-PnwsAM46oBiCtbg6V7cRsBsqqp4\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1635,
		"path": "../public/assets/routes-CtwlNA8x.js"
	},
	"/assets/search-CXu5QZko.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40f-TxG5MkAzThU1noIEZPmaNztV8tY\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1039,
		"path": "../public/assets/search-CXu5QZko.js"
	},
	"/assets/sell-CN_3mbGZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf-CgcJDveOswc2aw04Ry0DKC5Z7gQ\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 719,
		"path": "../public/assets/sell-CN_3mbGZ.js"
	},
	"/assets/seller._id-CpHIk6Gw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aec-c3UXlCjjNG2I63f9AJQzR7/QAN8\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 2796,
		"path": "../public/assets/seller._id-CpHIk6Gw.js"
	},
	"/assets/seller._id-DI6AMN8B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab-z8PE/LpHri0bEEAd6C/2g91ilAo\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 171,
		"path": "../public/assets/seller._id-DI6AMN8B.js"
	},
	"/assets/seller.functions-Dvqhvoic.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"538-kGJZa+rni/q5wzXVwiHlOgyTLms\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1336,
		"path": "../public/assets/seller.functions-Dvqhvoic.js"
	},
	"/assets/send-By_KrZ7_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-/HUVDiR/XDIsWOy3znWkqz42P/Q\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 290,
		"path": "../public/assets/send-By_KrZ7_.js"
	},
	"/assets/shopping-bag-CTVqRHGs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"208-PcP0uzo0/fDgHBrnhNaz3FatmgQ\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 520,
		"path": "../public/assets/shopping-bag-CTVqRHGs.js"
	},
	"/assets/star-B7TKtK2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-Diq0eSj9lVne6Vv9gWpO3W3lf48\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 472,
		"path": "../public/assets/star-B7TKtK2o.js"
	},
	"/assets/styles-BXx4JTXB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15c1f-O3zGn9hEGOVOlwH1PgQ62v5n3bU\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 89119,
		"path": "../public/assets/styles-BXx4JTXB.css"
	},
	"/assets/table-DwJlmDnJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68e-HihEk8VImUJU1Tgxrx6Mu1M22aQ\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 1678,
		"path": "../public/assets/table-DwJlmDnJ.js"
	},
	"/assets/textarea-Dj9lzaEB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"229-kk0OntE8IopKneGn4f+V56f7U0c\"",
		"mtime": "2026-10-25T20:52:10.244Z",
		"size": 553,
		"path": "../public/assets/textarea-Dj9lzaEB.js"
	},
	"/assets/types-2PDoZ-Dj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd5b-rp1lu1GuJk3tI5O3GlBw09gGwtA\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 56667,
		"path": "../public/assets/types-2PDoZ-Dj.js"
	},
	"/assets/useBaseQuery-eiBfMjU_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f67-i/MivJNgPwZeaVLsFE4liDZEQDU\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 8039,
		"path": "../public/assets/useBaseQuery-eiBfMjU_.js"
	},
	"/assets/useQuery-DpujJpoG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60-wME1XhhunwANNE+5E8rN7Jikf3s\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 96,
		"path": "../public/assets/useQuery-DpujJpoG.js"
	},
	"/assets/useSelector-C4C3ivxL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2778-2/C7NHlBL54IFaIRYfDWOaT+o2M\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 10104,
		"path": "../public/assets/useSelector-C4C3ivxL.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/verify-email-4ZwDcbGx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"666-ADZnIdmD9MsFshQTJ2RIrJf+Kc8\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 1638,
		"path": "../public/assets/verify-email-4ZwDcbGx.js"
	},
	"/assets/wallet-D5FO72S0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-LyR5F9vfsZzMaibXe3STCPrRUN8\"",
		"mtime": "2026-10-25T20:52:10.245Z",
		"size": 286,
		"path": "../public/assets/wallet-D5FO72S0.js"
	},
	"/images/offers/console.jpg": {
		"type": "image/jpeg",
		"etag": "\"fb33-1rztxE4Kqj181SQeQUX0ogCLtjk\"",
		"mtime": "2026-10-25T20:52:12.070Z",
		"size": 64307,
		"path": "../public/images/offers/console.jpg"
	},
	"/images/offers/giftcard.jpg": {
		"type": "image/jpeg",
		"etag": "\"100e5-CF8pgYGzTPxOHdVgL54LyFaqupc\"",
		"mtime": "2026-10-25T20:52:12.072Z",
		"size": 65765,
		"path": "../public/images/offers/giftcard.jpg"
	},
	"/images/offers/limited.jpg": {
		"type": "image/jpeg",
		"etag": "\"1556a-lSUyxLE7tUABM+h+at9AKP5tRBM\"",
		"mtime": "2026-10-25T20:52:12.070Z",
		"size": 87402,
		"path": "../public/images/offers/limited.jpg"
	},
	"/images/offers/game.jpg": {
		"type": "image/jpeg",
		"etag": "\"1284e-uhsd5Rhv88ZIX/FatZsXTGf/05M\"",
		"mtime": "2026-10-25T20:52:12.076Z",
		"size": 75854,
		"path": "../public/images/offers/game.jpg"
	},
	"/images/offers/robux.jpg": {
		"type": "image/jpeg",
		"etag": "\"10507-NgB3j3IPtxYGalIC/4MMjHLskl4\"",
		"mtime": "2026-10-25T20:52:12.070Z",
		"size": 66823,
		"path": "../public/images/offers/robux.jpg"
	},
	"/images/offers/software.jpg": {
		"type": "image/jpeg",
		"etag": "\"f1f4-aRgVytGTY2Z3Unh1BIs907/V6qs\"",
		"mtime": "2026-10-25T20:52:12.070Z",
		"size": 61940,
		"path": "../public/images/offers/software.jpg"
	},
	"/images/offers/subscription.jpg": {
		"type": "image/jpeg",
		"etag": "\"10445-r8d/cNZCcRM5WTjxWRbsW4ZIDGQ\"",
		"mtime": "2026-10-25T20:52:12.070Z",
		"size": 66629,
		"path": "../public/images/offers/subscription.jpg"
	},
	"/images/offers/topup.jpg": {
		"type": "image/jpeg",
		"etag": "\"11b1d-C83Y14YWRCKO8D9Jg7Qs3rNNA6c\"",
		"mtime": "2026-10-25T20:52:12.074Z",
		"size": 72477,
		"path": "../public/images/offers/topup.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_fwG0EJ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_fwG0EJ
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
