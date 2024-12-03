import { useContext, useState } from "react";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { UpsaleContext } from "../../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option } from "../../../../../Types/Types";
import CheckMark from "../../../SVG/CheckMark";
import Plus from "../../../SVG/Plus";
import styles from "./MultiOptionSelectorStyles.module.css";

type MultiOptionSelectorPropsType = {
  option: Option;
  maxSelection: number;
  upsaleStep: number;
};

const MultiOptionselector = ({
  option,
  maxSelection,
  upsaleStep,
}: MultiOptionSelectorPropsType) => {
  // const { singleMeal } = useContext(OrderContext);

  const [isSelected, setIsSelected] = useState(false)
  const { theme } = useContext(DataContext);
  const { upsaleData, addOption, removeOption } = useContext(UpsaleContext);
  const isOptionAlreadySelected = Boolean(
    upsaleData[upsaleStep].options.find((o) => o.Id === option.Id)
  );

  const dynamicStyles = {
    boxShadow: `20px 20px 60px 0px ${theme.activeTextColor}14`,
  };

  const selectedOptionsLength = upsaleData[upsaleStep].options.length

  return (
    <div
      role="button"
      className={styles.optionSelector}
      style={{
        ...dynamicStyles,
        border: isOptionAlreadySelected
          ? `1px solid ${theme.activeTextColor}`
          : "",
        backgroundColor: isOptionAlreadySelected
          ? `${theme.activeTextColor}40`
          : selectedOptionsLength === 0 ? 'white' : "#F1F1F1",

          // OVDEKA ZA TESTIRANJE MAXSELECTION PROMENI GO SO ZAKUCAN BROJ  
        pointerEvents: selectedOptionsLength >= maxSelection && !isOptionAlreadySelected ? "none" : "auto",
      }}
      onClick={() => {
        // if (isOptionSelected) {
        //   handleRemoveOption(option);
        // } else {
        //   handleOptionSelect(option);
        // }
        isSelected ? removeOption(upsaleStep, option) : addOption(upsaleStep, option, 2);
        
        setIsSelected(!isSelected)
      }}
    >
      <img
        src={option.PictureUrl}
        alt={option.Name}
        className={styles.image}
        style={{
          opacity: isOptionAlreadySelected ? 1 : selectedOptionsLength === 0 ? 1 : 0.55,
        }}
      />

      <p
        className={`fontSF ${styles.optionName}`}
        style={{ textAlign: "left" }}
      >
        {option.Name}
      </p>
      <p
        className={`fontSF ${styles.optionPrice}`}
        style={{ textAlign: "left" }}
      >
        {option.Price}
      </p>

      <button
        className={styles.optionBtn}
        style={{ backgroundColor: theme.activeTextColor }}
      >
        {isOptionAlreadySelected ? <CheckMark /> : <Plus />}
      </button>
    </div>
  );
};

export default MultiOptionselector;
