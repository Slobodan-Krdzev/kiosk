import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { UpsaleContext } from "../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option, UpsaleStep } from "../../../../Types/Types";
import UpgradeBottomRibbon from "../../UpgradeBottomRibbon/UpgradeBottomRibbon";
import DualOptionSelector from "./DualOptionSelector/DualOptionSelector";
import styles from "./DualUpsaleOptionStyles.module.css";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { useTranslation } from "react-i18next";

type DualUpsaleOptionPropsType = {
  upsaleStepData: UpsaleStep;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
  upsaleStep: number;
  stepsLength: number;
};

const DualUpsaleOption = ({
  upsaleStepData,
  handleUpsaleStepChange,
  upsaleStep,
  stepsLength,
}: DualUpsaleOptionPropsType) => {

  const { handleStepChange } = useContext(StepContext);
  const { theme } = useContext(DataContext);
  const { upsaleData, resetUpsale } = useContext(UpsaleContext);
  const { singleMeal, placeMealInOrders } = useContext(OrderContext);
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );

  const options = upsaleStepData.Options;

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };
  const isNextButtonDisabled = () => {

    if(upsaleStepData.MinSelection === 0 || upsaleData[upsaleStep].stepData.length > 0){

      return false
    }else {
      return true
    }

  }

  return (
    <motion.section
      key={`dual${upsaleStep}`}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={styles.dualUpsaleView}
    >
      <p className={`${styles.stepCounter} fontSF`}>
        {upsaleStep + 1} / {stepsLength}
      </p>
      {/* top content */}

      <div
        className={styles.topContent}
        style={{ backgroundColor: theme.activeTextColor }}
      >
        <h1 className={` ${styles.topText} fontNoteworthy`}>
          The Menu is <br /> 30% Cheaper
        </h1>
      </div>

      {/* option choose */}

      <div>
        <h2 className={`fontSF ${styles.subtitle}`}>{upsaleStepData.Name}</h2>

        <div className={styles.optionsWrapper}>
          {options.map((o) => (
            <DualOptionSelector
              key={o.Id}
              option={o}
              upsaleStep={upsaleStep}
              options={options}
              currentSelectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
            />
          ))}
        </div>
      </div>
      {/* ribbon */}

      <UpgradeBottomRibbon
        disableNextBtn={isNextButtonDisabled()}
        nextText={t("next_Btn")}
        backText={t('back_Btn')}
        nextAction={() => {

          if(selectedOption?.Finish){

            placeMealInOrders(singleMeal)
            resetUpsale()
            handleStepChange("order");
          }

          handleUpsaleStepChange("increase");

        }}
        backAction={() => {
          handleUpsaleStepChange("decrease");

          if (upsaleStep === 0) {
            handleStepChange("order");
            resetUpsale()

          }
        }}
      />
    </motion.section>
  );
};

export default DualUpsaleOption;
