import { useContext } from "react";
import { Option } from "../../../../../Types/Types";
import styles from "./DualOptionSelectorStyles.module.css";
import { OrderContext } from "../../../../../Contexts/OrderContext/OrderContext";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { motion } from "framer-motion";

type DualOptionSelectorPropsType = {
  option: Option;
  handleOptionSelect: (option: string) => void;
  currentSelectedOption: string | undefined;
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
  const { singleMeal } = useContext(OrderContext);
  const { theme } = useContext(DataContext);

  console.log(singleMeal.product?.Price);

  const indexOfSelector = options.indexOf(option)

  return (
    <motion.div
      animate={{
        scaleY: currentSelectedOption === option.Name ? 1.1 : (indexOfSelector === 1 && upsaleStep === 0) ? 1.1: 1,
        scaleX: currentSelectedOption === option.Name ? 1.05 : (indexOfSelector === 1 && upsaleStep === 0) ? 1.05: 1,
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
          currentSelectedOption === undefined ? 'white' : 
          currentSelectedOption !== option.Name
            ? "#F1F1F1"
            : `${theme.activeTextColor}40`,
        border:
          currentSelectedOption === option.Name
            ? `1px solid ${theme.activeTextColor}`
            : "none",
      }}
      onClick={() => {
        handleOptionSelect(option.Name);
      }}
    >
      {option.OptionOrder === 0 && currentSelectedOption === option.Name  && (
        <div
          style={{ backgroundColor: theme.activeTextColor }}
          className={`fontNoteworthy ${styles.topRightNote}`}
        >
          {currentSelectedOption === option.Name ? (
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
          {currentSelectedOption === option.Name ? (
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
          opacity: currentSelectedOption === undefined ? 1 :  currentSelectedOption !== option.Name ? 0.55 : 1,
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
