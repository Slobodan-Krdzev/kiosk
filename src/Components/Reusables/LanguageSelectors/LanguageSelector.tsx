import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import styles from "./LanguageSelectorStyles.module.css";
import ReactCountryFlag from "react-country-flag";
import { AnimatePresence, motion } from "framer-motion";
import Chevron from "../SVG/Chevron";

const LanguageSelector = () => {
  const { data } = useContext(DataContext);
  const languageOptions = data.ThemeResponse.LanguagesList;

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
                    setSelectedLang(lang)
                    setIsOpen(false)
                  }}
                >
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={lang?.Locale.toUpperCase()}
                    style={{
                      fontSize: "1em",
                      lineHeight: "2em",
                    }}
                    aria-label={lang?.Name}
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
        <ReactCountryFlag
          className="emojiFlag"
          countryCode={selectedLang?.Locale.toUpperCase()}
          style={{
            fontSize: "1em",
            lineHeight: "2em",
          }}
          aria-label={selectedLang?.Name}
        />{" "}
        {selectedLang.Name}
        <Chevron orientation={isOpen ? "toBottom" : "toTop"} color="black" />
      </button>
    </div>
  );
};

export default LanguageSelector;
