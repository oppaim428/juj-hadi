import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as require_jsx_runtime, _ as DialogTrigger, d as DialogClose, f as DialogContent, g as DialogTitle, h as DialogPortal, m as DialogOverlay, p as DialogDescription, u as Dialog } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useRefreshSession, r as useRootData, t as useAuth } from "./useAuth-BxnIqOmJ.mjs";
import { t as LOCALES } from "./locales-CBPpFg6T.mjs";
import { n as setLocale, r as useI18n } from "./i18n-WFJnVUKq.mjs";
import { A as LayoutDashboard, G as Check, I as Heart, L as Globe, S as Monitor, V as Circle, W as ChevronRight, b as Package, c as Store, f as ShieldCheck, h as Search, i as User, k as LayoutGrid, s as Sun, t as X, x as Moon, y as Palette } from "../_libs/lucide-react.mjs";
import { l as logoutFn } from "./catalog.functions-Dh4mxjZI.mjs";
import { a as DropdownMenuItemIndicator, c as DropdownMenuRadioItem$1, d as DropdownMenuSubTrigger$1, f as DropdownMenuTrigger$1, i as DropdownMenuItem$1, l as DropdownMenuSeparator$1, n as DropdownMenuCheckboxItem$1, o as DropdownMenuLabel$1, r as DropdownMenuContent$1, s as DropdownMenuPortal, t as DropdownMenu$1, u as DropdownMenuSubContent$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as flatten } from "./queries-BI1eUs-w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Header-CJHAIqoj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = DropdownMenu$1;
var DropdownMenuTrigger = DropdownMenuTrigger$1;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger$1, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuSubTrigger$1.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent$1, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuSubContent$1.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent$1, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuContent$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem$1, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuItem$1.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuCheckboxItem$1, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuCheckboxItem$1.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioItem$1, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuRadioItem$1.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuLabel$1.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuSeparator$1.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var KEY = "juj-theme";
/** Inline script run before paint so the saved theme never flashes. */
var themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}")||"system";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
var Ctx = (0, import_react.createContext)({
	theme: "system",
	setTheme: () => {}
});
function apply(t) {
	const dark = t === "dark" || t === "system" && matchMedia("(prefers-color-scheme: dark)").matches;
	document.documentElement.classList.toggle("dark", dark);
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("system");
	(0, import_react.useEffect)(() => {
		setThemeState(localStorage.getItem(KEY) || "system");
	}, []);
	(0, import_react.useEffect)(() => {
		apply(theme);
		if (theme !== "system") return;
		const mq = matchMedia("(prefers-color-scheme: dark)");
		const on = () => apply("system");
		mq.addEventListener("change", on);
		return () => mq.removeEventListener("change", on);
	}, [theme]);
	const setTheme = (t) => {
		localStorage.setItem(KEY, t);
		setThemeState(t);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			theme,
			setTheme
		},
		children
	});
}
var useTheme = () => (0, import_react.useContext)(Ctx);
var colors = [
	"green",
	"orange",
	"yellow",
	"blue"
];
function GlowPicker() {
	const [color, setColor] = (0, import_react.useState)("green");
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("juj-glow");
			const selected = colors.find((value) => value === saved) ?? colors.find((value) => value === document.documentElement.dataset["glow"]) ?? "green";
			setColor(selected);
			document.documentElement.dataset["glow"] = selected;
		} catch {}
	}, []);
	function select(value) {
		setColor(value);
		document.documentElement.dataset["glow"] = value;
		try {
			localStorage.setItem("juj-glow", value);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: "shrink-0 text-ring",
			"aria-label": "Glow color",
			title: "Glow color",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-5 w-5" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-44",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Glow color" }), colors.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: () => select(value),
			"aria-label": `${value} glow`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `glow-swatch glow-swatch-${value}`,
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 capitalize",
					children: value
				}),
				color === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
			]
		}, value))]
	})] });
}
function Logo() {
	const { site } = useRootData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		"data-testid": "header-logo",
		className: "flex shrink-0 items-center gap-1 font-display text-2xl font-bold tracking-tight",
		children: site.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: site.logo_url,
			alt: site.site_name,
			className: "h-9 w-auto max-w-[140px] object-contain",
			"data-testid": "header-logo-image"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-md bg-primary px-1.5 text-primary-foreground",
			children: site.site_name
		})
	});
}
function TreeList({ nodes, onPick, depth = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: depth ? "ms-3 border-s ps-3" : "space-y-1",
		children: nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalog/$categorySlug",
			params: { categorySlug: n.slug },
			onClick: onPick,
			"data-testid": `catalog-menu-${n.slug}`,
			className: `block rounded-md px-2 py-1.5 hover:bg-accent ${depth ? "text-sm" : "font-medium"}`,
			children: n.name
		}), n.children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeList, {
			nodes: n.children,
			onPick,
			depth: depth + 1
		})] }, n.id))
	});
}
function ThemeItems() {
	const { theme, setTheme } = useTheme();
	const { t } = useI18n();
	const themes = [
		{
			v: "light",
			label: t("Light"),
			icon: Sun
		},
		{
			v: "dark",
			label: t("Dark"),
			icon: Moon
		},
		{
			v: "system",
			label: t("System"),
			icon: Monitor
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: t("Theme") }), themes.map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
		"data-testid": `theme-${th.v}`,
		onClick: () => setTheme(th.v),
		className: theme === th.v ? "bg-accent" : "",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(th.icon, { className: "me-2 h-4 w-4" }),
			" ",
			th.label
		]
	}, th.v))] });
}
function LanguageMenu() {
	const { locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			"aria-label": "Language",
			"data-testid": "language-menu-button",
			className: "shrink-0 gap-1 px-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold uppercase",
				children: locale
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		className: "w-48",
		children: LOCALES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			"data-testid": `language-${l.code}`,
			onClick: () => setLocale(l.code),
			className: locale === l.code ? "bg-accent" : "",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-7 text-xs font-semibold uppercase text-muted-foreground",
					children: l.code
				}),
				" ",
				l.name
			]
		}, l.code))
	})] });
}
function ProfileMenu() {
	const { user } = useAuth();
	const { t } = useI18n();
	const refresh = useRefreshSession();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: user ? "secondary" : "default",
			size: "sm",
			"aria-label": "Account",
			"data-testid": "profile-menu-button",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: user ? t("Profile") : t("Login")
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-56",
		children: [
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
					className: "truncate font-normal text-muted-foreground",
					"data-testid": "profile-email",
					children: user.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						"data-testid": "menu-orders",
						children: t("My orders")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/favorites",
						"data-testid": "menu-favorites",
						children: t("Favorites")
					})
				}),
				(user.role === "seller" || user.role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cabinet",
						"data-testid": "menu-cabinet",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "me-2 h-4 w-4" }), t("Seller cabinet")]
					})
				}),
				user.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						"data-testid": "menu-admin",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "me-2 h-4 w-4" }), t("Admin panel")]
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					"data-testid": "menu-login",
					children: t("Log in or sign up")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeItems, {}),
			user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				"data-testid": "menu-logout",
				onClick: async () => {
					await logoutFn();
					await refresh();
					navigate({ to: "/" });
				},
				children: t("Log out")
			})] })
		]
	})] });
}
function Header() {
	const { tree } = useRootData();
	const { user } = useAuth();
	const { t } = useI18n();
	const hot = flatten(tree).filter((c) => c.show_in_header);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const panel = user?.role === "admin" ? "/admin" : user?.role === "seller" ? "/cabinet" : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b bg-background/90 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							"data-testid": "catalog-menu-button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline",
								children: t("Catalog")
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "left",
						className: "overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: t("Catalog") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 pb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeList, {
								nodes: tree,
								onPick: () => setOpen(false)
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "relative min-w-0 flex-1",
					onSubmit: (e) => {
						e.preventDefault();
						if (q.trim()) navigate({
							to: "/search",
							search: { q: q.trim() }
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: t("Search games, cards, keys…"),
						className: "ps-9 placeholder:text-ellipsis",
						maxLength: 100,
						"aria-label": "Search",
						"data-testid": "header-search-input"
					})]
				}),
				panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: panel,
					"data-testid": "header-panel-link",
					className: "hidden items-center gap-1 text-sm font-medium hover:text-primary lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }),
						" ",
						user?.role === "admin" ? t("Admin panel") : t("Seller cabinet")
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/sell",
					"data-testid": "header-start-selling",
					className: "hidden text-sm font-medium hover:text-primary lg:block",
					children: t("Start selling")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowPicker, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageMenu, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "icon",
					"aria-label": "Favorites",
					className: "hidden sm:inline-flex",
					"data-testid": "header-favorites",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/favorites",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "icon",
					"aria-label": "Orders",
					className: "hidden sm:inline-flex",
					"data-testid": "header-orders",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMenu, {})
			]
		}), hot.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickChips, {
			items: hot,
			className: "mx-auto max-w-7xl px-4 pb-3"
		})]
	});
}
function QuickChips({ items, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex gap-2 overflow-x-auto ${className}`,
		children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalog/$categorySlug",
			params: { categorySlug: c.slug },
			"data-testid": `quick-chip-${c.slug}`,
			className: "shrink-0 rounded-full border px-3 py-1 text-sm hover:border-primary hover:bg-accent",
			activeProps: { className: "border-primary bg-accent" },
			children: c.name
		}, c.id))
	});
}
//#endregion
export { themeInitScript as a, ThemeProvider as i, Logo as n, QuickChips as r, Header as t };
