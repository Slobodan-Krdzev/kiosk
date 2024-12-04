import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { UpsaleContext } from "../../../../Contexts/UpsaleContext/UpsaleContext";
import { UpsaleStep } from "../../../../Types/Types";
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

  const { handleStepChange } = useContext(StepContext);
  const { theme } = useContext(DataContext);
  const { upsaleData, resetUpsale } = useContext(UpsaleContext);
  const { singleMeal, placeMealInOrders } = useContext(OrderContext);

  const [isFinished, setIsFinished] =useState(false)

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const options = upsaleStepData.Options;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  console.log('Upsale Data', Boolean(upsaleData[upsaleStep].stepData.length))

  const isNextButtonDisabled = !upsaleData[upsaleStep].stepData.length

  const handleFinish = () => {

    setIsFinished(true)
  }

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
              handleFinish={handleFinish}
            />
          ))}
        </div>
      </div>
      {/* ribbon */}

      <UpgradeBottomRibbon
        disableNextBtn={isNextButtonDisabled}
        nextAction={() => {

          if(isFinished){

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
          }
        }}
      />
    </motion.section>
  );
};

export default DualUpsaleOption;
