import { useContext } from "react";
import { Option } from "../../../../../Types/Types";
import { OrderContext } from "../../../../../Contexts/OrderContext/OrderContext";

type MultiOptionSelectorPropsType = {
  option: Option;
  currentSelectedOptions: Option[];
  handleOptionSelect: (option: Option) => void;
  handleRemoveOption: (option: Option) => void;
  disableBtns: boolean;
  upsaleStep: number;
};

const MultiOptionselector = ({
  option,
  currentSelectedOptions,
  handleOptionSelect,
  handleRemoveOption,
  disableBtns,
}: MultiOptionSelectorPropsType) => {
  const { singleMeal } = useContext(OrderContext);

  const isOptionSelected = currentSelectedOptions.find(
    (o) => o.Id === option.Id
  );

  const dynamicStyles = {
    backgroundColor: isOptionSelected ? "red" : "",
  };

  return (
    <div
      style={{
        ...dynamicStyles,
        pointerEvents: disableBtns ? "none" : "auto",
        // backgroundColor: disableBtns ? "red" : "",
      }}
      onClick={() => {
        if (isOptionSelected) {
          handleRemoveOption(option);
        } else {
          handleOptionSelect(option);
        }
        console.log(singleMeal);
        console.log(currentSelectedOptions);
      }}
    >
      {option.Name}
    </div>
  );
};

export default MultiOptionselector;
