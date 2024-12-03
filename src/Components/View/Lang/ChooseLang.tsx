import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import Logo from "../../Reusables/Logo";
import DineIn from "../../Reusables/SVG/DineIn";
import Takeaway from "../../Reusables/SVG/Takeaway";
import styles from "./ChooseLangStyles.module.css";

const ChooseLang = () => {
  const { handleStepChange, handleSetTakeawayOption } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  const [option, setOption] = useState<"Take Away" | "Dine In" | undefined>(
    undefined
  );

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
          Welkome to <br /> {data.ThemeResponse.RestaurantName}!
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
            handleSetTakeawayOption("Takeaway")

            if (option === "Take Away") {
              handleStepChange("order");
            } else {
              setOption("Take Away");
            }
          }}
        >
          <Takeaway color={theme.activeTextColor} />

          <p className={`fontSF ${styles.menuOptionsText}`}>Take Away</p>
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
            handleSetTakeawayOption("Dine In")
          }}
        >
          <DineIn color={theme.activeTextColor} />

          <p className={`fontSF ${styles.menuOptionsText}`}>Dine In</p>
        </motion.button>
      </div>

      <div className={styles.langSelectWrapper}>
        <img src="/netherlands.png" alt="Dutch" width={43.6} height={43.6} />
        <img
          src="/English.png"
          alt="Dutch"
          width={43.6}
          height={43.6}
          style={{ margin: "0 10px" }}
        />
        <img src="/German.png" alt="Dutch" width={43.6} height={43.6} />
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
          Place Order
        </button>
      </BottomGreenRibbon>
    </motion.section>
  );
};

export default ChooseLang;
