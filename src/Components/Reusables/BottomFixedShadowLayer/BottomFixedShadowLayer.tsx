import { motion } from "framer-motion";
import styles from "./BottomFixedShadowLayerStyles.module.css";

interface BottomFixedShadowLayerProps {
  children: React.ReactNode | JSX.Element;
}

const BottomFixedShadowLayer = ({
  children,
}: BottomFixedShadowLayerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.3, delay: 0.15, ease: "easeInOut" }}
      className={styles.layer}
    >
      {children}
    </motion.div>
  );
};

export default BottomFixedShadowLayer;
