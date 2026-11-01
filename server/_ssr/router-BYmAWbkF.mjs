import { o as __toESM } from "../_runtime.mjs";
import { a as parseSocial } from "./content.schemas-CHAMcqAS.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as useRouter, J as redirect, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as Link, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as useRootData } from "./useAuth-BxnIqOmJ.mjs";
import { i as localeDir } from "./locales-CBPpFg6T.mjs";
import { r as useI18n, t as I18nProvider } from "./i18n-WFJnVUKq.mjs";
import { f as siteInfoQuery } from "./content.functions-B4GAVbjF.mjs";
import { t as Route$20 } from "../_section-Bk4FypOq.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as currentUser, m as one, s as exec } from "./auth.server-BtcIQrdK.mjs";
import { O as stripeEvent, k as verifyNowPayments, x as paymentNotified } from "./orders.server-BlUc8kv0.mjs";
import { p as sessionQuery, t as categoryTreeQuery } from "./catalog.functions-Dh4mxjZI.mjs";
import { n as Route$21 } from "./auth-9d8UJB90.mjs";
import { t as Route$22 } from "./catalog._categorySlug-CErA6IUW.mjs";
import { t as Route$23 } from "./catalog.product._offer-DyHBRKdx.mjs";
import { t as Route$24 } from "./checkout.return-BC-KwTmd.mjs";
import { t as Route$25 } from "./offers._id-7l2Xlljr.mjs";
import { t as Route$26 } from "./orders._id-Bnjq7yRB.mjs";
import { t as Route$27 } from "./pages._slug-DDcOTGGg.mjs";
import { t as Route$28 } from "./reset-password-D7mBOuH9.mjs";
import { a as themeInitScript, i as ThemeProvider, n as Logo, t as Header } from "./Header-CJHAIqoj.mjs";
import { t as Route$29 } from "./search-CJP7o4ib.mjs";
import { t as Route$30 } from "./verify-email-DLQVNe6l.mjs";
import { t as Route$31 } from "./seller._id-_qtgSpRf.mjs";
import { randomUUID } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BYmAWbkF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BXx4JTXB.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function Footer() {
	const { t } = useI18n();
	const { site } = useRootData();
	const social = parseSocial(site.social_links);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-16 border-t bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							"data-testid": "footer-tagline",
							children: t(site.site_tagline)
						}),
						social.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: social.map(([label, url]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: url,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-full border px-2.5 py-0.5 text-xs hover:border-primary",
								children: label
							}, url))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 font-semibold",
					children: t("Partners")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sell",
						className: "hover:text-foreground",
						children: t("Start selling")
					}) })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 font-semibold",
					children: t("Buyers")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: { q: "" },
							className: "hover:text-foreground",
							children: t("Search")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/favorites",
							className: "hover:text-foreground",
							children: t("Favorites")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							className: "hover:text-foreground",
							children: t("My orders")
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 font-semibold",
					children: t("Company")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-foreground",
							"data-testid": "footer-contact",
							children: t("Contact us")
						}) }),
						site.pages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pages/$slug",
							params: { slug: p.slug },
							className: "hover:text-foreground",
							"data-testid": `footer-page-${p.slug}`,
							children: t(p.title)
						}) }, p.slug)),
						site.contact_email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							t("Support"),
							": ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site.contact_email}`,
								className: "text-foreground hover:underline",
								children: site.contact_email
							})
						] })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t py-4 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				site.site_name
			]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
