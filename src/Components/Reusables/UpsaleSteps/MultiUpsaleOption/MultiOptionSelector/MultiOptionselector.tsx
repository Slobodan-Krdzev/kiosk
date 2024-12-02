import { useContext } from "react";
import { Option } from "../../../../../Types/Types";
import { OrderContext } from "../../../../../Contexts/OrderContext/OrderContext";
import styles from "./MultiOptionSelectorStyles.module.css";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import Plus from "../../../SVG/Plus";
import CheckMark from "../../../SVG/CheckMark";

type MultiOptionSelectorPropsType = {
  option: Option;
  currentSelectedOptions: Option[];
  handleOptionSelect: (option: Option) => void;
  handleRemoveOption: (option: Option) => void;
  handleSelectSide: (side: Option) => void;
  handleSelectDrink: (drink: Option) => void;

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
  const { theme } = useContext(DataContext);

  const isOptionSelected = currentSelectedOptions.find(
    (o) => o.Id === option.Id
  );

  const dynamicStyles = {
    boxShadow: `20px 20px 60px 0px ${theme.activeTextColor}14`,
  };

  const isExtraOptionAdded = Boolean(
    singleMeal.extras?.find((o) => o.Id === option.Id)
  );
  const isSideOptionAdded = Boolean(
    singleMeal.sides?.find((o) => o.Id === option.Id)
  );
  const isDrinkOptionAdded = Boolean(
    singleMeal.drinks?.find((o) => o.Id === option.Id)
  );

  return (
    <div
      role="button"
      className={styles.optionSelector}
      style={{
        ...dynamicStyles,
        border:
          isExtraOptionAdded || isSideOptionAdded || isDrinkOptionAdded
            ? `1px solid ${theme.activeTextColor}`
            : "",
        backgroundColor:
          currentSelectedOptions.length === 0
            ? "white"
            : isOptionSelected ||
              isExtraOptionAdded ||
              isSideOptionAdded ||
              isDrinkOptionAdded
            ? `${theme.activeTextColor}40`
            : "#F1F1F1",
        pointerEvents: disableBtns ? "none" : "auto",
      }}
      onClick={() => {
        if (isOptionSelected) {
          handleRemoveOption(option);
        } else {
          handleOptionSelect(option);
        }
        console.log("Single Meal", singleMeal);
        console.log("curentSelectedOptions", currentSelectedOptions);
      }}
    >
      <img
        src={option.PictureUrl}
        alt={option.Name}
        className={styles.image}
        style={{
          opacity:
            currentSelectedOptions.length === 0
              ? 1
              : !isOptionSelected
              ? 0.55
              : 1,
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
        {isOptionSelected ? <CheckMark /> : <Plus />}
      </button>
    </div>
  );
};

export default MultiOptionselector;
