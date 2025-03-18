import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { UpsaleContext } from "../../../../Contexts/UpsaleContext/UpsaleContext";
import { UpsaleColletion, UpsaleStep } from "../../../../Types/Types";
import BottomButtonholderRibbon from "../../BottomButtonHolderWibbon/BottomButtonholderRibbon";
import DefaultButton from "../../DefaultButton/DefaultButton";
import Chevron from "../../SVG/Chevron";
import UpsaleTopFixed from "../../UpsaleTopFixed/UpsaleTopFixed";
import ViewFullScreenAnimated from "../../ViewFullScreenAnimated/ViewFullScreenAnimated";
import MultiOptionselector from "./MultiOptionSelector/MultiOptionselector";
import styles from "./MultiUpsaleOptionStyles.module.css";

type MultiUpsaleOptionPropsType = {
  upsaleStepData: UpsaleStep;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
  upsaleStep: number;
  stepsLength: number;
    upsaleInfoData: UpsaleColletion
  
};

const MultiUpsaleOption = ({
  upsaleStepData,
  handleUpsaleStepChange,
  upsaleStep,
  stepsLength,
  upsaleInfoData
}: MultiUpsaleOptionPropsType) => {
  const { handleStepChange } = useContext(StepContext);
  const { placeMealInOrders, singleMeal, setUpsale, copyOfEditingItem } = useContext(OrderContext);
  const { upsaleData, resetUpsale, isEditMode, toggleEditMode } = useContext(UpsaleContext);
  const { t } = useTranslation();
  const topImage = upsaleInfoData.UpsaleSteps[0].PictureUrl

  const options = upsaleStepData.Options;
  const maxSelection = upsaleInfoData.UpsaleSteps[upsaleStep].MaxSelection;
  const upsaleSteps = upsaleInfoData.UpsaleSteps;
  const isLastStep = upsaleSteps.length === upsaleStep + 1;

  const isNextButtonDisabled = () => {
    if (
      upsaleStepData.MinSelection === 0 ||
      upsaleData[upsaleStep].stepData.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onNextBtnClick = () => {
    if (isLastStep) {
      // OVDE UPDATE NA SIGNLE MEAL
      setUpsale(upsaleData);
      placeMealInOrders({
        ...singleMeal,
        id: new Date().valueOf(),
        upsale: upsaleData,
        itemGUI: undefined,
      });

      handleStepChange("order");
      resetUpsale();
    }

    handleUpsaleStepChange("increase");
  };

  const onBackButton = () => {


    // ako e prv step 
    // - resetUpsale
    // - orderScreen

    if (upsaleStep === 0) {
      handleStepChange("order");
      resetUpsale();

      if(isEditMode) {

        if(copyOfEditingItem)
        placeMealInOrders(copyOfEditingItem)
        toggleEditMode(false)}
    }

    handleUpsaleStepChange("decrease");
  }


  return (
    <ViewFullScreenAnimated
      backgroundColor="#ECECEC"
      framerKey={`multi${upsaleStep}`}
    >
      {/* top content */}

      <UpsaleTopFixed
        version={1}
        image={singleMeal.product?.ProductDetails?.ProductPictureUrl ?? topImage}
        productName={singleMeal.product!.Name ?? ""}
      />

      {/* option choose */}

      <div className={styles.midSection}>
        <h2 className={styles.subtitle}>
          {t("upsale.chooseYour")} {upsaleStepData.Name}
        </h2>

        <p className={styles.maxSelectionInfo}>
          {maxSelection > 1 ? `${t("upsale.multipleChoice")}` : `${t("upsale.onlyOne")}`}
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
          {t("back")}
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
          dissabled={isNextButtonDisabled()}
          clickHandler={onNextBtnClick}
          style={{
            backgroundColor: isNextButtonDisabled() ? "#2d2d2d33" : "black",
            border: `1px solid ${isNextButtonDisabled() ? "#8a8a8a" : "black"}`,
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
          {isNextButtonDisabled() === false ? <>{t("order.toOrder")}</> : <>{t("upsale.choose")}</>}
          {isNextButtonDisabled() && <Chevron color="white" />}
        </DefaultButton>
      </BottomButtonholderRibbon>
    </ViewFullScreenAnimated>
  );
};

export default MultiUpsaleOption;
