import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
// import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Option, UpsaleStep } from "../../../../Types/Types";
import UpgradeBottomRibbon from "../../UpgradeBottomRibbon/UpgradeBottomRibbon";
import DualOptionSelector from "./DualOptionSelector/DualOptionSelector";
import styles from "./DualUpsaleOptionStyles.module.css";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";

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
  // const { handleStepChange } = useContext(StepContext);
  const { singleMeal} = useContext(OrderContext);

  const { theme } = useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const options = upsaleStepData.Options;

  const handleOptionSelect = (option: Option) => {
    setSelectedOption([option]);
  };

  // const selectedOptionObject = options.find((o) => o.Name === selectedOption);

  console.log("SINGLE MEAL DUAL OPTION",singleMeal)

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
        disableNextBtn={selectedOption === undefined}
        nextAction={() => {
          handleUpsaleStepChange("increase");

          // if (selectedOptionObject && upsaleStepData.DisplayOrder === 0) {
          //   if (selectedOptionObject.Finish) {

          //     placeMealInOrders(singleMeal)
          //     handleStepChange("order");
              
          //   } else {
          //     setMenuUpgrade(selectedOptionObject);
          //   }

          // }

          // if (selectedOptionObject && upsaleStepData.DisplayOrder === 1) {
            
          //   setSupersizeUpgrade(selectedOptionObject);
            
          // }
        }}
        backAction={() => {
          handleUpsaleStepChange("decrease");
          
          
        }}
      />
    </motion.section>
  );
};

export default DualUpsaleOption;
