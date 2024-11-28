import { useContext, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Option, UpsaleStep } from "../../../../Types/Types";
import UpgradeBottomRibbon from "../../UpgradeBottomRibbon/UpgradeBottomRibbon";
import MultiOptionselector from "./MultiOptionSelector/MultiOptionselector";
import styles from "./MultiUpsaleOptionStyles.module.css";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import { motion } from "framer-motion";

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

  const { setExtras, setSides, setDrinks, placeMealInOrders, singleMeal } =
    useContext(OrderContext);

  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const options = upsaleStepData.Options;
  const maxSelection = upsaleStepData.MaxSelection;

  const handleOptionSelect = (option: Option) => {
    setSelectedOption([...selectedOption, option]);
  };

  const handleRemoveOption = (option: Option) => {
    setSelectedOption(selectedOption.filter((o) => o.Id !== option.Id));
  };

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
              currentSelectedOptions={selectedOption}
              handleOptionSelect={handleOptionSelect}
              handleRemoveOption={handleRemoveOption}
              disableBtns={maxSelection === selectedOption.length}
              upsaleStep={upsaleStep}
            />
          ))}
        </div>
      </div>
      {/* ribbon */}

      <UpgradeBottomRibbon
        disableNextBtn={!selectedOption.length}
        nextAction={() => {
          if (selectedOption.length && upsaleStepData.DisplayOrder === 2) {
            setExtras(selectedOption);
            setSelectedOption([]);
          } else if (
            selectedOption.length &&
            upsaleStepData.DisplayOrder === 3
          ) {
            setSides(selectedOption);
            setSelectedOption([]);
          } else if (
            selectedOption.length &&
            upsaleStepData.DisplayOrder === 4
          ) {
            setDrinks(selectedOption);
            placeMealInOrders({ ...singleMeal, drinks: selectedOption });
            setSelectedOption([]);

            handleStepChange("order");
          }

          handleUpsaleStepChange("increase");
        }}
        backAction={() => {
          handleUpsaleStepChange("decrease");
          handleStepChange("order");
        }}
      />
    </motion.section>
  );
};

export default MultiUpsaleOption;
