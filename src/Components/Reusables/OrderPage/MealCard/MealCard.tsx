import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import CheckAvailability from "../../../../Query/CheckAvailability";
import { Product, SingleMealType, ThemeType } from "../../../../Types/Types";
import Plus from "../../SVG/Plus";
import Trashcan from "../../SVG/Trashcan";
import styles from "./MealCardStyles.module.css";

type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
};

const MealCard = ({ product, theme }: MealCardPropsType) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const { mutateAsync } = useMutation({
    mutationFn: CheckAvailability,
  });

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

  const handleCheckAvailability = async () => {
    try {
      const availability = await mutateAsync(product.ProductId);

      setIsAvailable(availability);
      return availability;
    } catch (error) {
      console.error("Error checking availability:", error);
      return null;
    }
  };

  return (
    <motion.div
      id="productCard"
      animate={{
        scale: isMealPlacedInOrders && isAvailable ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={styles.card}
      style={{
        color: theme.textColor,
        border:
          isMealPlacedInOrders && isAvailable
            ? `1px solid ${theme.activeTextColor}`
            : "",
        backgroundColor:
          isAvailable === false && isAvailable !== undefined
            ? "#d7d7d7"
            : isMealPlacedInOrders
            ? `${theme.activeTextColor}60`
            : "white",
      }}
    >
      {isAvailable === false && isAvailable !== undefined && (
        <motion.p
          initial={{ x: "-100px" }}
          animate={{ x: 0 }}
          exit={{ x: "100vw" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`fontSF ${styles.outOfStock}`}
        >
          Out of Stock
        </motion.p>
      )}

      <div className={styles.imgWrapper}>
        <img
          className={styles.productImage}
          src={`${product.SmallPictureUrl}`}
          alt={product.Name.substring(0, 5)}
          loading="lazy"
          style={{
            filter:
              isAvailable === false && isAvailable !== undefined
                ? `blur(2px)`
                : "",
          }}
        />

        {/* MEAL INFO TRIGER */}
        <button
          className={styles.infoBtn}
          onClick={async (e) => {
            const availability = await handleCheckAvailability();

            e.stopPropagation();
            handleSetMealForInfo(product, availability);
            handleStepChange("mealInfo");
          }}
        >
          <b style={{ fontSize: "2vw" }}>i</b>
        </button>
      </div>

      <p
        className={`fontSF ${styles.productNameHeading}`}
        style={{
          filter:
            isAvailable === false && isAvailable !== undefined
              ? `blur(2px)`
              : "",
        }}
      >
        {product.Name.length > 35
          ? product.Name.substring(0, 30)
          : product.Name}
      </p>

      <p
        className={`fontSF ${styles.productPriceHeading}`}
        style={{
          filter:
            isAvailable === false && isAvailable !== undefined
              ? `blur(2px)`
              : "",
        }}
      >
        {product.Price}
      </p>

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          width: isMealPlacedInOrders && isAvailable ? "100%" : "23%",
          borderTopLeftRadius:
            isMealPlacedInOrders && isAvailable ? "0" : "16px",
          padding: isMealPlacedInOrders && isAvailable ? "0 3vw" : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: isAvailable ? theme.activeTextColor : "inherit",
          color: theme.textColor,
          justifyContent:
            isMealPlacedInOrders && isAvailable ? "space-between" : "center",
          padding: isMealPlacedInOrders && isAvailable ? "0 3vw" : 0,
          width: isMealPlacedInOrders && isAvailable ? "100%" : "23%",
        }}
        className={styles.productBtnsWrapper}
      >
        {!isMealPlacedInOrders && isAvailable && (
          <button
            className={styles.productBtn}
            style={{
              borderTopLeftRadius:
                isMealPlacedInOrders && isAvailable ? "0" : "16px",
            }}
            onClick={async () => {
              setQuantity((q) => q + 1);

              const availability = await handleCheckAvailability();

              if (product.NoInteraction) {
                handleSetMealForInfo(product, availability);
                handleStepChange("mealInfo");
              } else {

                if (!availability) {
                  return;
                }

                if (product.HasUpsaleCollection && !isMealPlacedInOrders) {

                  setMeal(product);
                  handleStepChange("menuUpgrade");

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
              }
            }}
          >
            {product.NoInteraction ? (
              <b style={{ color: "white" }}>i</b>
            ) : (
              <Plus />
            )}
          </button>
        )}

        {isMealPlacedInOrders && isAvailable && (
          <>
            <button
              className={styles.productBtn}
              onClick={(e) => {
                e.stopPropagation();

                if (quantity <= 1) {
                  setQuantity(1);

                  // remove from orders
                  removeMealFromOrders(product.ProductId);
                } else {
                  setQuantity((q) => q - 1);

                  setSingleMealQuantity(meal, "minus");
                }
              }}
            >
              {quantity === 1 ? <Trashcan /> : <>&#8722;</>}
            </button>
            <span className={`fontSF ${styles.productQuantity}`}>
              {meal.quantity}
            </span>
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
