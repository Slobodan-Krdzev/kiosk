import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import Logo from "../../Reusables/Logo";
import DineIn from "../../Reusables/SVG/DineIn";
import Takeaway from "../../Reusables/SVG/Takeaway";
import styles from "./ChooseLangStyles.module.css";
import { useTranslation } from "react-i18next";
import LanguageChooser from "../../Reusables/LanguageChooser/LanguageChooser";
import { LanguagesList } from "../../../Types/Types";

const languages: LanguagesList[] = [
  {
    HouseRules: {
      Url: "http://my.tabletmenukaart.nl/sharedfiles/images/client//dfcf2bb7-b750-4458-b88b-d7d4e49b3979.jpg",
      Name: "HouseRulez"
    },
    Locale: 'nl',
    Name: 'Netherlands'
  },
  {
    HouseRules: {
      Url: "http://my.tabletmenukaart.nl/sharedfiles/images/client//dfcf2bb7-b750-4458-b88b-d7d4e49b3979.jpg",
      Name: "HouseRulez"
    },
    Locale: 'de',
    Name: 'German'
  },{
    HouseRules: {
      Url: "http://my.tabletmenukaart.nl/sharedfiles/images/client//dfcf2bb7-b750-4458-b88b-d7d4e49b3979.jpg",
      Name: "HouseRulez"
    },
    Locale: 'gb',
    Name: 'English'
  },
];

const ChooseLang = () => {
  const { handleStepChange, handleSetTakeawayOption } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  const [option, setOption] = useState<"Take Away" | "Dine In" | undefined>(
    undefined
  );

  const { t } = useTranslation();

  // od languages list ke listame jazici
  // const languagesList = data.ThemeResponse.LanguagesList;

  return (
    <motion.section
      key={"lang"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fullScreenTablet"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className={styles.logoWrapper}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={80} />
      </div>
      <div style={{ width: "95%", margin: "0.6rem auto" }}>
        <p className={`${styles.restName} fontSF`}>
          {t('welcome_to')} <br /> {data.ThemeResponse.RestaurantName}!
        </p>
      </div>

      <div className={styles.langViewMenuOptionsWrapper}>
        <motion.button
          animate={{
            scale: option == "Take Away" ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className={`fontSF ${styles.langMenuBtn}`}
          style={{
            backgroundColor:
              option === "Take Away"
                ? `${theme.activeTextColor}40`
                : option === "Dine In"
                ? "#F1F1F1"
                : "",
            border:
              option === "Take Away"
                ? `1px solid ${theme.activeTextColor}`
                : "",
          }}
          onClick={() => {
            handleSetTakeawayOption("Takeaway");

            if (option === "Take Away") {
              handleStepChange("order");
            } else {
              setOption("Take Away");
            }
          }}
        >
          <Takeaway color={theme.activeTextColor} />

          <p className={`fontSF ${styles.menuOptionsText}`}>{t("takeaway")}</p>
        </motion.button>

        {/* DINE IN OPCIJA   */}
        <motion.button
          animate={{
            scale: option == "Dine In" ? 1.1 : 1,
          }}
          transition={{
            type: "tween",
            stiffness: 200,
            damping: 10,
          }}
          className={`fontSF ${styles.langMenuBtn}`}
          style={{
            backgroundColor:
              option === "Dine In"
                ? `${theme.activeTextColor}40`
                : option === "Take Away"
                ? "#F1F1F1"
                : "",
            border:
              option === "Dine In" ? `1px solid ${theme.activeTextColor}` : "",
          }}
          onClick={() => {
            setOption("Dine In");
            handleSetTakeawayOption("Dine In");
          }}
        >
          <DineIn color={theme.activeTextColor} />

          <p className={`fontSF ${styles.menuOptionsText}`}>{t('dine_in')}</p>
        </motion.button>
      </div>

      <div className={styles.langSelectWrapper}>
        {/* languages list map trebva da ni e originalot */}
        {languages.map((lang) => (
          <LanguageChooser key={lang.Name} locale={lang} />
        ))}
      </div>

      <BottomGreenRibbon>
        <button
          disabled={option === undefined}
          className="fontSF bottomRibbonButton"
          style={{
            backgroundColor:
              option === undefined
                ? `${theme.activeTextColor}40`
                : theme.activeTextColor,
            color: option === undefined ? `#20202085` : "#202020",
          }}
          onClick={() => {
            handleStepChange("order");
          }}
        >
          {t("continue")}
        </button>
      </BottomGreenRibbon>
    </motion.section>
  );
};

export default ChooseLang;
