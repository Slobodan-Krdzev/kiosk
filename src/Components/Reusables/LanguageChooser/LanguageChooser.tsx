import { LanguagesList } from "../../../Types/Types";
import styles from "./LanguageChooserStles.module.css";
import i18n from "i18next";

type LanguageChooserPropsType = {
  locale: LanguagesList;
};

const LanguageChooser = ({ locale }: LanguageChooserPropsType) => {
  const handleLocaleChange = () => {
    i18n.changeLanguage(locale.Locale);
  };

  const currentLanguage = i18n.language;
  const langCode = locale.Locale === "en" ? "gb" : locale.Locale;

  return (
    <button className={styles.localeBtn} onClick={handleLocaleChange} style={{
        filter: currentLanguage !== langCode ? "blur(3px)" : ""
    }}>
      <img
        className={styles.localeBtnImage}
        alt="Dutch"
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${langCode.toUpperCase()}.svg`}
      />
    </button>
  );
};

export default LanguageChooser;
