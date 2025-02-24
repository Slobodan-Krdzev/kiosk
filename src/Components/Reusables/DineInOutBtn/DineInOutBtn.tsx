import { motion } from "framer-motion";
import React from "react";
import styles from "./DineInOutBtnStyles.module.css";

interface DineInOutBtnPropsType {
  children: React.ReactNode | JSX.Element;
  clickHandler: () => void;
  selectedOption: "Takeaway" | "Dine In" | undefined;
  option: "Takeaway" | "Dine In";
  themeColor: string
}

const DineInOutBtn = ({
  children,
  clickHandler,
  selectedOption,
  option,
  themeColor
}: DineInOutBtnPropsType) => {

  return (
    <motion.button
      animate={{
        scale: selectedOption == option ? 1.1 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      className={`fontSF ${styles.langMenuBtn}`}
      style={{
        backgroundColor:
          selectedOption === option ? `${themeColor}40` : "#FFFFFF",
        border:
          selectedOption === option ? `1px solid ${themeColor}` : "",
      }}
      onClick={clickHandler}
    >
      {children}
    </motion.button>
  );
};

export default DineInOutBtn;
