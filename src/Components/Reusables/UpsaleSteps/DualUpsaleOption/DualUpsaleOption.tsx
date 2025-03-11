import { AnimatePresence } from "framer-motion";
import { t } from "i18next";
import { useContext } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { UpsaleContext } from "../../../../Contexts/UpsaleContext/UpsaleContext";
import { UpsaleColletion, UpsaleStep } from "../../../../Types/Types";
import BottomButtonholderRibbon from "../../BottomButtonHolderWibbon/BottomButtonholderRibbon";
import DefaultButton from "../../DefaultButton/DefaultButton";
import Chevron from "../../SVG/Chevron";
import UpsaleTopFixed from "../../UpsaleTopFixed/UpsaleTopFixed";
import ViewFullScreenAnimated from "../../ViewFullScreenAnimated/ViewFullScreenAnimated";
import DualOptionSelector from "./DualOptionSelector/DualOptionSelector";
import styles from "./DualUpsaleOptionStyles.module.css";
import MultiOptionselector from "../MultiUpsaleOption/MultiOptionSelector/MultiOptionselector";

type DualUpsaleOptionPropsType = {
  upsaleStepData: UpsaleStep;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
  upsaleStep: number;
  stepsLength: number;
  upsaleInfoData: UpsaleColletion;
};

const DualUpsaleOption = ({
  upsaleStepData,
  handleUpsaleStepChange,
  upsaleStep,
  stepsLength,
  upsaleInfoData,
}: DualUpsaleOptionPropsType) => {
  const { handleStepChange } = useContext(StepContext);
  const { resetUpsale, upsaleData, isEditMode, toggleEditMode } =
    useContext(UpsaleContext);
  const { singleMeal, placeMealInOrders, setUpsale, copyOfEditingItem } =
    useContext(OrderContext);
  // const { data } = useContext(DataContext);

  const topImage = upsaleInfoData.UpsaleSteps[upsaleStep].PictureUrl;
  const currentStep = upsaleInfoData.UpsaleSteps[upsaleStep];
  const upsaleSteps = upsaleInfoData.UpsaleSteps;
  const options = upsaleStepData.Options;
  const isLastStep = upsaleSteps.length === upsaleStep + 1;
  const isNextButtonDissabled = !(
    upsaleData[upsaleStep].stepData.length >= upsaleStepData.MinSelection
  );
  const maxSelectionOnStep = currentStep.MaxSelection;

  const selectedOptions = upsaleData[upsaleStep].stepData;

  console.log("Selected Options", selectedOptions);

  const onXButtonClick = () => {
    if (isEditMode) {
      if (copyOfEditingItem) {
        placeMealInOrders(copyOfEditingItem);
        resetUpsale();
        toggleEditMode(false);
      }
    }
    handleStepChange("order");
    resetUpsale();
  };

  const onNextButton = () => {
    const someOptionHasFinnish = selectedOptions.some(
      (o) => o.option.Finish === true
    );

    if (isLastStep) {
      setUpsale(upsaleData);
      placeMealInOrders({
        ...singleMeal,
        id: new Date().valueOf(),
        upsale: upsaleData,
        itemGUI: undefined,
      });

      toggleEditMode(false);
      handleStepChange("order");
      resetUpsale();
    } else if (!isLastStep && someOptionHasFinnish) {
      setUpsale(upsaleData);
      placeMealInOrders({
        ...singleMeal,
        id: new Date().valueOf(),
        upsale: upsaleData,
        itemGUI: undefined,
      });

      toggleEditMode(false);
      handleStepChange("order");
      resetUpsale();
    } else {
      handleUpsaleStepChange("increase");
    }
  };

  const onBackButton = () => {
    // ako e prv step
    // - resetUpsale
    // - orderScreen

    if (upsaleStep === 0) {
      handleStepChange("order");
      resetUpsale();

      if (isEditMode) {
        if (copyOfEditingItem) placeMealInOrders(copyOfEditingItem);
        toggleEditMode(false);
      }
    }

    handleUpsaleStepChange("decrease");
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
        image={
          singleMeal.product?.ProductDetails?.ProductPictureUrl ?? topImage
        }
        productName={singleMeal.product!.Name!}
        xButtonClickHandler={onXButtonClick}
      />

      {/* option choose */}

      <div>
        <h2 className={styles.subtitle}>{upsaleStepData.Name}</h2>
        <p className={styles.mealName}>
          {maxSelectionOnStep > 1 ? (
            <>{t("multiple_choice")}</>
          ) : (
            <>{t("only_one")}</>
          )}
        </p>

        <AnimatePresence mode="wait">
          <div className={styles.optionsWrapper}>
            {options.map((o) =>
              o.MaxSelection > 1 ? (
                <MultiOptionselector
                  option={o}
                  maxSelection={maxSelectionOnStep}
                  upsaleStep={upsaleStep}
                />
              ) : (
                <DualOptionSelector
                  key={o.Id}
                  option={o}
                  upsaleStep={upsaleStep}
                  options={options}
                  handleUpsaleStepChange={handleUpsaleStepChange}
                  upsaleStepData={upsaleInfoData.UpsaleSteps[upsaleStep]}
                />
              )
            )}
          </div>
        </AnimatePresence>
      </div>
      {/* ribbon */}

      <BottomButtonholderRibbon>
        <DefaultButton
          clickHandler={onBackButton}
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
          {t("back_Btn")}
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
          {t("view_order")} <Chevron color="white" />
        </DefaultButton>
      </BottomButtonholderRibbon>
    </ViewFullScreenAnimated>
  );
};

export default DualUpsaleOption;
