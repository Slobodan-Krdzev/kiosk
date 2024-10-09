import { useContext, useState } from "react";
import { DataContext } from "../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { Option } from "../../Types/Types";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import UpgradeMenuWrapper from "../Reusables/UpgradeMenuWrapper";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";

const SupersizeUpgrade = () => {
  const { handleStepChange } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  const { setSupersizeUpgrade } = useContext(OrderContext);

  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <section className="fullScreen">
      <RedTopTexture image="">
        <>
          <p className="message">SUPERSIZE</p>
        </>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <p
          className="pageTitleHeading fontRaleway"
          style={{ textAlign: "center" }}
        >
          {data.TMKData[0].UpsaleColletions[0].UpsaleSteps[1].Name}
        </p>

        <UpgradeMenuWrapper
          setType="supersize"
          topTextNormal="Keep it medium"
          topTextUpgrade="Upgrade to large"
          data={data.TMKData[0].UpsaleColletions[0].UpsaleSteps[1]}
          theme={theme}
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
        />
      </div>

      <UpgradeBottomRibbon>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2rem",
            height: "100%",
          }}
        >
          <button
            className="bottomRibbonBtn  fontRaleway"
            style={{ borderColor: theme.activeTextColor }}
            onClick={() => {
              handleStepChange("menuUpgrade");
            }}
          >
            Cancel
          </button>
          <p>2/5</p>
          <button
            disabled={!selectedOption}
            style={{ backgroundColor: theme.activeTextColor }}
            className="bottomRibbonBtn  fontRaleway"
            onClick={() => {
              if (selectedOption !== undefined) {
                setSupersizeUpgrade(selectedOption);

                if (selectedOption.Finish) {
                  handleStepChange("checkout");
                } else {
                  handleStepChange("extras");
                }
              }
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
