import { useContext, useState } from "react";
import { SingleMealType, ThemeType } from "../../../Types/Types";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import styles from "./CheckoutCardStyles.module.css";

type CheckoutCardPropsType = {
  order: SingleMealType;
  theme: ThemeType;
};

const CheckoutCard = ({ order, theme }: CheckoutCardPropsType) => {
  const [isSelected, setIsSelected] = useState(
    order.quantity > 1 ? true : false
  );
  const [quantity, setQuantity] = useState(
    order.quantity >= 1 ? order.quantity : 1
  );
  const { setSingleMealQuantity } = useContext(OrderContext);

  return (
    <div className={styles.checkoutCard}>
      <img
        src={`${order.product!.SmallPictureUrl}`}
        alt={order.product!.Name}
      />

      <div className={styles.checkoutCardInfoWrapper}>
        <p
          className={`${styles.checkoutCardMealName} pageTitleHeading fontRaleway`}
        >
          {order.product!.Name.length > 20
            ? `${order.product!.Name.substring(0, 20)}...`
            : order.product!.Name}
        </p>
        <div className={styles.mealInfoWrapper}>
          {order.sides && (
            <p
              className="productNameHeading fontRaleway"
              style={{ color: theme.textColor }}
            >
              {order.sides.map(s => <span key={s.Id}>{s.Name} x 1</span>)}

            </p>
          )}


          {order.drinks && <p
            className="productNameHeading fontRaleway"
            style={{ color: theme.textColor }}
          >
            {order.drinks.map(drink => <span key={drink.drink.Id}>{drink.drink.Name} x ${drink.quantity},</span>)}
          </p>}
          
          {order.extras && <p
            className="productNameHeading fontRaleway"
            style={{ color: theme.textColor }}
          >
            {order.extras.map(e => <span key={e.Id}>{e.Name} x 1</span>)}
          </p>}
          
        </div>
      </div>

      {/* TOTAL PRICE */}
      <p className={`${styles.checkoutCardPrice} fontRaleway`}>
        {order.totalPrice.toFixed(2)} {order.product!.PriceValue}
      </p>

      {!isSelected && (
        <button
          style={{ backgroundColor: theme.activeTextColor }}
          className={styles.checkoutCardBtn}
          onClick={() => {
            setIsSelected(true);
          }}
        >
          &#43;
        </button>
      )}

      {isSelected && (
        <div
          className={styles.checkoutCardQuantityWrapper}
          style={{ backgroundColor: theme.activeTextColor }}
        >
          <button
            onClick={() => {
              if (quantity === 1) {
                setQuantity(1);
                setIsSelected(false);
              } else {
                setQuantity((quantity) => quantity - 1);
                setSingleMealQuantity(order, "minus");
              }
            }}
          >
            &#8722;
          </button>
          <p className={styles.quantityCounter}>{quantity}</p>
          <button
            onClick={() => {
              setQuantity((quantity) => quantity + 1);
              setSingleMealQuantity(order, "plus");
            }}
          >
            &#43;
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutCard;
