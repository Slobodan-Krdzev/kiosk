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


const ChooseLang = () => {
  const { handleStepChange, handleSetTakeawayOption } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  const [option, setOption] = useState<"Take Away" | "Dine In" | undefined>(
    undefined
  );

  const { t } = useTranslation();
  const languagesList = data.ThemeResponse.LanguagesList;

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
        <Logo source={data?.ThemeResponse?.LogoImage?.Url} width={80} />
      </div>
      <div className={styles?.restNameWrapper}>
        <p className={`${styles.restName} fontSF`}>
          {t('welcome_to')} <br /> {data?.ThemeResponse?.RestaurantName ?? "Restaurant Name"}!
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

          <p className={`fontSF ${styles.menuOptionsText}`}>{t('dine_in').substring(0, 15)}</p>

        </motion.button>
      </div>

      <div className={styles.langSelectWrapper}>

        {languagesList.map((lang: LanguagesList) => (
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
            color: option === undefined ? `#20202085` : theme.textColor,
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
