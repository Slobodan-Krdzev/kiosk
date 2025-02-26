import { motion } from "framer-motion";
import styles from "./SlideUpModalStyles.module.css";

interface SlideUpModalProps {
  children: React.ReactNode | JSX.Element;
  style?: object;
}

const SlideUpModal = ({ children, style }: SlideUpModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 1000 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 1000 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
      style={style}
      className={styles.slideUpModal}
    >
      <div className={styles.modalContent}>{children}</div>
    </motion.div>
  );
};

export default SlideUpModal;
