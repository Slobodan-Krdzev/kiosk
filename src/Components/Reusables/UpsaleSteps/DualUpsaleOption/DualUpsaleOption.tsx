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
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";

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
  const { resetUpsale, upsaleData } = useContext(UpsaleContext);
  const { singleMeal, placeMealInOrders, setUpsale } = useContext(OrderContext);
  const { data } = useContext(DataContext);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const topImage = data.TMKData[0].UpsaleColletions[0].UpsaleSteps[0].PictureUrl

  const upsaleSteps = data.TMKData[0].UpsaleColletions[0].UpsaleSteps;
  const options = upsaleStepData.Options;
  const isLastStep = upsaleSteps.length === upsaleStep + 1;
  const isNextButtonDissabled = !(
    upsaleData[upsaleStep].stepData.length >= upsaleStepData.MinSelection
  );

  const handleOptionSelect = (option: Option) => {
    setSelectedOption([...selectedOption, option]);
  };

  console.log(upsaleStep)

  const onXButtonClick = () => {
    if (upsaleStep === 0) {
      handleStepChange("order");
      resetUpsale();
    }

    handleUpsaleStepChange("decrease");
  };

  

  const onNextButton = () => {
    const someOptionHasFinnish = selectedOption.some((o) => o.Finish === true);

    if (isLastStep || someOptionHasFinnish) {
      setUpsale(upsaleData);
      placeMealInOrders({
        ...singleMeal,
        id: new Date().valueOf(),
        upsale: upsaleData,
        itemGUI: undefined,
      });

      handleStepChange("order");
      resetUpsale();
    } else {
      handleUpsaleStepChange("increase");
    }
  };

  return (
    <ViewFullScreenAnimated
      backgroundColor="#EDEDED"
      framerKey={`dual${upsaleStep}`}
      // className={styles.dualUpsaleView}
    >
      {/* top content */}

      <UpsaleTopFixed
        version={upsaleStep === 0 ? 0 : 1}
        image={singleMeal.product?.ProductDetails?.ProductPictureUrl ?? topImage}
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

      <BottomButtonholderRibbon>
        <DefaultButton
          clickHandler={onXButtonClick}
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

        <DefaultButton
          clickHandler={onNextButton}
          dissabled={isNextButtonDissabled}
          style={{
            backgroundColor: isNextButtonDissabled ? "#2d2d2d33" : "black",
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
    </ViewFullScreenAnimated>
  );
};

export default DualUpsaleOption;
