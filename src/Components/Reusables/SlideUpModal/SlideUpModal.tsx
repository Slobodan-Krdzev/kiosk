import { motion } from "framer-motion";
import styles from "./SlideUpModalStyles.module.css";
import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { Product } from "../../../Types/Types";

interface SlideUpModalProps {
  children: React.ReactNode | JSX.Element;
  style?: object;
}

const SlideUpModal = ({ children, style }: SlideUpModalProps) => {
 const { handleSetMealForInfo } = useContext(StepContext);

  const onParentClick = (event: React.MouseEvent<HTMLDivElement>) => {

    handleSetMealForInfo({} as Product, false);
    console.log('Parent Click', event)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
      style={style}
      className={styles.slideUpModal}
      onClick={onParentClick}
      id="parent"
    >
      <motion.div
        initial={{ opacity: 0, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 1000 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
        className={styles.modalContent}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SlideUpModal;
