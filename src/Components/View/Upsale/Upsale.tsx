import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import DualUpsaleOption from "../../Reusables/UpsaleSteps/DualUpsaleOption/DualUpsaleOption";
import MultiUpsaleOption from "../../Reusables/UpsaleSteps/MultiUpsaleOption/MultiUpsaleOption";
import { UpsaleContext } from "../../../Contexts/UpsaleContext/UpsaleContext";
import Modal from "../../Reusables/Modal";
import { StepContext } from "../../../Contexts/StepContext/StepContext";

const Upsale = () => {
  // za dummy data i tuka treba da zemame od context
  const { tmkData} = useContext(DataContext);
  const { upsaleId } = useContext(UpsaleContext);
  const { handleStepChange } = useContext(StepContext);


  // tuka ni treba upsale od ID

  const [upsaleStep, setUpsaleStep] = useState(0);
  // VRATI VO TMK DATA
  const upsaleData = tmkData.UpsaleColletions.find(
    (upsale) => upsale.Id === upsaleId
  );

  if (upsaleData) {
    const stepsLength = upsaleData.UpsaleSteps?.length;
    const upsaleStepData = upsaleData.UpsaleSteps[upsaleStep];

    const handleUpsaleStepChange = (type: "increase" | "decrease") => {
      if (type === "increase") {
        setUpsaleStep((upsaleStep) => upsaleStep + 1);
      } else {
        setUpsaleStep((upsaleStep) => upsaleStep - 1);
      }
    };

    console.log("Upsale Data", upsaleData);

    return (
      <section>
        {upsaleStepData.Options.length <= 2 ? (
          <DualUpsaleOption
            stepsLength={stepsLength}
            upsaleStep={upsaleStep}
            upsaleStepData={upsaleStepData}
            handleUpsaleStepChange={handleUpsaleStepChange}
            upsaleInfoData={upsaleData!}
          />
        ) : (
          <MultiUpsaleOption
            upsaleStepData={upsaleStepData}
            handleUpsaleStepChange={handleUpsaleStepChange}
            upsaleStep={upsaleStep}
            stepsLength={stepsLength}
            upsaleInfoData={upsaleData!}
          />
        )}
      </section>
    );
  }

  return  <Modal borderColor={"black"}>
  <>
    Upsale Data is missing 
    <button
      onClick={() => {
        handleStepChange("order");
      }}
    >
      Close
    </button>
  </>
</Modal>;
};

export default Upsale;
