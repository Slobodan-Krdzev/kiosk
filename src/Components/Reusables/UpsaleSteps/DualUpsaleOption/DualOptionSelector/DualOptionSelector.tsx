import { AnimatePresence, motion } from "framer-motion";
import { t } from "i18next";
import { useContext } from "react";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../../../Contexts/OrderContext/OrderContext";
import { UpsaleContext } from "../../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option } from "../../../../../Types/Types";
import PricePreviewer from "../../../PricePreviewer/PricePreviewer";
import Check from "../../../SVG/Check";
import styles from "./DualOptionSelectorStyles.module.css";

type DualOptionSelectorPropsType = {
  option: Option;
  currentSelectedOption: Option[];
  options: Option[];
  upsaleStep: number;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
};

const DualOptionSelector = ({
  option,
  upsaleStep,
}: DualOptionSelectorPropsType) => {
  const { singleMeal } = useContext(OrderContext);
  const { theme, data } = useContext(DataContext);

  const { upsaleData, addNewOption, removeAnOption } = useContext(UpsaleContext);

  const upsaleDataSelectedOptions = upsaleData[upsaleStep].stepData;
  const isOptionSelected = Boolean(
    upsaleDataSelectedOptions.find((o) => o.option.Id === option.Id)
  );

  const maxSelection =
    data.TMKData[0].UpsaleColletions[0].UpsaleSteps[upsaleStep].MaxSelection;

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
          removeAnOption(upsaleStep, option)

        } else {
          addNewOption(upsaleStep, option, maxSelection, 1);
          // handleOptionSelect(option);
        }

        // if (upsaleStep > 0) {
        //   handleOptionSelect(option);
        //   addNewOption(upsaleStep, option, 1, 1);
        // } else {
        //   if (option.Finish) {
        //     resetUpsale();
        //     placeMealInOrders(singleMeal);
        //     handleStepChange("order");
        //   }

        //   handleUpsaleStepChange("increase");
        //   handleOptionSelect(option);
        //   addNewOption(upsaleStep, option, 1, 1);
        // }
      }}
    >
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${singleMeal.product?.SmallPictureUrl})`,
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
        {upsaleStep === 0 && (
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
        )}

        <AnimatePresence mode="wait">
          {upsaleStep > 0 && (
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
