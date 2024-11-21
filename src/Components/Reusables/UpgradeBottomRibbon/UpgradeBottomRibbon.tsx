import { useContext } from "react";
import { StepContext, StepType } from "../../../Contexts/StepContext/StepContext";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import styles from './UpgradeBottomRibbonStyles.module.css'

type UpgradeBottomRibbonPropsType = {
  backText?: string;
  nextText?: string;
  backStep: StepType;
  nextStep: StepType;
  disableNextBtn: boolean;
  nextAction: () => void;
};

const UpgradeBottomRibbon = ({
  backText = "Back",
  nextText = "Next",
  backStep,
  nextStep,
  disableNextBtn,
  nextAction,
}: UpgradeBottomRibbonPropsType) => {
  const { theme } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);

  
  const dynamicBtnStyles = {
    border: `1px solid ${theme.activeTextColor}`
  };

  const handleNext = () => {
    nextAction();
    handleStepChange(nextStep);
  };

  return (
    <div className={styles.upgradeBottomRibbon}>
      <button
        className={`fontSF ${styles.upgradeBtn}`}
        style={dynamicBtnStyles}
        onClick={() => {
          handleStepChange(backStep);
        }}
      >
        {backText}
      </button>
      <button
        className={`fontSF ${styles.upgradeBtn}`}
        style={{...dynamicBtnStyles, backgroundColor: theme.activeTextColor}}
        disabled={disableNextBtn}
        onClick={handleNext}
      >
        {nextText}
      </button>
    </div>
  );
};

export default UpgradeBottomRibbon;