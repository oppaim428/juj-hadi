import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./useAuth-BxnIqOmJ.mjs";
import { r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { t as favoritesQuery } from "./queries-BI1eUs-w.mjs";
import { n as OfferGridView } from "./OfferCard-wYrUBDkt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-BRFU2fgA.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { user } = useAuth();
	const { t } = useI18n();
	const q = useQuery(favoritesQuery(user?.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5 px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: t("Favorites")
		}), q.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferGridView, { items: q.data }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center text-muted-foreground",
			"data-testid": "favorites-empty",
			children: q.isPending ? t("Loading…") : t("Nothing saved yet.")
		})]
	});
}
//#endregion
export { Page as component };
