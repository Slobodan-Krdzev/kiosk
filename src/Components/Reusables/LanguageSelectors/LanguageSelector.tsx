import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import Chevron from "../SVG/Chevron";
import styles from "./LanguageSelectorStyles.module.css";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { data, handleLangChange } = useContext(DataContext);
  const languageOptions = data.ThemeResponse.LanguagesList;
  const {  i18n: {changeLanguage, language} } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const [selectedLang, setSelectedLang] = useState(
    data.ThemeResponse.LanguagesList[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Event: Click outside -> Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, []);

  
  
    const handleChangeLanguage = (lang: string) => {
      const newLanguage = lang;
      setCurrentLanguage(lang);
      changeLanguage(newLanguage);
      handleLangChange(lang)
    }

  return (
    <div className={styles.dropupContainer} ref={dropdownRef}>
      {/* Event: Click button -> Toggle dropdown */}

      {/* DropUp Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={styles.dropdownMenu}
          >
            <ul className={styles.langMenuOptionsUl}>
              {languageOptions.map((lang) => (
                <li
                  key={lang.Locale}
                  onClick={() => {
                    setSelectedLang(lang);
                    setIsOpen(false);
                    handleChangeLanguage(lang.Locale)
                  }}
                >
                  <img
                    className={styles.flag}
                    alt={currentLanguage}
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${lang?.Locale === 'en' ? 'GB' : lang?.Locale.toUpperCase()}.svg`}
                  />
                  {lang.Name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={styles.dropupButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          alt={selectedLang?.Name}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedLang?.Locale === 'en' ? 'GB' : selectedLang?.Locale.toUpperCase()}.svg`}
          className={styles.flag}
        />
        {selectedLang.Name}
        <Chevron orientation={isOpen ? "toBottom" : "toTop"} color="black" />
      </button>
    </div>
  );
};

export default LanguageSelector;
