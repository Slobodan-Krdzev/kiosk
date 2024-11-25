import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Product,ThemeType } from "../../../../Types/Types";
import styles from "./MealCardStyles.module.css";

type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
};

const MealCard = ({ product, theme }: MealCardPropsType) => {
  const { handleStepChange, handleSetMealForInfo } = useContext(StepContext);
  const { placeMealInOrders, removeMealFromOrders, orders } =
    useContext(OrderContext);
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isMealPlacedInOrders = Boolean(
    orders.find((meal) => meal.id === product.ProductId)
  );

  return (
    <motion.div
      id="productCard"
      animate={{
        scale: isMealPlacedInOrders ? 1.03 : 1,
        backgroundColor:
          isMealPlacedInOrders
            ? `${theme.activeTextColor}60`
            : "white",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={styles.card}
      style={{
        border: isMealPlacedInOrders ? `1px solid ${theme.activeTextColor}` : "",
      }}
      onClick={() => {

        if (isMealPlacedInOrders) {

          removeMealFromOrders(product.ProductId);

        } else {
          setQuantity(1);
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
            quantity: quantity,
            note: "",
          });
        }

        setIsSelected(!isSelected);
      }}
    >
      <div className={styles.imgWrapper}>
        <img
          className={styles.productImage}
          src={`${product.SmallPictureUrl}`}
          alt={product.Name.substring(0,5)}
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
          {/* &#8505; */}
          <b>i</b>
        </button>
      </div>

      {/* <motion.p
        animate={{
          x: isSelected ? ["100%", "-100%"] : 0,
        }}
        transition={{
          duration: isSelected ? 5 : 0,
          ease: "linear",
          repeat: isSelected ? Infinity : 0,
        }}
        className={`fontSF ${styles.productNameHeading}`}
      >
        {isSelected ? product.Name : `${product.Name.substring(0, 12)}...`}
      </motion.p> */}
      <p className={`fontSF ${styles.productNameHeading}`}>
        {product.Name.length > 35
          ? product.Name.substring(0, 30)
          : product.Name}
      </p>

      <p className={`fontSF ${styles.productPriceHeading}`}>
        {product.Price} {product.PriceValue}
      </p>

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          width: isMealPlacedInOrders ? "74px" : "50px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: theme.activeTextColor,
          color: theme.textColor,
          justifyContent: isMealPlacedInOrders ? "center" : "center",
        }}
        className={styles.productBtnsWrapper}
      >
        {!isMealPlacedInOrders && (
          <button
            className={styles.productBtn}
            onClick={() => {
              setIsSelected(true);
              setQuantity((q) => q + 1);

              if (!isMealPlacedInOrders) {
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
                  note: "",
                });
              }
            }}
          >
            &#43;
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
                } else {
                  setQuantity((q) => q - 1);
                }
              }}
            >
              &#8722;
            </button>
            <span className={styles.productQuantity}>{quantity}</span>
            <button
              className={styles.productBtn}
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((quan) => quan + 1);
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
