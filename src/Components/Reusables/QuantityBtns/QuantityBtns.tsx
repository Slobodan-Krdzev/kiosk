import { Product } from "../../../Types/Types";
import Minus from "../SVG/Minus";
import Plus from "../SVG/Plus";
import styles from "./QuantityBtnsStyles.module.css";

interface QuantityBtnsProps {
    product: Product,
    increment: () => void;
    decrement: () => void,
    quantity: number
}

const QuantityBtns = ({product, increment, decrement, quantity}: QuantityBtnsProps) => {

  

  return (
    <div className={styles.quantityBtnsWrapper}>
      <button
      disabled={quantity === 1}
      style={{backgroundColor: quantity === 1 ? '#5c5c5c73' : ""}}
      className={styles.quantityBtn} onClick={decrement}>
        <Minus color="white" />
      </button>
      <div className={styles.quantity}>{quantity}</div>
      <button 
      disabled={quantity === product.MaxAmountInAgenda}
      style={{backgroundColor: quantity === product.MaxAmountInAgenda ? '#5c5c5c73' : ""}}
      className={styles.quantityBtn} onClick={increment}>
        <Plus color="white" />
      </button>
    </div>
  );
};

export default QuantityBtns;
