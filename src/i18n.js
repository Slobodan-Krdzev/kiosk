// import i18next from "i18next";
import i18n from "i18next";

// import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import nl from "./Locales/nl.json"
import en from "./Locales/en.json"
import fr from "./Locales/fr.json"
import es from "./Locales/es.json"
import de from "./Locales/de.json"
import tr from "./Locales/tr.json"

// const apiKey = "pg3uKp_7aIVGsaA-SkqhHQ";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({

//     lng: 'nl',
//     fallbackLng: "en",

//     ns: ["default"],
//     defaultNS: "default",

//     resources: {
//       nl: { 
//         translation: nl
//       },
//       en: {
//         translation: en
//       }
//     }
//     backend: {
//       loadPath: "/locales/{{lng}}.json"
//     }
//   })
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