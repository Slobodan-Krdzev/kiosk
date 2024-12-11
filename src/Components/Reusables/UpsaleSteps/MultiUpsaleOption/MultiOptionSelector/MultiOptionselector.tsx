import { useContext, useState } from "react";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { UpsaleContext } from "../../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option } from "../../../../../Types/Types";
import Plus from "../../../SVG/Plus";
import Trashcan from "../../../SVG/Trashcan";
import styles from "./MultiOptionSelectorStyles.module.css";
import CheckMark from "../../../SVG/CheckMark";
import Minus from "../../../SVG/Minus";

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
  const [isSelected, setIsSelected] = useState(false);
  const { theme } = useContext(DataContext);
  const { upsaleData, addNewOption, removeAnOption } =
    useContext(UpsaleContext);

  const [quantity, setQuantity] = useState(upsaleData[upsaleStep].stepData.find((o) => o.option.Id === option.Id)?.quantity ?? 1);

  const isOptionAlreadySelected = Boolean(
    upsaleData[upsaleStep].stepData.find((o) => o.option.Id === option.Id)
  );

  const dynamicStyles = {
    boxShadow: `20px 20px 60px 0px ${theme.activeTextColor}14`,
  };

  const selectedOptionsLength = upsaleData[upsaleStep].stepData.length;

  
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
          : selectedOptionsLength === 0
          ? "white"
          : "#F1F1F1",

        // OVDEKA ZA TESTIRANJE MAXSELECTION PROMENI GO SO ZAKUCAN BROJ
        pointerEvents:
          selectedOptionsLength >= maxSelection && !isOptionAlreadySelected
            ? "none"
            : "auto",
      }}
    >
      <img
        src={option.PictureUrl}
        alt={option.Name}
        className={styles.image}
        style={{
          opacity: isOptionAlreadySelected
            ? 1
            : selectedOptionsLength === 0
            ? 1
            : 0.55,
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

      <div
        className={`fontSF ${styles.optionBtn}`}
        style={{
          backgroundColor: theme.activeTextColor,
          width: isOptionAlreadySelected && option.MaxSelection > 1 ? "100%" : "",
          borderTopLeftRadius: isOptionAlreadySelected && option.MaxSelection > 1 ? 0 : "",
          borderBottomLeftRadius:
            isOptionAlreadySelected && option.MaxSelection > 1 ? 8 : "",

          justifyContent:
            isOptionAlreadySelected && option.MaxSelection > 1 ? "space-between" : "center",
          padding: isOptionAlreadySelected && option.MaxSelection > 1 ? "0 4vw" : "",
        }}
      >
        {!isOptionAlreadySelected && (
          <button
            className={styles.addBtn}
            style={{ backgroundColor: theme.activeTextColor }}
            onClick={() => {
              addNewOption(upsaleStep, option, maxSelection, 1);

              setIsSelected(!isSelected);
            }}
          >
            <Plus />
          </button>
        )}

        {isOptionAlreadySelected && option.MaxSelection === 1 && (
          <button
            className={styles.addBtn}
            style={{ backgroundColor: theme.activeTextColor }}
            onClick={() => {
              removeAnOption(upsaleStep, option);

              setIsSelected(!isSelected);
            }}
          >
            <CheckMark />
          </button>
        )}

        {isOptionAlreadySelected && option.MaxSelection > 1 && (
          <>
            <button
              className={styles.quantityBtns}
              onClick={() => {
                setQuantity((q) => q - 1);

                if (quantity === 1) {
                  removeAnOption(upsaleStep, option);
                  setIsSelected(false);
                } else {
                  addNewOption(upsaleStep, option, maxSelection, quantity - 1);
                }
              }}
            >
              {quantity === 1 ? <Trashcan /> : <Minus />}
            </button>
            <p className={styles.quantity}>{quantity}</p>

              <button
                className={styles.quantityBtns}
                onClick={() => {

                  if(quantity === option.MaxSelection){

                    return 
                  }

                  setQuantity((q) => q + 1);

                  if (isSelected) {
                    addNewOption(
                      upsaleStep,
                      option,
                      maxSelection,
                      quantity + 1
                    );
                  }
                }}
              >
                {quantity === option.MaxSelection ? "MAX" : <Plus />}
                
              </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiOptionselector;
