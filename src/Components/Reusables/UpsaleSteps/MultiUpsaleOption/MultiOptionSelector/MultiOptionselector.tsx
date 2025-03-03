import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { UpsaleContext } from "../../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option } from "../../../../../Types/Types";
import PricePreviewer from "../../../PricePreviewer/PricePreviewer";
import CheckMark from "../../../SVG/CheckMark";
import Minus from "../../../SVG/Minus";
import Plus from "../../../SVG/Plus";
import Trashcan from "../../../SVG/Trashcan";
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
  const [isButtonOpened, setIsButtonOpened] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { theme } = useContext(DataContext);
  const { upsaleData, addNewOption, removeAnOption } =
    useContext(UpsaleContext);

  const [quantity, setQuantity] = useState(
    upsaleData[upsaleStep].stepData.find((o) => o.option.Id === option.Id)
      ?.quantity ?? 1
  );

  const isOptionAlreadySelected = Boolean(
    upsaleData[upsaleStep].stepData.find((o) => o.option.Id === option.Id)
  );

  const dynamicStyles = {
    boxShadow: `20px 20px 60px 0px ${theme.activeTextColor}14`,
  };

  const selectedOptionsLength = upsaleData[upsaleStep].stepData.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isButtonOpened) setIsButtonOpened(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isButtonOpened, quantity]);

  const takeOutBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setQuantity((q) => q - 1);

    if (quantity === 1) {
      removeAnOption(upsaleStep, option);
      setIsSelected(false);
      setIsButtonOpened(false);
    } else {
      addNewOption(upsaleStep, option, maxSelection, quantity - 1);
    }

    // if (quantity <= 1) {
    //   setQuantity(1);
    //   setIsButtonOpened(false);

    //   removeMealFromOrders(meal.id);
    // } else {
    //   setQuantity((q) => q - 1);

    //   setSingleMealQuantity(meal, "minus");
    // }
  };

  const addBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (quantity === option.MaxSelection) {
      setIsButtonOpened(false);
      return;
    }

    setQuantity((q) => q + 1);

    if (isSelected) {
      addNewOption(upsaleStep, option, maxSelection, quantity + 1);
    }
  };

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
          ? `${theme.activeTextColor}30`
          : selectedOptionsLength === maxSelection
          ? "#F1F1F1"
          : "white",

        // OVDEKA ZA TESTIRANJE MAXSELECTION PROMENI GO SO ZAKUCAN BROJ
        pointerEvents:
          selectedOptionsLength >= maxSelection && !isOptionAlreadySelected
            ? "none"
            : "auto",
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        console.log("Allready Selected");

        if (isOptionAlreadySelected) {
          console.log("Allready Selected");
          if (option.MaxSelection > 1) {
            setIsButtonOpened(true);
          } else {
            removeAnOption(upsaleStep, option);
          }
        } else {
          setIsSelected(true);
          addNewOption(upsaleStep, option, maxSelection, 1);
          setIsButtonOpened(true);
          setQuantity(1);
        }
      }}
    >
      <div
        style={{ backgroundImage: `url(${option.PictureUrl})` }}
        className={styles.optionImg}
      ></div>
      <div className={styles.optionInfoWrapper}>
        <p className={styles.optionName} style={{ textAlign: "left" }}>
          {option.Name}
        </p>
        <PricePreviewer
          price={option.Price}
          color={theme.activeTextColor}
          style={{
            bottom: "3%",
          }}
        />
      </div>

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          backgroundColor:
            option.MaxSelection > 1 && isButtonOpened ? "#000000" : "#F9F9F9",
          width: isButtonOpened && option.MaxSelection > 1 ? "96%" : "40px",
          minWidth: "40px",
          height: "40px",
          maxWidth: "100%",
          maxHeight: "40px",
          lineHeight: "40px",
          padding: 0,
        }}
        transition={{ type: "spring", duration: 1 }}
        className={styles.cardButtonWrapper}
        style={{
          color: theme.activeTextColor,
          justifyContent:
            option.MaxSelection > 1 && isButtonOpened
              ? "space-between"
              : "center",
          alignItems: "center",
          borderColor: option.MaxSelection > 1 && isButtonOpened ? "black" : "",
          padding: option.MaxSelection > 1 && isButtonOpened ? "0 3vw" : 0,
          width:
            option.MaxSelection > 1 && option.MaxSelection > 1 && isButtonOpened
              ? "100%"
              : "3.6vh",
          display: "flex",
          cursor: "pointer",
        }}
        onClick={() => {
          if (isOptionAlreadySelected) {
            if (option.MaxSelection > 1) setIsButtonOpened(true);
            return;
          }
          setIsSelected(true);
          addNewOption(upsaleStep, option, maxSelection, 1);
          setIsButtonOpened(true);
          setQuantity(1);
        }}
      >
        {!isOptionAlreadySelected && <Plus color={"gray"} />}

        {option.MaxSelection > 1 && isOptionAlreadySelected && !isButtonOpened && <>{quantity} </>}
        {isOptionAlreadySelected && option.MaxSelection <= 1 && <CheckMark color="green" />}

        {isOptionAlreadySelected &&
          option.MaxSelection > 1 &&
          isButtonOpened && (
            <>
              <button
                className={styles.quantityBtns}
                onClick={takeOutBtnHandler}
              >
                {" "}
                {quantity === 1 ? <Trashcan /> : <Minus color="black" />}
              </button>
              <div
                style={{
                  flexBasis: "33.333%",
                  color: "white",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={styles.quantityRender}
              >
                {quantity}
              </div>
              <button
                disabled={quantity === option.MaxSelection}
                className={styles.quantityBtns}
                onClick={addBtnHandler}
                style={{backgroundColor: quantity === option.MaxSelection ? "#bfbfbf " : ''}}
              >
                {quantity === option.MaxSelection ? 'Max' : <Plus color={"black"} />}
              </button>
            </>
          )}
      </motion.div>
      {/* <div
        className={`fontSF ${styles.optionBtn}`}
        style={{
          backgroundColor:
            selectedOptionsLength === maxSelection && !isOptionAlreadySelected
              ? `${theme.activeTextColor}70`
              : theme.activeTextColor,
          width:
            isOptionAlreadySelected && option.MaxSelection > 1 ? "100%" : "",
          borderTopLeftRadius:
            isOptionAlreadySelected && option.MaxSelection > 1 ? 0 : "",
          borderBottomLeftRadius:
            isOptionAlreadySelected && option.MaxSelection > 1 ? 8 : "",

          justifyContent:
            isOptionAlreadySelected && option.MaxSelection > 1
              ? "space-between"
              : "center",
          padding:
            isOptionAlreadySelected && option.MaxSelection > 1 ? "0 4vw" : "",
        }}
      >
        {!isOptionAlreadySelected && (
          <button
            className={styles.addBtn}
            style={{
              backgroundColor:
                selectedOptionsLength === maxSelection &&
                !isOptionAlreadySelected
                  ? `transparent`
                  : theme.activeTextColor,
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 50,
            }}
            onClick={() => {
              addNewOption(upsaleStep, option, maxSelection, 1);

              setIsSelected(!isSelected);
            }}
          >
            <Plus color="white" />
          </button>
        )}

        {isOptionAlreadySelected && option.MaxSelection === 1 && (
          <button
            className={styles.addBtn}
            style={{
              backgroundColor: theme.activeTextColor,
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 50,
            }}
            onClick={() => {
              removeAnOption(upsaleStep, option);

              setIsSelected(!isSelected);
            }}
          >
            <CheckMark color="white" />
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
              {quantity === 1 ? (
                <Trashcan />
              ) : (
                <Minus color={theme.textColor} />
              )}
            </button>
            <p className={styles.quantity}>{quantity}</p>

            <button
              className={styles.quantityBtns}
              onClick={() => {
                if (quantity === option.MaxSelection) {
                  return;
                }

                setQuantity((q) => q + 1);

                if (isSelected) {
                  addNewOption(upsaleStep, option, maxSelection, quantity + 1);
                }
              }}
            >
              {quantity === option.MaxSelection ? (
                "MAX"
              ) : (
                <Plus color={theme.textColor} />
              )}
            </button>
          </>
        )}
      </div> */}
    </div>
  );
};

export default MultiOptionselector;