/** Decorative, non-interactive dust; all appearance comes from theme tokens. */
function DustEffect() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0;
		let previous = 0;
		let width = 0;
		let height = 0;
		let color = "";
		const particles = Array.from({ length: 100 }, (_, i) => ({
			x: (i * 37 + 11) % 101 / 101,
			y: (i * 53 + 17) % 103 / 103,
			size: 1.5 + i % 3 * .7,
			speed: .008 + i % 5 * .002,
			opacity: .65 + i % 4 * .1
		}));
		const resize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = width * ratio;
			canvas.height = height * ratio;
			context.setTransform(ratio, 0, 0, ratio, 0, 0);
			color = getComputedStyle(document.documentElement).getPropertyValue("--dust").trim();
		};
		const draw = (now) => {
			const delta = previous ? Math.min((now - previous) / 1e3, .05) : 0;
			previous = now;
			context.clearRect(0, 0, width, height);
			context.fillStyle = color;
			context.shadowColor = color;
			context.shadowBlur = 5;
			for (const particle of particles) {
				if (!reducedMotion.matches) {
					particle.y = (particle.y - particle.speed * delta + 1) % 1;
					particle.x = (particle.x + particle.speed * delta * .35) % 1;
				}
				context.globalAlpha = particle.opacity;
				context.beginPath();
				context.arc(particle.x * width, particle.y * height, particle.size / 2, 0, Math.PI * 2);
				context.fill();
			}
			if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
		};
		const restart = () => {
			cancelAnimationFrame(frame);
			previous = 0;
			resize();
			frame = requestAnimationFrame(draw);
		};
		const themeObserver = new MutationObserver(restart);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class", "data-glow"]
		});
		window.addEventListener("resize", restart);
		reducedMotion.addEventListener("change", restart);
		restart();
		return () => {
			cancelAnimationFrame(frame);
			themeObserver.disconnect();
			window.removeEventListener("resize", restart);
			reducedMotion.removeEventListener("change", restart);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "dust-effect",
		"aria-hidden": "true"
	});
}
function NotFoundComponent() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: t("Page not found")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("The page you're looking for doesn't exist or has been moved.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: t("Go home")
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { t } = useI18n();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: t("This page didn't load")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t(error?.message || "Something went wrong on our end. You can try refreshing or head back home.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: t("Try again")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: t("Go home")
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: ({ loaderData: ld }) => {
		const loaderData = ld;
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: `${loaderData?.site.site_name ?? "JUJ"} — Digital goods marketplace` },
				{
					name: "description",
					content: "Buy game currency, gift cards, keys and subscriptions from trusted sellers."
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			],
			links: [
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "icon",
					href: loaderData?.site.favicon_url || "/favicon.ico"
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans+Arabic:wght@400;600&display=swap"
				}
			]
		};
	},
	loader: async ({ context }) => {
		const [tree, session, site] = await Promise.all([
			context.queryClient.ensureQueryData(categoryTreeQuery()),
			context.queryClient.ensureQueryData(sessionQuery()),
			context.queryClient.ensureQueryData(siteInfoQuery())
		]);
		return {
			tree,
			session,
			site
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function useLocale() {
	return useRouterState({ select: (s) => (s.matches[0]?.loaderData)?.session.locale ?? "en" });
}
var glowInitScript = `(function(){try{var g=localStorage.getItem("juj-glow");if(g)document.documentElement.dataset.glow=g}catch(e){}})()`;
function RootShell({ children }) {
	const locale = useLocale();
	const glow = useRouterState({ select: (s) => (s.matches[0]?.loaderData)?.site.default_glow ?? "green" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: locale,
		dir: localeDir(locale),
		"data-glow": glow,
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeInitScript } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: glowInitScript } })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	const locale = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, {
			locale,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DustEffect, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "storefront-content flex min-h-screen flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: localeDir(locale) === "rtl" ? "bottom-left" : "bottom-right" })
			] })
		})
	});
}
var $$splitComponentImporter$14 = () => import("./routes-DI5_mpod.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "JUJ — Robux, game keys, gift cards & subscriptions" },
		{
			name: "description",
			content: "Shop digital goods from verified sellers. Money is held until you receive your item."
		},
		{
			property: "og:title",
			content: "JUJ — Digital goods marketplace"
		},
		{
			property: "og:description",
			content: "Robux, game keys, gift cards and subscriptions from trusted sellers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./route-Di7iQBCH.mjs");
var Route$17 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location, context }) => {
		const s = await context.queryClient.ensureQueryData(sessionQuery());
		if (!s.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { user: s.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./contact-DV0ovwdx.mjs");
var Route$16 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact us — JUJ" }, {
		name: "description",
		content: "Get in touch with the JUJ team."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./forgot-password--i9epnY3.mjs");
var Route$15 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot password — JUJ" }, {
		name: "description",
		content: "Reset your JUJ password."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./sell-C44YOjiq.mjs");
var Route$14 = createFileRoute("/sell")({
	head: () => ({ meta: [{ title: "Start selling — JUJ" }, {
		name: "description",
		content: "Sell digital goods to buyers worldwide on JUJ."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./route-d36n_wE-.mjs");
var Route$13 = createFileRoute("/_authenticated/admin")({
	beforeLoad: ({ context }) => {
		if (context.user.role !== "admin") throw redirect({ to: "/" });
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./route-D0yEuL_1.mjs");
var Route$12 = createFileRoute("/_authenticated/cabinet")({
	beforeLoad: ({ context }) => {
		if (context.user.role !== "seller" && context.user.role !== "admin") throw redirect({ to: "/sell" });
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./favorites-BRFU2fgA.mjs");
var Route$11 = createFileRoute("/_authenticated/favorites")({
	head: () => ({ meta: [{ title: "Favorites — JUJ" }, {
		name: "description",
		content: "Offers you saved on JUJ."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var BASE = `${((process.env["INTEGRATION_PROXY_URL"] || "").trim() || "https://integrations.emergentagent.com").replace(/\/+$/, "")}/objstore/api/v1/storage`;
var key;
function storageKey(force = false) {
	if (force) key = void 0;
	key ??= fetch(`${BASE}/init`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ emergent_key: process.env["EMERGENT_LLM_KEY"] })
	}).then(async (r) => {
		if (!r.ok) throw new Error(`storage init ${r.status}`);
		return (await r.json()).storage_key;
	}).catch((e) => {
		key = void 0;
		throw e;
	});
	return key;
}
async function call(path, init, retry = true) {
	const r = await fetch(`${BASE}/objects/${path}`, {
		...init,
		headers: {
			...init.headers,
			"X-Storage-Key": await storageKey()
		}
	});
	if (r.status === 404 && retry) {
		await storageKey(true);
		return call(path, init, false);
	}
	return r;
}
async function putObject(path, data, contentType) {
	const r = await call(path, {
		method: "PUT",
		headers: { "Content-Type": contentType },
		body: data
	});
	if (!r.ok) throw new Error(`storage put ${r.status}`);
	return await r.json();
}
async function getObject(path) {
	const r = await call(path, { method: "GET" });
	if (!r.ok) return null;
	return {
		body: await r.arrayBuffer(),
		type: r.headers.get("content-type") ?? "application/octet-stream"
	};
}
var TYPES = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/webp": "webp",
	"image/gif": "gif",
	"image/x-icon": "ico",
	"image/vnd.microsoft.icon": "ico"
};
var MAX = 5 * 1024 * 1024;
var Route$10 = createFileRoute("/api/uploads")({ server: { handlers: { POST: async ({ request }) => {
	const user = await currentUser();
	if (!user || user.role === "buyer") return Response.json({ error: "Only sellers and admins can upload images." }, { status: 401 });
	const file = (await request.formData().catch(() => null))?.get("file");
	if (!(file instanceof File)) return Response.json({ error: "Choose an image file." }, { status: 400 });
	const ext = TYPES[file.type];
	if (!ext) return Response.json({ error: "Use a PNG, JPG, WEBP, GIF or ICO image." }, { status: 400 });
	if (file.size > MAX) return Response.json({ error: "The image must be 5 MB or smaller." }, { status: 413 });
	try {
		const r = await putObject(`juj/uploads/${user.id}/${randomUUID()}.${ext}`, new Uint8Array(await file.arrayBuffer()), file.type);
		await exec("INSERT INTO uploads (id, storage_path, original_name, content_type, size_bytes, uploader_id) VALUES (?, ?, ?, ?, ?, ?)", [
			randomUUID(),
			r.path,
			file.name.slice(0, 255),
			file.type,
			file.size,
			user.id
		]);
		return Response.json({ url: `/api/files/${r.path}` });
	} catch (e) {
		console.error("[upload]", e);
		return Response.json({ error: "Upload failed. Please try again." }, { status: 502 });
	}
} } } });
var $$splitComponentImporter$6 = () => import("./admin-Cexx9NN_.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [{ title: "Admin — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./cabinet-DcnNWSB9.mjs");
var Route$8 = createFileRoute("/_authenticated/cabinet/")({
	head: () => ({ meta: [{ title: "Seller cabinet — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./orders-BEUvd-iI.mjs");
var Route$7 = createFileRoute("/_authenticated/cabinet/orders")({
	head: () => ({ meta: [{ title: "Seller orders — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./payouts-BuwG85VZ.mjs");
var Route$6 = createFileRoute("/_authenticated/cabinet/payouts")({
	head: () => ({ meta: [{ title: "Payouts — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./reviews-B-KkfiJF.mjs");
var Route$5 = createFileRoute("/_authenticated/cabinet/reviews")({
	head: () => ({ meta: [{ title: "Reviews — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./orders.index-Dg21O2Sf.mjs");
var Route$4 = createFileRoute("/_authenticated/orders/")({
	head: () => ({ meta: [{ title: "My orders — JUJ" }, {
		name: "description",
		content: "Your JUJ orders."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$3 = createFileRoute("/api/files/$")({ server: { handlers: { GET: async ({ params }) => {
	const path = params._splat ?? "";
	const rec = await one("SELECT content_type FROM uploads WHERE storage_path = ? AND is_deleted = 0", [path]);
	if (!rec) return new Response("Not found", { status: 404 });
	const obj = await getObject(path);
	if (!obj) return new Response("Not found", { status: 404 });
	return new Response(obj.body, { headers: {
		"content-type": rec.content_type,
		"cache-control": "public, max-age=31536000, immutable"
	} });
} } } });
var Route$2 = createFileRoute("/api/stripe/webhook")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const ev = stripeEvent(await request.text(), request.headers.get("stripe-signature") ?? "");
		const s = ev.data.object;
		if (ev.type === "checkout.session.completed" || ev.type === "checkout.session.async_payment_succeeded") {
			if (s.payment_status === "paid") await paymentNotified("stripe", s.id, "paid");
		} else if (ev.type === "checkout.session.expired" || ev.type === "checkout.session.async_payment_failed") await paymentNotified("stripe", s.id, "failed");
		return Response.json({ status: "ok" });
	} catch {
		return Response.json({ error: "invalid_signature" }, { status: 400 });
	}
} } } });
var $$splitComponentImporter = () => import("./offers.index-B7EUyZq_.mjs");
var Route$1 = createFileRoute("/_authenticated/cabinet/offers/")({
	head: () => ({ meta: [{ title: "My offers — JUJ" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/payments/crypto/ipn")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body || !verifyNowPayments(body, request.headers.get("x-nowpayments-sig") ?? "")) return Response.json({ error: "bad_signature" }, { status: 400 });
	const st = body.payment_status === "finished" || body.payment_status === "confirmed" ? "paid" : body.payment_status === "failed" || body.payment_status === "expired" ? "failed" : "pending";
	if (body.invoice_id) await paymentNotified("crypto", String(body.invoice_id), st);
	return Response.json({ ok: true });
} } } });
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRoute = Route$17.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var AuthRoute = Route$21.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$16.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var ForgotPasswordRoute = Route$15.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$19
});
var ResetPasswordRoute = Route$28.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$19
});
var SearchRoute = Route$29.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$19
});
var SellRoute = Route$14.update({
	id: "/sell",
	path: "/sell",
	getParentRoute: () => Route$19
});
var VerifyEmailRoute = Route$30.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$19
});
var AuthenticatedAdminRouteRoute = Route$13.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCabinetRouteRoute = Route$12.update({
	id: "/cabinet",
	path: "/cabinet",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFavoritesRoute = Route$11.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiUploadsRoute = Route$10.update({
	id: "/api/uploads",
	path: "/api/uploads",
	getParentRoute: () => Route$19
});
var CatalogCategorySlugRoute = Route$22.update({
	id: "/catalog/$categorySlug",
	path: "/catalog/$categorySlug",
	getParentRoute: () => Route$19
});
var PagesSlugRoute = Route$27.update({
	id: "/pages/$slug",
	path: "/pages/$slug",
	getParentRoute: () => Route$19
});
var SellerIdRoute = Route$31.update({
	id: "/seller/$id",
	path: "/seller/$id",
	getParentRoute: () => Route$19
});
var AuthenticatedAdminIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminSectionRoute = Route$20.update({
	id: "/$section",
	path: "/$section",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedCabinetIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedCabinetRouteRoute
});
var AuthenticatedCabinetOrdersRoute = Route$7.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AuthenticatedCabinetRouteRoute
});
var AuthenticatedCabinetPayoutsRoute = Route$6.update({
	id: "/payouts",
	path: "/payouts",
	getParentRoute: () => AuthenticatedCabinetRouteRoute
});
var AuthenticatedCabinetReviewsRoute = Route$5.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => AuthenticatedCabinetRouteRoute
});
var AuthenticatedCheckoutReturnRoute = Route$24.update({
	id: "/checkout/return",
	path: "/checkout/return",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrdersIndexRoute = Route$4.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrdersIdRoute = Route$26.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiFilesSplatRoute = Route$3.update({
	id: "/api/files/$",
	path: "/api/files/$",
	getParentRoute: () => Route$19
});
var ApiStripeWebhookRoute = Route$2.update({
	id: "/api/stripe/webhook",
	path: "/api/stripe/webhook",
	getParentRoute: () => Route$19
});
var CatalogProductOfferRoute = Route$23.update({
	id: "/catalog/product/$offer",
	path: "/catalog/product/$offer",
	getParentRoute: () => Route$19
});
var AuthenticatedCabinetOffersIndexRoute = Route$1.update({
	id: "/offers/",
	path: "/offers/",
	getParentRoute: () => AuthenticatedCabinetRouteRoute
});
var AuthenticatedCabinetOffersIdRoute = Route$25.update({
	id: "/offers/$id",
	path: "/offers/$id",
	getParentRoute: () => AuthenticatedCabinetRouteRoute
});
var ApiPaymentsCryptoIpnRoute = Route.update({
	id: "/api/payments/crypto/ipn",
	path: "/api/payments/crypto/ipn",
	getParentRoute: () => Route$19
});
var AuthenticatedAdminRouteRouteChildren = {
	AuthenticatedAdminSectionRoute,
	AuthenticatedAdminIndexRoute
};
var AuthenticatedAdminRouteRouteWithChildren = AuthenticatedAdminRouteRoute._addFileChildren(AuthenticatedAdminRouteRouteChildren);
var AuthenticatedCabinetRouteRouteChildren = {
	AuthenticatedCabinetOrdersRoute,
	AuthenticatedCabinetPayoutsRoute,
	AuthenticatedCabinetReviewsRoute,
	AuthenticatedCabinetIndexRoute,
	AuthenticatedCabinetOffersIdRoute,
	AuthenticatedCabinetOffersIndexRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRouteWithChildren,
	AuthenticatedCabinetRouteRoute: AuthenticatedCabinetRouteRoute._addFileChildren(AuthenticatedCabinetRouteRouteChildren),
	AuthenticatedFavoritesRoute,
	AuthenticatedCheckoutReturnRoute,
	AuthenticatedOrdersIdRoute,
	AuthenticatedOrdersIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ContactRoute,
	ForgotPasswordRoute,
	ResetPasswordRoute,
	SearchRoute,
	SellRoute,
	VerifyEmailRoute,
	ApiUploadsRoute,
	CatalogCategorySlugRoute,
	PagesSlugRoute,
	SellerIdRoute,
	ApiFilesSplatRoute,
	ApiStripeWebhookRoute,
	CatalogProductOfferRoute,
	ApiPaymentsCryptoIpnRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: { queries: { staleTime: 3e4 } } }) },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
