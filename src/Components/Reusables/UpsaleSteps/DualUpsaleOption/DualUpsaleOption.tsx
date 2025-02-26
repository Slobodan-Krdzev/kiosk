
import { useContext, useState } from "react";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { UpsaleContext } from "../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option, UpsaleStep } from "../../../../Types/Types";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import DualOptionSelector from "./DualOptionSelector/DualOptionSelector";
import styles from "./DualUpsaleOptionStyles.module.css";
import { AnimatePresence } from "framer-motion";
import { t } from "i18next";
import BottomButtonholderRibbon from "../../BottomButtonHolderWibbon/BottomButtonholderRibbon";
import DefaultButton from "../../DefaultButton/DefaultButton";
import Chevron from "../../SVG/Chevron";
import UpsaleTopFixed from "../../UpsaleTopFixed/UpsaleTopFixed";
import ViewFullScreenAnimated from "../../ViewFullScreenAnimated/ViewFullScreenAnimated";

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
  const { resetUpsale } = useContext(UpsaleContext);
  const { singleMeal } = useContext(OrderContext);

  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );

  const options = upsaleStepData.Options;

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const onXButtonClick = () => {

    if (upsaleStep === 0) {
      handleStepChange("order");
      resetUpsale();
    }

    handleUpsaleStepChange("decrease");

  };

  return (
    <ViewFullScreenAnimated
      backgroundColor="#EDEDED"
      framerKey={`dual${upsaleStep}`}
      // className={styles.dualUpsaleView}
    >
      {upsaleStep < 1 && (
        <p className={styles.stepCounter}>
          {upsaleStep + 1} / {stepsLength}
        </p>
      )}

      {/* top content */}

      <UpsaleTopFixed
        version={upsaleStep === 0 ? 0 : 1}
        image={singleMeal.image!}
        productName={singleMeal.product!.Name!}
        xButtonClickHandler={onXButtonClick}
      />
     
      {/* option choose */}

      <div>
        <h2 className={styles.subtitle}>{upsaleStepData.Name}</h2>
        <p className={styles.mealName}>
          {upsaleStep > 1 ? singleMeal?.product?.Name : <>{t("only_one")}</>}
        </p>

        <AnimatePresence mode="wait">
          <div className={styles.optionsWrapper}>
            {options.map((o) => (
              <DualOptionSelector
                key={o.Id}
                option={o}
                upsaleStep={upsaleStep}
                options={options}
                currentSelectedOption={selectedOption}
                handleOptionSelect={handleOptionSelect}
                handleUpsaleStepChange={handleUpsaleStepChange}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
      {/* ribbon */}

      {upsaleStep > 0 && (
        <BottomButtonholderRibbon>
          <DefaultButton
            clickHandler={() => handleUpsaleStepChange("decrease")}
            style={{
              backgroundColor: "inherit",
              height: "100%",
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5vh",
              textTransform: "uppercase",
            }}
          >
            <Chevron color="black" orientation="toLeft" />
            Bestellen
          </DefaultButton>

          {upsaleStep > 0 && (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <p className={styles.stepCounterOnRibbon}>
                {upsaleStep + 1} / {stepsLength}
              </p>
            </div>
          )}

          <DefaultButton
            clickHandler={() => handleUpsaleStepChange("increase")}
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "30%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5vh",
              textTransform: "uppercase",
            }}
          >
            Bestellen <Chevron color="white" />
          </DefaultButton>
        </BottomButtonholderRibbon>
      )}
    </ViewFullScreenAnimated>
  );
};

export default DualUpsaleOption;
