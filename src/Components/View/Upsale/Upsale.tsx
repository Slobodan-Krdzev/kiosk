import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import DualUpsaleOption from "../../Reusables/UpsaleSteps/DualUpsaleOption/DualUpsaleOption";
import MultiUpsaleOption from "../../Reusables/UpsaleSteps/MultiUpsaleOption/MultiUpsaleOption";

const Upsale = () => {
  const { data } = useContext(DataContext);

  const [upsaleStep, setUpsaleStep] = useState(0);

  const stepsLength = data.TMKData[0].UpsaleColletions[0].UpsaleSteps.length
  const upsaleStepData =
    data.TMKData[0].UpsaleColletions[0].UpsaleSteps[upsaleStep];

  const handleUpsaleStepChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setUpsaleStep((upsaleStep) => upsaleStep + 1);
    } else {
      setUpsaleStep((upsaleStep) => upsaleStep - 1);
    }
  };


  return (
    <section>
      {upsaleStepData.Options.length === 2 ? (
        <DualUpsaleOption
          stepsLength={stepsLength}
          upsaleStep={upsaleStep}
          upsaleStepData={upsaleStepData}
          handleUpsaleStepChange={handleUpsaleStepChange}
        />
      ) : (
        <MultiUpsaleOption
          upsaleStepData={upsaleStepData}
          handleUpsaleStepChange={handleUpsaleStepChange}
          upsaleStep={upsaleStep}
        />
      )}
    </section>
  );
};

export default Upsale;
