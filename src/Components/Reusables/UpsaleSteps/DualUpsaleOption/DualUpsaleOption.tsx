import { useState } from "react";
import { UpsaleStep } from "../../../../Types/Types";
import DualOptionSelector from "./DualOptionSelector/DualOptionSelector";
import UpgradeBottomRibbon from "../../UpgradeBottomRibbon/UpgradeBottomRibbon";
import { useContext } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import styles from "./DualUpsaleOptionStyles.module.css";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import { motion } from "framer-motion";

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
  const { setMenuUpgrade, setSupersizeUpgrade, placeMealInOrders, singleMeal } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);
  const { theme } = useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const options = upsaleStepData.Options;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const selectedOptionObject = options.find((o) => o.Name === selectedOption);

  return (
    <motion.section
      key={"dual"}
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
              currentSelectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
            />
          ))}
        </div>
      </div>
      {/* ribbon */}

      <UpgradeBottomRibbon
        disableNextBtn={selectedOption === undefined}
        nextAction={() => {
          handleUpsaleStepChange("increase");

          // OVDE UPGRADE NA upgradeMEAL
          if (selectedOptionObject && upsaleStepData.DisplayOrder === 0) {
            if (selectedOptionObject.Finish) {

              // place in orders
              placeMealInOrders(singleMeal)
              handleStepChange("order");
              
            } else {
              setMenuUpgrade(selectedOptionObject);
            }
            setSelectedOption(undefined);

          }

          if (selectedOptionObject && upsaleStepData.DisplayOrder === 1) {
            // OVDE SUPERSIZE
            setSupersizeUpgrade(selectedOptionObject);
            setSelectedOption(undefined);
          }
        }}
        backAction={() => {
          handleUpsaleStepChange("decrease");
          
          // handleStepChange("order");
        }}
      />
    </motion.section>
  );
};

export default DualUpsaleOption;
