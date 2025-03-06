import { motion } from "framer-motion";
import { Product } from "../../../Types/Types";
import Minus from "../SVG/Minus";
import Plus from "../SVG/Plus";
import styles from "./QuantityBtnsStyles.module.css";

interface QuantityBtnsProps {
  product: Product;
  increment: () => void;
  decrement: () => void;
  quantity: number;
}

const QuantityBtns = ({
  product,
  increment,
  decrement,
  quantity,
}: QuantityBtnsProps) => {
  return (
    <div className={styles.quantityBtnsWrapper}>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 1.1, backgroundColor: "#5c5c5c73" }}
        disabled={quantity === 1}
        style={{ backgroundColor: quantity === 1 ? "#5c5c5c73" : "" }}
        className={styles.quantityBtn}
        onClick={decrement}
      >
        <Minus color="white" />
      </motion.button>
      <motion.div
        className={styles.quantity}
        key={quantity}
        initial={{ scale: 1 }}
        animate={{ scale: 1.3 }}
        transition={{duration: 0.2, ease: 'easeInOut'}}
      >
        {quantity}
      </motion.div>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 1.1, backgroundColor: "#5c5c5c73" }}
        disabled={quantity === product.MaxAmountInAgenda}
        style={{
          backgroundColor:
            quantity === product.MaxAmountInAgenda ? "#5c5c5c73" : "",
        }}
        className={styles.quantityBtn}
        onClick={increment}
      >
        <Plus color="white" />
      </motion.button>
    </div>
  );
};

export default QuantityBtns;
