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
import { useTranslation } from "react-i18next";

type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
};

const MealCard = ({ product, theme }: MealCardPropsType) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const {t} = useTranslation()

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
    orders.find((meal) => meal.product?.ProductId === product.ProductId)
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


  const isPlacedInOrder_Available_NoUpsale = (isMealPlacedInOrders && isAvailable) && !product.HasUpsaleCollection
  const notPlacedInOrders_Available_OR_isPlacedInOrders_But_HasUpsale = ((!isMealPlacedInOrders && isAvailable) || isMealPlacedInOrders && isAvailable && product.HasUpsaleCollection)
  const hasUpsale_notPlacedInOrders = product.HasUpsaleCollection && !isMealPlacedInOrders
  const isPlacedInOrders_Available_hasUpsale = isMealPlacedInOrders && isAvailable && product.HasUpsaleCollection
  
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
          {t("out_of_stock")}
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
                ? `opacity(0.5)`
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
                ? `opacity(0.5)`
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
                ? `opacity(0.5)`
                : "",
        }}
      >
        {product.Price}
      </p>

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          width: isPlacedInOrder_Available_NoUpsale ? "100%" : "23%",
          borderTopLeftRadius:
          isPlacedInOrder_Available_NoUpsale ? "0" : "16px",
          padding: isMealPlacedInOrders && isAvailable ? "0 3vw" : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: isAvailable ? theme.activeTextColor : "inherit",
          color: theme.textColor,
          justifyContent:
          isPlacedInOrder_Available_NoUpsale ? "space-between" : "center",
          padding: isPlacedInOrder_Available_NoUpsale ? "0 3vw" : 0,
          width: isPlacedInOrder_Available_NoUpsale ? "100%" : "23%",
        }}
        className={styles.productBtnsWrapper}
      >
        {notPlacedInOrders_Available_OR_isPlacedInOrders_But_HasUpsale && (
          <button
            className={styles.productBtn}
            style={{
              borderTopLeftRadius:
                (isMealPlacedInOrders && isAvailable) && !product.HasUpsaleCollection ? "0" : "16px",
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

                if (hasUpsale_notPlacedInOrders) {

                  setMeal(product);
                  handleStepChange("menuUpgrade");

                }else if(isPlacedInOrders_Available_hasUpsale){

                  //OVA E CASE-OT ZA DOKOLKU IMA UPSALE A PRETHODNO E STAVEN VO ORDERS

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


        {/* {   QUANTITY   } */}
      {(isMealPlacedInOrders && isAvailable) && !product.HasUpsaleCollection && (
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
