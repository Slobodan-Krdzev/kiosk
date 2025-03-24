import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { UpsaleContext } from "../../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option, UpsaleStep } from "../../../../../Types/Types";
import PricePreviewer from "../../../PricePreviewer/PricePreviewer";
import Check from "../../../SVG/Check";
import styles from "./DualOptionSelectorStyles.module.css";

type DualOptionSelectorPropsType = {
  option: Option;
  options: Option[];
  upsaleStep: number;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
  upsaleStepData: UpsaleStep;
};

const DualOptionSelector = ({
  option,
  upsaleStep,
  upsaleStepData,
}: DualOptionSelectorPropsType) => {
  const { theme } = useContext(DataContext);

  const { upsaleData, addNewOption, removeAnOption } =
    useContext(UpsaleContext);

  const upsaleDataSelectedOptions = upsaleData[upsaleStep].stepData;
  const isOptionSelected = Boolean(
    upsaleDataSelectedOptions.find((o) => o.option.Id === option.Id)
  );

  const maxSelection = upsaleStepData.MaxSelection;

  console.log("Upsale Data od Selector", option);

  return (
    <motion.div
      initial={{ backgroundColor: "white" }}
      animate={{
        backgroundColor: isOptionSelected
          ? `${theme.activeTextColor}50`
          : "white",
      }}
      transition={{
        duration: 2.5,
        delay: 0.1,
        ease: "easeInOut",
      }}
      exit={{ backgroundColor: "" }}
      className={styles.option}
      role="button"
      onClick={() => {
        if (isOptionSelected) {
          removeAnOption(upsaleStep, option);
        } else {
          addNewOption(upsaleStep, option, maxSelection, 1);
        }
      }}
    >
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${option.PictureUrl})`,
        }}
      ></div>

      <div
        className={styles.optionBotomTextWrapper}
        style={{
          alignItems: upsaleStep > 0 ? "" : "center",
          paddingLeft: "3vw",
          paddingRight: "3vw",
        }}
      >
        <p
          className={styles.optionTopText}
          style={{
            width: upsaleStep > 0 ? "90%" : "",
            textAlign: upsaleStep > 0 ? "left" : "center",
          }}
        >
          {option.Name}
        </p>
        {/* {upsaleStep === 0 && (
          <p
            className={styles.optionBottomText}
            style={{
              width: upsaleStep > 0 ? "40%" : "",
              textAlign: upsaleStep > 0 ? "left" : "center",
            }}
          >
            {option.Price === 0 ? (
              <>{t("only_the_dish")}</>
            ) : (
              <>{t("make_it_a_combo")}</>
            )}
          </p>
        )} */}

        <AnimatePresence mode="wait">
          {option.MaxSelection === 1 && (
            <div className={styles.checkMark}>
              {isOptionSelected && <Check />}
            </div>
          )}
        </AnimatePresence>
        <PricePreviewer
          price={option?.Price}
          color={theme.activeTextColor}
          style={{ position: "relative" }}
          fontSizeRound={"2.8vw"}
          fontSizeDecimal={"1.2vw"}
        />
      </div>
    </motion.div>
  );
};

export default DualOptionSelector;
