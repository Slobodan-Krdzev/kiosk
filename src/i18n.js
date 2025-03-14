
import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import de from "./Locales/de.json";
import en from "./Locales/en.json";
import es from "./Locales/es.json";
import fr from "./Locales/fr.json";
import nl from "./Locales/nl.json";
import tr from "./Locales/tr.json";

const loadLocales = async () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: "nl",
      returnObjects: true,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        nl: {
          translation: nl,
        },
        en: {
          translation: en,
        },
        de: {
          translation: de,
        },
        es: {
          translation: es,
        }, fr: {
          translation: fr,
        },
        tr: {
          translation: tr,
        },
      },
    });
};

loadLocales();

export default i18n;