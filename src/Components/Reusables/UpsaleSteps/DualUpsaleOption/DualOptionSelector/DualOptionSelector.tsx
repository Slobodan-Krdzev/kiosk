import { useContext } from "react";
import { Option } from "../../../../../Types/Types";
import styles from "./DualOptionSelectorStyles.module.css";
import { OrderContext } from "../../../../../Contexts/OrderContext/OrderContext";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { motion } from "framer-motion";

type DualOptionSelectorPropsType = {
  option: Option;
  handleOptionSelect: (option: Option) => void;
  currentSelectedOption: Option[];
  options: Option[],
  upsaleStep: number
};

const DualOptionSelector = ({
  option,
  handleOptionSelect,
  currentSelectedOption,
  options,
  upsaleStep
}: DualOptionSelectorPropsType) => {
  const { singleMeal, setUpsale } = useContext(OrderContext);
  const { theme } = useContext(DataContext);

  console.log(singleMeal.product?.Price);

  const indexOfSelector = options.indexOf(option)

  const isOptionSelected = Boolean(currentSelectedOption.find(o => o.Id === option.Id))
  const isOptionAllreayInSingleMeal = Boolean(singleMeal.upsale.find(o => o.Id === option.Id))


  return (
    <motion.div
      animate={{
        scaleY: isOptionSelected || isOptionAllreayInSingleMeal ? 1.1 : (indexOfSelector === 1 && upsaleStep === 0) ? 1.1: 1,
        scaleX: isOptionSelected || isOptionAllreayInSingleMeal ? 1.05 : (indexOfSelector === 1 && upsaleStep === 0) ? 1.05: 1,
      }}
      transition={{
        type: "tween",
        stiffness: 200,
        damping: 10,
      }}
      className={styles.option}
      role="button"
      style={{
        backgroundColor:
          isOptionSelected || isOptionAllreayInSingleMeal
            ? `${theme.activeTextColor}40` : "#F1F1F1",
        border:
        isOptionSelected || isOptionAllreayInSingleMeal
            ? `1px solid ${theme.activeTextColor}`
            : "none",
      }}
      onClick={() => {
        handleOptionSelect(option);

        setUpsale(option)
      }}
    >
      {option.OptionOrder === 0 && isOptionSelected  && (
        <div
          style={{ backgroundColor: theme.activeTextColor }}
          className={`fontNoteworthy ${styles.topRightNote}`}
        >
          {isOptionSelected ? (
            <svg
              viewBox="0 0 34 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.topRightVector}
            >
              <path
                d="M3 15L11 23L31 3"
                stroke="white"
                strokeWidth="4.77575"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            "30%"
          )}
        </div>
      )}

      {option.OptionOrder === 1  && (
        <div
          style={{ backgroundColor: theme.activeTextColor }}
          className={`fontNoteworthy ${styles.topRightNote}`}
        >
          {isOptionSelected ? (
            <svg
              viewBox="0 0 34 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.topRightVector}
            >
              <path
                d="M3 15L11 23L31 3"
                stroke="white"
                strokeWidth="4.77575"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            "30%"
          )}
        </div>
      )}

      <p className={`fontSF ${styles.optionTopText}`}>
        {option.Price === 0 ? (
          <>
            <span className={styles.boldedText}>No</span> <br /> only the meal
          </>
        ) : (
          <>
            <span className={styles.boldedText}>Yes</span> <br /> make it a menu
          </>
        )}
      </p>
      <img
        style={{
          opacity: currentSelectedOption === undefined ? 1 :  isOptionSelected ? 0.55 : 1,
        }}
        src={option.PictureUrl}
        alt={option.Name}
        className={styles.optionImage}
      />
      <div className={styles.nameAndPriceWrapper}>
        <p className={styles.price}>
          {option.Price === 0 ? singleMeal.product!.Price : `+${option.Price}`}
        </p>
        <p className={`fontSF ${styles.optionName}`}>{option.Name}</p>
      </div>
    </motion.div>
  );
};

export default DualOptionSelector;
