import { useContext } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import styles from "./LanguageSelectorStyles.module.css";
import ReactCountryFlag from "react-country-flag"

const LanguageSelector = () => {
  const { data } = useContext(DataContext);

  const languageOptions = data.ThemeResponse.LanguagesList;

  return (
    <select
      name="languageSelector"
      id="languageSelector"
      className={styles.languageSelector}
    >
      {languageOptions?.map((lang) => (
        <option key={lang?.Locale} value={lang?.Locale}>
          <ReactCountryFlag
            className="emojiFlag"
            countryCode={lang?.Locale.toUpperCase()}
            style={{
              fontSize: "2em",
              lineHeight: "2em",
            }}
            aria-label={lang?.Name}
          />{" "}
          {lang.Name.length > 22
            ? `${lang.Name.substring(0, 15)}...`
            : lang.Name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
