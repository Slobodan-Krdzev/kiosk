import { useContext } from "react";
import styles from "./MealCardStyles.module.css";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Product, ThemeType } from "../../../../Types/Types";

type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
};

const MealCard = ({ product, theme }: MealCardPropsType) => {
  const { handleStepChange } = useContext(StepContext);
  const { setMeal, placeMealInOrders } = useContext(OrderContext);

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.productImage}
          src={`${product.SmallPictureUrl}`}
          alt={product.Name}
        />
      </div>

      <p className="fontRaleway productNameHeading">
        {product.Name.substring(0, 15)}...
      </p>

      <p
        className="fontRaleway productPriceHeading"
        style={{ position: "absolute", bottom: 10, fontSize: 16 }}
      >
        {product.Price} {product.PriceValue}
      </p>

      <button
        className={styles.productBtn}
        style={{
          backgroundColor: theme.activeTextColor,
          color: theme.textColor,
        }}
        onClick={() => {
          if (product.HasUpsaleCollection) {
            handleStepChange("menuUpgrade");
            setMeal(product);
          } else {
            handleStepChange("checkout");
            placeMealInOrders({
              id: product.ProductId,
              product: product,
              image: product.SmallPictureUrl,
              isTakeaway: false,
              menuUpgrade: undefined,
              supersize: undefined,
              extras: [],
              sides: undefined,
              drinks: [],
              originalTotal: product.Price,
              totalPrice: product.Price,
              quantity: 1,
            });
          }

          // ovde se setira productot koj e izbran
        }}
      >
        {/* <img src="/plus.png" alt="Add" />
         */}
        &#43;
      </button>
    </div>
  );
};

export default MealCard;
