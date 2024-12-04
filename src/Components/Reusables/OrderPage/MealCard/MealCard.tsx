import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Product, SingleMealType, ThemeType } from "../../../../Types/Types";
import styles from "./MealCardStyles.module.css";
import Trashcan from "../../SVG/Trashcan";
import Plus from "../../SVG/Plus";

type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
};

const MealCard = ({ product, theme }: MealCardPropsType) => {
  const { handleStepChange, handleSetMealForInfo } = useContext(StepContext);
  const {
    placeMealInOrders,
    setMeal,
    removeMealFromOrders,
    orders,
    setSingleMealQuantity,
  } = useContext(OrderContext);

  const [quantity, setQuantity] = useState(1);

  const isMealPlacedInOrders = Boolean(
    orders.find((meal) => meal.id === product.ProductId)
  );

  const meal = orders.find(
    (o) => o.product?.ProductId === product.ProductId
  ) as SingleMealType;

  return (
    <motion.div
      id="productCard"
      animate={{
        scale: isMealPlacedInOrders ? 1.03 : 1,
        
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={styles.card}
      style={{
        border: isMealPlacedInOrders
          ? `1px solid ${theme.activeTextColor}`
          : "",
          backgroundColor: isMealPlacedInOrders
          ? `${theme.activeTextColor}60`
          : "white",
      }}
    >
      <div className={styles.imgWrapper}>
        <img
          className={styles.productImage}
          src={`${product.SmallPictureUrl}`}
          alt={product.Name.substring(0, 5)}
          loading="lazy"
        />

        {/* MEAL INFO TRIGER */}
        <button
          className={styles.infoBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleSetMealForInfo(product);
            handleStepChange("mealInfo");
          }}
        >
          <b>i</b>
        </button>
      </div>

      <p className={`fontSF ${styles.productNameHeading}`}>
        {product.Name.length > 35
          ? product.Name.substring(0, 30)
          : product.Name}
      </p>

      <p className={`fontSF ${styles.productPriceHeading}`}>
        {product.Price} 
      </p>

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          width: isMealPlacedInOrders ? "100%" : "23%",
          borderTopLeftRadius: isMealPlacedInOrders ? "0" : "16px",
          padding: isMealPlacedInOrders ? "0 3vw" : 0,


        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: theme.activeTextColor,
          color: theme.textColor,
          justifyContent: isMealPlacedInOrders ? "space-between" : "center",
          padding: isMealPlacedInOrders ? "0 3vw" : 0,
          width: isMealPlacedInOrders ? "100%" : "23%",
        }}
        className={styles.productBtnsWrapper}
      >
        {!isMealPlacedInOrders && (
          <button
            className={styles.productBtn}
            onClick={() => {

              setQuantity((q) => q + 1);

              if(product.NoInteraction) {

                handleSetMealForInfo(product)
                handleStepChange("mealInfo");
              }else if (product.HasUpsaleCollection && !isMealPlacedInOrders) {

                setMeal(product)
                handleStepChange('menuUpgrade')
      
              } else {
                if (isMealPlacedInOrders) {
                  removeMealFromOrders(product.ProductId);
                } else {
                  setQuantity(1);
                  placeMealInOrders({
                    id: product.ProductId,
                    product: product,
                    image: product.SmallPictureUrl,
                    upsale: undefined,
                    originalTotal: product.Price,
                    totalPrice: product.Price,
                    quantity: quantity,
                    note: "",
                  });
                }
              }
            }}
          >

            {product.NoInteraction ? <b style={{color: 'white'}}>i</b> : <Plus />}
           
          </button>
        )}

        {isMealPlacedInOrders && (
          <>
            <button
              className={styles.productBtn}
              onClick={(e) => {
                e.stopPropagation();

                if (quantity <= 1) {
                  setQuantity(0);

                  // remove from orders
                  removeMealFromOrders(product.ProductId)
                } else {
                  setQuantity((q) => q - 1);

                  setSingleMealQuantity(meal, "minus");
                }
              }}
            >
              {quantity === 1 ? <Trashcan /> : <>&#8722;</>}
              
            </button>
            <span className={`fontSF ${styles.productQuantity}`}>{meal.quantity}</span>
            <button
              className={styles.productBtn}
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((quan) => quan + 1);

                setSingleMealQuantity(meal, "plus");
              }}
            >
              &#43;
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MealCard;
