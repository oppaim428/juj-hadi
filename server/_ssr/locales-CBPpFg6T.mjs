//#region node_modules/.nitro/vite/services/ssr/assets/locales-CBPpFg6T.js
var LOCALES = [
	{
		code: "en",
		name: "English",
		dir: "ltr"
	},
	{
		code: "ar",
		name: "العربية",
		dir: "rtl"
	},
	{
		code: "fr",
		name: "Français",
		dir: "ltr"
	},
	{
		code: "es",
		name: "Español",
		dir: "ltr"
	},
	{
		code: "ru",
		name: "Русский",
		dir: "ltr"
	},
	{
		code: "zh",
		name: "中文",
		dir: "ltr"
	},
	{
		code: "ko",
		name: "한국어",
		dir: "ltr"
	},
	{
		code: "id",
		name: "Bahasa Indonesia",
		dir: "ltr"
	}
];
var LOCALE_COOKIE = "juj_locale";
var isLocale = (v) => LOCALES.some((l) => l.code === v);
var localeDir = (l) => LOCALES.find((x) => x.code === l)?.dir ?? "ltr";
//#endregion
export { localeDir as i, LOCALE_COOKIE as n, isLocale as r, LOCALES as t };
