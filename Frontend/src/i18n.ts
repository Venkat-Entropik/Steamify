import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "./locales/en.json";
import frTranslations from "./locales/fr.json";
import zhTranslations from "./locales/zh.json";
import koTranslations from "./locales/ko.json";
import teTranslations from "./locales/te.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      zh: { translation: zhTranslations },
      ko: { translation: koTranslations },
      te: {translation: teTranslations},
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

export default i18n;
