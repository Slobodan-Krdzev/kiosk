import { useContext, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Option, UpsaleStep } from "../../../../Types/Types";
import UpgradeBottomRibbon from "../../UpgradeBottomRibbon/UpgradeBottomRibbon";
import MultiOptionselector from "./MultiOptionSelector/MultiOptionselector";

type MultiUpsaleOptionPropsType = {
  upsaleStepData: UpsaleStep;
  handleUpsaleStepChange: (type: "increase" | "decrease") => void;
  upsaleStep: number;
};

const MultiUpsaleOption = ({
  upsaleStepData,
  handleUpsaleStepChange,
  upsaleStep,
}: MultiUpsaleOptionPropsType) => {
  const { handleStepChange } = useContext(StepContext);

  const { setExtras, setSides, setDrinks, placeMealInOrders, singleMeal } =
    useContext(OrderContext);

  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  const options = upsaleStepData.Options;
  const maxSelection = upsaleStepData.MaxSelection;

  const handleOptionSelect = (option: Option) => {
    setSelectedOption([...selectedOption, option]);
  };

  const handleRemoveOption = (option: Option) => {
    setSelectedOption(selectedOption.filter((o) => o.Id !== option.Id));
  };

  return (
    <div>
      {/* top content */}

      <div></div>

      {/* option choose */}

      <div>
        <h2 className="fontSF">{upsaleStepData.Name}</h2>

        <div>
          {options.map((o) => (
            <MultiOptionselector
              key={o.Id}
              option={o}
              currentSelectedOptions={selectedOption}
              handleOptionSelect={handleOptionSelect}
              handleRemoveOption={handleRemoveOption}
              disableBtns={maxSelection === selectedOption.length}
              upsaleStep={upsaleStep}
            />
          ))}
        </div>
      </div>
      {/* ribbon */}

      <UpgradeBottomRibbon
        disableNextBtn={selectedOption === undefined}
        nextAction={() => {

          if (selectedOption.length && upsaleStepData.DisplayOrder === 2) {
            setExtras(selectedOption);
            setSelectedOption([]);
          }else if (selectedOption.length && upsaleStepData.DisplayOrder === 3) {
            setSides(selectedOption);
            setSelectedOption([]);
          }else if (selectedOption.length && upsaleStepData.DisplayOrder === 4) {
            setDrinks(selectedOption);
            placeMealInOrders({...singleMeal, drinks: selectedOption});
            setSelectedOption([]);

            handleStepChange("order");

          }

          handleUpsaleStepChange("increase");


          // OVDE UPGRADE NA SINGLEMEAL
          // if (selectedOptionObject && upsaleStepData.DisplayOrder === 0) {
          //   setMenuUpgrade(selectedOptionObject);
          //   setSelectedOption(undefined)
          // }

          // if(selectedOptionObject && upsaleStepData.DisplayOrder === 1){

          //   // OVDE SUPERSIZE
          //   setSupersizeUpgrade(selectedOptionObject)
          //   setSelectedOption(undefined)
          // }
        }}
        backAction={() => {
          handleUpsaleStepChange("decrease");
        }}
      />
    </div>
  );
};

export default MultiUpsaleOption;
