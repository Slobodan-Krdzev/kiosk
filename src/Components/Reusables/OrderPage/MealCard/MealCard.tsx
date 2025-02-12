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
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";


type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
  removeOutOfStockProduct: (id: number) => void
};

const MealCard = ({ product, theme, removeOutOfStockProduct }: MealCardPropsType) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(!product.OutOfStock);
  const {data} = useContext(DataContext)
  const { t } = useTranslation();

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

  const isPlacedInOrder_Available_NoUpsale =
    isMealPlacedInOrders && isAvailable && !product.HasUpsaleCollection;
  const notPlacedInOrders_Available_OR_isPlacedInOrders_But_HasUpsale =
    (!isMealPlacedInOrders && isAvailable) ||
    (isMealPlacedInOrders && isAvailable && product.HasUpsaleCollection);
  const hasUpsale_notPlacedInOrders =
    product.HasUpsaleCollection && !isMealPlacedInOrders;
  const isPlacedInOrders_Available_hasUpsale =
    isMealPlacedInOrders && isAvailable && product.HasUpsaleCollection;
 
  return (
    <motion.div
      className={styles.card}
      initial={{ scale: 1 }}
      animate={{ scale: isMealPlacedInOrders ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
      onClick={async () => {

        const availability = await handleCheckAvailability();

        if (product.NoInteraction) {
          handleSetMealForInfo(product, availability);
          handleStepChange("mealInfo");
        } else {
          if (!availability) {
            removeOutOfStockProduct(product.ProductId)

            Swal.fire({
              title: "Out Of Stock",
              text: `Sorry, ${
                product.Name
              } is currently out of stock.`,
              icon: "warning",
              confirmButtonText: "OK, I'll get something else.",
              customClass: {
                popup: styles.popup,
              },
              didOpen: () => {
               const btn =  document.querySelector(`.swal2-confirm`) as HTMLElement
               if(btn) btn.style.backgroundColor = theme.activeTextColor
               btn.style.color = theme.textColor
              }
            });
          }else if (availability && hasUpsale_notPlacedInOrders) {
            setQuantity((q) => q + 1);

            setMeal(product);
            handleStepChange("menuUpgrade");
          } else if (isPlacedInOrders_Available_hasUpsale) {
            //OVA E CASE-OT ZA DOKOLKU IMA UPSALE A PRETHODNO E STAVEN VO ORDERS

            setMeal(product);
            handleStepChange("menuUpgrade");
          } else {
            if (isMealPlacedInOrders) {
              // removeMealFromOrders(product.ProductId);
              return
            } else {
              setQuantity(1);
              placeMealInOrders({
                id: new Date().valueOf(),
                product: product,
                image: product.SmallPictureUrl,
                upsale: undefined,
                originalTotal: product.Price,
                totalPrice: product.Price,
                quantity: quantity,
                note: "",
                itemGUI: undefined
              });
            }
          }
        }
      }}
      style={{
        backgroundColor: isMealPlacedInOrders ? `${theme.activeTextColor}27` : '',
        border: isMealPlacedInOrders ? `0.5px solid ${theme.activeTextColor} `: "",
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
            e.stopPropagation();

            const availability = await handleCheckAvailability();

            handleSetMealForInfo(product, availability);
            handleStepChange("mealInfo");
          }}
        >
          <b className={styles.infoBtnText}>i</b>
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
        {product.Price} {data.ThemeResponse.CurrencySettings.CurrencySymbol}
      </p>

      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          backgroundColor: "inherit",
          width: isPlacedInOrder_Available_NoUpsale ? "100%" : "58px",
          borderTopLeftRadius: isPlacedInOrder_Available_NoUpsale
            ? "0"
            : "16px",
          padding: 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          color: theme.textColor,
          justifyContent: isPlacedInOrder_Available_NoUpsale
            ? "space-between"
            : "center",
          padding: isPlacedInOrder_Available_NoUpsale ? "0 3vw" : 0,
          width: isPlacedInOrder_Available_NoUpsale ? "100%" : "23%",
        }}
        className={styles.productBtnsWrapper}
      >
        {notPlacedInOrders_Available_OR_isPlacedInOrders_But_HasUpsale && (
          <button
            className={styles.productBtn}
            style={{
              backgroundColor: isAvailable ? theme.activeTextColor : "inherit",
              width: "100%",
              color: theme.textColor,
              borderTopLeftRadius:
                isMealPlacedInOrders &&
                isAvailable &&
                !product.HasUpsaleCollection
                  ? "0"
                  : "16px",
            }}
          >
            {product.NoInteraction ? (
              <b style={{ color: "white" }}>i</b>
            ) : (
              <Plus color={theme.textColor} />
            )}
          </button>
        )}

        {/* {   QUANTITY   } */}
        {isMealPlacedInOrders &&
          isAvailable &&
          !product.HasUpsaleCollection && (
            <>
              <button
                style={{ backgroundColor: theme.activeTextColor }}
                className={styles.productBtn}
                onClick={(e) => {
                  e.stopPropagation();

                  if (quantity <= 1) {
                    setQuantity(1);

                    // remove from orders
                    removeMealFromOrders(meal.id);
                  } else {
                    setQuantity((q) => q - 1);

                    setSingleMealQuantity(meal, "minus");
                  }
                }}
              >
                {quantity === 1 ? (
                  <Trashcan />
                ) : (
                  <span style={{ color: theme.textColor }}>&#8722;</span>
                )}
              </button>

              <span
                className={`fontSF ${styles.productQuantity}`}
                style={{ color:'black' }}
              >
                {meal.quantity}
              </span>

              <button
                className={styles.productBtn}
                style={{
                  color: theme.textColor,
                  backgroundColor: theme.activeTextColor
                }}
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
