import { useContext, useState } from "react";
import { DataContext } from "../../Contexts/DataContext/Datacontext";
import { Option } from "../../Types/Types";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeMenuWrapper from "../Reusables/UpgradeMenuWrapper";

const SupersizeUpgrade = () => {
  // const { handleStepChange } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  // const { setSupersizeUpgrade } = useContext(OrderContext);

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

    </section>
  );
};

export default SupersizeUpgrade;
