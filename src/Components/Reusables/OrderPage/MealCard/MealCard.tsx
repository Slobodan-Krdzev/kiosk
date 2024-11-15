import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import { Product, ThemeType } from "../../../../Types/Types";
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
        scale: isSelected ? 1.03 : 1,
        backgroundColor:
          isSelected || isMealPlacedInOrders
            ? `${theme.activeTextColor}60`
            : "white",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={styles.card}
      style={{
        border: isSelected ? `1px solid ${theme.activeTextColor}` : "",
      }}
      onClick={() => {
        // const wrapperDiv = e.target as HTMLDivElement
        setIsSelected(!isSelected);

        if (!isSelected) {
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
        } else {
          removeMealFromOrders(product.ProductId);
        }
      }}
    >
      

      <div className={styles.imgWrapper}>
        <img
          className={styles.productImage}
          src={`${product.SmallPictureUrl}`}
          alt={product.Name}
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
        &#8505;
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
      <p className={`fontSF ${styles.productNameHeading}`}>{product.Name.length > 35 ? product.Name.substring(0, 30) : product.Name}</p>

      <p  className={`fontSF ${styles.productPriceHeading}`}>
        {product.Price} {product.PriceValue}
      </p>

      {/* 

      {!isSelected && (
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
        
          &#43;
        </button>
      )} */}

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          width: isSelected ? "74px" : "50px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: theme.activeTextColor,
          color: theme.textColor,
          justifyContent: isSelected ? "center" : "center",
        }}
        className={styles.productBtnsWrapper}
      >
        {!isSelected && (
          <button
            className={styles.productBtn}
            onClick={() => {
              setIsSelected(true);
              setQuantity((q) => q + 1);

              if (!isSelected) {
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

        {isSelected && (
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
