import { SingleMealType, ThemeType } from "../../../Types/Types";
import styles from "./OrderInfoCardStyles.module.css";

type OrderInfoCardPropsType = {
  order: SingleMealType;
  theme: ThemeType
};

const OrderInfoCard = ({ order, theme }: OrderInfoCardPropsType) => {

  return (
    <div className={styles.paymentSingleCard}>
      <div className={styles.top}>
        <p className={`productNameHeading fontRaleway ${styles.productNameP}`}>
          {order.product!.Name}{" "}
          <span >{`x ${order.quantity}`}</span>
          
        </p>

        {order.sides && (
          <p style={{color: theme.textColor, fontSize: '16px'}}
          className="productPriceHeading fontRaleway"
          >
            Plus {order.sides[0].Name} {`(${order.sides[0].Price} )`}
          </p>
        )}
      </div>

      <p
      className="productPriceHeading fontRaleway"> 
        {order.totalPrice.toFixed(2)} {order.product?.PriceValue ?? ''}
      </p>
    </div>
  );
};

export default OrderInfoCard;
