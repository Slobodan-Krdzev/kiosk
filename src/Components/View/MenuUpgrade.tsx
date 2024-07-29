import { useContext } from "react";
import BigerHeading from "../Reusables/BigerHeading";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import UpgradeMenuWrapper from "../Reusables/UpgradeMenuWrapper";

const MenuUpgrade = () => {
  const { handleStepChange } = useContext(StepContext);

  return (
    <section className="fullScreen">
      <RedTopTexture>
        <>
          <p className="message">MENU IS 30% CHEAPER</p>
        </>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading
          text={"Do you want to make it a menu?"}
          width={80}
          fontSize={40}
        />

        <UpgradeMenuWrapper setType="menuUpgrade" topTextNormal="No, only the meal." topTextUpgrade="Yes, make it a menu."/>
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button className="cancelBtn" 
          onClick={() => {
            handleStepChange("order");
          }}>Cancel</button>
          <p>1/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("supersize");
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon>
    </section>
  );
};

export default MenuUpgrade;
