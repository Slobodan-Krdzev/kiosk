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

  const { upsaleData, resetUpsale } = useContext(UpsaleContext);

  const options = upsaleStepData.Options;
  const maxSelection = upsaleStepData.MaxSelection;
  const isNextButtonDisabled = !upsaleData[upsaleStep].stepData.length;

  return (
    <motion.section
      key={"multi"}
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

      <div>
        <h2 className={`fontSF ${styles.subtitle}`}>
          Choose your {upsaleStepData.Name}
        </h2>

        <p className={`${styles.maxSelectionInfo} fontSF hideScrollBar`}>
          *You can choose only one
        </p>
        <div className={styles.optionsWrapper}>
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
        disableNextBtn={isNextButtonDisabled}
        nextAction={() => {

          if(upsaleStepData.DisplayOrder === stepsLength - 1){
            console.log('ova e finalna upsale data', upsaleData)

            // OVDE UPDATE NA SIGNLE MEAL
            setUpsale(upsaleData) 
            placeMealInOrders({ ...singleMeal, upsale: upsaleData });

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
