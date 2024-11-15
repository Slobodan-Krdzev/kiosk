import { SingleMealType  } from "../../../Types/Types";
import styles from "./OrderInfoCardStyles.module.css";

type OrderInfoCardPropsType = {
  order: SingleMealType;
};

const OrderInfoCard = ({ order }: OrderInfoCardPropsType) => {
  return (
    <div className={styles.paymentSingleCard}>
      <div>
        <p className={`fontSF ${styles.productName}`}>
          {order.product!.Name.substring(0, 15)}...{" "}
          <span>{`x ${order.quantity}`}</span>
        </p>

        {order.sides && (
          <p
            style={{ color: '#898989' }}
            className={`${styles.sidesText} fontSF`}
          >
            {order.sides[0].Name} {`(${order.sides[0].Price} )`}
          </p>
        )}

        {order.note !== '' && (
          <p
            style={{ color: '#898989' }}
            className={`${styles.sidesText} fontSF`}
          >
            Note: {order.note} 
          </p>
        )}
      </div>

      <p className={`${styles.totalPrice} fontSF`}>
        {order.totalPrice.toFixed(2)} {order.product?.PriceValue ?? ""}
      </p>
    </div>
  );
};

export default OrderInfoCard;
