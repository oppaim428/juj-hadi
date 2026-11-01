import { i as enumType, l as stringType, o as numberType, s as objectType } from "../_libs/zod.mjs";
import { r as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { l as createServerFn } from "./createServerFn-DXkrivVP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-h9fFl8xK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.functions-B4GAVbjF.js
var idOnly = objectType({ id: numberType().int().positive() });
var fetchSiteInfo = createServerFn({ method: "GET" }).handler(createSsrRpc("ff153ef53c02d6ad654f373d4b764b6dd294970724f46955642fbffd6ebc4a07"));
var siteInfoQuery = () => queryOptions({
	queryKey: ["site-info"],
	queryFn: () => fetchSiteInfo(),
	staleTime: 5 * 6e4
});
var fetchBanners = createServerFn({ method: "GET" }).validator((d) => objectType({ placement: enumType(["home", "category"]) }).parse(d)).handler(createSsrRpc("bcca7f326a9b40fb6042d466f378986b11fbe32733ab1e216f071b96a3379018"));
var fetchPage = createServerFn({ method: "GET" }).validator((d) => objectType({ slug: stringType().max(80) }).parse(d)).handler(createSsrRpc("712f166e25e788004d68743c5b871dde3ba07720354b3085ccd452954ab25fd6"));
var submitContactFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("433d5181c40d9ae1cfeb1835f6b4e0d9871f17f8e52adaba19c5b3dde916c2e1"));
var saveSiteInfoFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("81746a18dcfc5bf9999df5c20fe20bed6bc4e9e80d9b2fd57b446a3453a50283"));
var fetchAdminBanners = createServerFn({ method: "GET" }).handler(createSsrRpc("03dc433e0513d107bc5fd2ef725bf57a7e8220802c2f05b81a6f658d0916f841"));
var saveBannerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("2be5964010fc31a489d3480dac93df682da9194cb8996752b04ad02d657a6a94"));
var deleteBannerFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(createSsrRpc("4d165a0312587a2b679f3b31397f7ba08a03d4f34ee6cf7f4b831203a31cdd6a"));
var fetchAdminPages = createServerFn({ method: "GET" }).handler(createSsrRpc("7175198464283e8dd95bb7a442ec7ce01828c23a6b7f7d039c21f9a04fc83480"));
var savePageFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("ef9be22d1ffccaa24dc1b4620b2f2b84ccb614d12076aaa4edc2aa9a2673bc3f"));
var deletePageFn = createServerFn({ method: "POST" }).validator((d) => idOnly.parse(d)).handler(createSsrRpc("073371cf5158a8c77d14408d0d356ce2f21ce542ced00404d5ff0b86180b0d70"));
var fetchMessages = createServerFn({ method: "GET" }).validator((d) => objectType({ status: enumType(["new", "read"]).optional() }).parse(d)).handler(createSsrRpc("ab1adb86be0f7cc5368b747d38ca2c11e9b4dd95177e3962d07da436590f79fc"));
var setMessageStatusFn = createServerFn({ method: "POST" }).validator((d) => idOnly.extend({ status: enumType([
	"new",
	"read",
	"delete"
]) }).parse(d)).handler(createSsrRpc("7677bfa51afec6a769d51e7abe78765bc8b3e2d694e6f810e3700d3f0f23458e"));
//#endregion
export { fetchBanners as a, saveBannerFn as c, setMessageStatusFn as d, siteInfoQuery as f, fetchAdminPages as i, savePageFn as l, deletePageFn as n, fetchMessages as o, submitContactFn as p, fetchAdminBanners as r, fetchPage as s, deleteBannerFn as t, saveSiteInfoFn as u };
