import { useContext } from "react";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import BigerHeading from "../Reusables/BigerHeading";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import UpgradeMenuWrapper from "../Reusables/UpgradeMenuWrapper";

const SupersizeUpgrade = () => {

  const {handleStepChange} = useContext(StepContext)

  return (
    <section className="fullScreen">
      <RedTopTexture>
        <>
          <p className="message">MENU IS 30% CHEAPER</p>
        </>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading
          text={"Do you want to supersize your menu?"}
          fontSize={40}
        />

        <UpgradeMenuWrapper setType="supersize" topTextNormal="Keep it medium" topTextUpgrade="Upgrade to large"/>
        
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button className="cancelBtn" onClick={() => {
              handleStepChange("menuUpgrade");
            }}
            >Cancel</button>
          <p>2/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("extras");
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon>
    </section>
  );
};

export default SupersizeUpgrade;
