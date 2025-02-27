
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
import translationCS from "./locales/cs/translation.json";
import translationEN from "./locales/en/translation.json";

// the translations
const resources = {
  cs: {
    translation: translationCS
  },
  en: {
    translation: translationEN
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: "cs",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
