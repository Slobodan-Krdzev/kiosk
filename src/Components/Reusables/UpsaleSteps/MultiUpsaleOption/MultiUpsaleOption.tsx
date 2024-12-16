import { motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { UpsaleContext } from "../../../../Contexts/UpsaleContext/UpsaleContext";
import { UpsaleStep } from "../../../../Types/Types";
import UpgradeBottomRibbon from "../../UpgradeBottomRibbon/UpgradeBottomRibbon";
import MultiOptionselector from "./MultiOptionSelector/MultiOptionselector";
import styles from "./MultiUpsaleOptionStyles.module.css";
import { useTranslation } from "react-i18next";

type MultiUpsaleOptionPropsType = {
  upsaleStepData: UpsaleStep;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
  upsaleStep: number;
  stepsLength: number;
};

const MultiUpsaleOption = ({
  upsaleStepData,
  handleUpsaleStepChange,
  upsaleStep,
  stepsLength,
}: MultiUpsaleOptionPropsType) => {
  const { handleStepChange } = useContext(StepContext);
  const { theme } = useContext(DataContext);
  const {  placeMealInOrders, singleMeal, setUpsale,  } = useContext(OrderContext);
  const { t } = useTranslation();

  const { upsaleData, resetUpsale } = useContext(UpsaleContext);

  const options = upsaleStepData.Options;
  const maxSelection = 2;
  const isNextButtonDisabled = () => {

    if(upsaleStepData.MinSelection === 0 || upsaleData[upsaleStep].stepData.length > 0){

      return false
    }else {
      return true
    }

  }

  return (
    <motion.section
      key={`multi${upsaleStep}`}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={styles.multiView}
    >
      {/* top content */}

      <p className={`${styles.stepCounter} fontSF`}>
        {upsaleStep + 1} / {stepsLength}
      </p>
      {/* top content */}

      <div
        className={styles.topContent}
        style={{ backgroundColor: theme.activeTextColor }}
      >
        <img
          src={singleMeal.product?.SmallPictureUrl}
          alt={singleMeal.product?.Name}
        />
        <h1 className={` ${styles.topText} fontNoteworthy`}>
          {singleMeal.product?.Name}
        </h1>
      </div>

      {/* option choose */}

      <div className={styles.midSection}>
        <h2 className={`fontSF ${styles.subtitle}`}>
          {t("choose_your")} {upsaleStepData.Name}
        </h2>

        <p className={`${styles.maxSelectionInfo} fontSF `}>
          {maxSelection > 1 ? `${t("multiple_choice")}` : `${t("only_one")}`}
        </p>
        <div className={`hideScrollBar ${styles.optionsWrapper}`}>
          {options.map((o) => (
            <MultiOptionselector
              key={o.Id}
              option={o}
              upsaleStep={upsaleStep}
              maxSelection={maxSelection}
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

          if(upsaleStepData.DisplayOrder === stepsLength - 1){
            console.log('ova e finalna upsale data', upsaleData)

            // OVDE UPDATE NA SIGNLE MEAL
            setUpsale(upsaleData) 
            placeMealInOrders({ ...singleMeal,id: new Date().valueOf(), upsale: upsaleData });

            handleStepChange("order");
            resetUpsale()
          }

          handleUpsaleStepChange("increase");
        }}
        backAction={() => {
          handleUpsaleStepChange("decrease");
        }}
      />
    </motion.section>
  );
};

export default MultiUpsaleOption;
