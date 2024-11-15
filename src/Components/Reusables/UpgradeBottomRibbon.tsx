import { useContext } from "react";
import { StepContext, StepType } from "../../Contexts/StepContext/StepContext";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

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

  const styles = {
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    width: "full",
    height: "calc(136px / 1.33)",
    padding: "calc(18px / 1.33) calc(30px / 1.33)",
    opacity: "0px",
    borderTop: "1px solid #9D989F",
    boxShadow: "0px 2px 20px 1px #0000001A",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2%",
  };

  const btnStyles = {
    width: "50%",
    height: 'calc(100px / 1.33)',
    padding: "calc(12px / 1.33) calc(28px / 1.33)",
    borderRadius: "calc(50px / 1.33) ",
    border: `1px solid ${theme.activeTextColor}`,
    fontSize: 'calc(28px / 1.33)',
    fontWeight: 500,
  };

  const handleNext = () => {
    nextAction();
    handleStepChange(nextStep);
  };

  return (
    <div style={{ ...styles, position: "fixed" }}>
      <button
        className="fontRaleway"
        style={{...btnStyles, textTransform: 'capitalize', backgroundColor: 'inherit'}}
        onClick={() => {
          handleStepChange(backStep);
        }}
      >
        {backText}
      </button>
      <button
        className="fontRaleway"
        style={{...btnStyles, textTransform: 'capitalize', backgroundColor: theme.activeTextColor}}
        disabled={disableNextBtn}
        onClick={handleNext}
      >
        {nextText}
      </button>
    </div>
  );
};

export default UpgradeBottomRibbon;
