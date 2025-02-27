import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../Contexts/StepContext/StepContext";
import CheckAvailability from "../../../../Query/CheckAvailability";
import { Product, SingleMealType, ThemeType } from "../../../../Types/Types";
import Plus from "../../SVG/Plus";
import Trashcan from "../../SVG/Trashcan";
import styles from "./MealCardStyles.module.css";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
// import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import Info from "../../SVG/Info";
import PricePreviewer from "../../PricePreviewer/PricePreviewer";
import Minus from "../../SVG/Minus";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import Modal from "../../Modal";

type MealCardPropsType = {
  product: Product;
  theme: ThemeType;
  removeOutOfStockProduct: (id: number) => void;
};

const MealCard = ({
  product,
  theme,
  removeOutOfStockProduct,
}: MealCardPropsType) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(!product.OutOfStock);
  const { t } = useTranslation();

  const { mutateAsync } = useMutation({
    mutationFn: CheckAvailability,
  });

  const { handleStepChange, handleSetMealForInfo, isTestMode } =
    useContext(StepContext);
  const {
    placeMealInOrders,
    setMeal,
    removeMealFromOrders,
    orders,
    setSingleMealQuantity,
  } = useContext(OrderContext);
  const { data } = useContext(DataContext);

  const [quantity, setQuantity] = useState(1);
  const [isButtonOpened, setIsButtonOpened] = useState(false);
  const [upsaleMessage, setUpsaleMessage] = useState(false);

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

  const addMoreBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setQuantity((prevQuantity) => prevQuantity + 1);
    setIsButtonOpened(true);

    e.stopPropagation();
    setQuantity((quan) => quan + 1);

    setSingleMealQuantity(meal, "plus");
  };

  const takeOutBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (meal.quantity <= 1) {
      setQuantity(1);
      setIsButtonOpened(false);

      removeMealFromOrders(meal.id);
    } else {
      setQuantity((q) => q - 1);

      setSingleMealQuantity(meal, "minus");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isButtonOpened) setIsButtonOpened(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isButtonOpened, quantity]);

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
      key={product.ProductId}
      className={styles.card}
      initial={{ scale: 1, opacity: 0, y: 20 }}
      animate={{ scale: isMealPlacedInOrders ? 1.02 : 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      onClick={async () => {
        const availability = isTestMode
          ? true
          : await handleCheckAvailability();

        if (product.NoInteraction) {
          handleSetMealForInfo(product, availability);
          handleStepChange("mealInfo");
        } else {
          if (!availability) {
            removeOutOfStockProduct(product.ProductId);

            Swal.fire({
              title: "Out Of Stock",
              text: `Sorry, ${product.Name} is currently out of stock.`,
              icon: "warning",
              confirmButtonText: "OK, I'll get something else.",
              customClass: {
                popup: styles.popup,
              },
              didOpen: () => {
                const btn = document.querySelector(
                  `.swal2-confirm`
                ) as HTMLElement;
                if (btn) btn.style.backgroundColor = theme.activeTextColor;
                btn.style.color = theme.textColor;
              },
            });
          } else if (availability && hasUpsale_notPlacedInOrders) {
            // TUKA PRAVIME PROVERKA I DOKOLKU POSTOI UPSALE NA TMK

            if (!data.TMKData[0].UpsaleColletions.length) {
              console.log("vleguvame vo false");

              setUpsaleMessage(true);
            } else {
              console.log("vleguvame vo true");

              setQuantity((q) => q + 1);
              setIsButtonOpened(true);
              setMeal(product);
              handleStepChange("menuUpgrade");
            }
          } else if (isPlacedInOrders_Available_hasUpsale) {
            //OVA E CASE-OT ZA DOKOLKU IMA UPSALE A PRETHODNO E STAVEN VO ORDERS
            setIsButtonOpened(true);

            setMeal(product);
            handleStepChange("menuUpgrade");
          } else {
            setIsButtonOpened(true);

            if (isMealPlacedInOrders) {
              // removeMealFromOrders(product.ProductId) sadasdasd;
              return;
            } else {
              setIsButtonOpened(true);

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
                itemGUI: undefined,
              });
            }
          }
        }
      }}
      style={{
        backgroundColor: isMealPlacedInOrders
          ? `${theme.activeTextColor}40`
          : "",
        border: isMealPlacedInOrders
          ? `0.5px solid ${theme.activeTextColor} `
          : "0.3px solid #bababa9d",
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

      <div
        className={styles.imgWrapper}
        style={{ backgroundImage: `url(${product.SmallPictureUrl})` }}
      >
        {/* MEAL INFO TRIGER */}
        <button
          className={styles.infoBtn}
          onClick={async (e) => {
            e.stopPropagation();

            const availability = await handleCheckAvailability();

            handleSetMealForInfo(product, isTestMode ? true : availability);
          }}
        >
          <Info />
        </button>
      </div>

      <div className={styles.cardInfoWrapper}>
        <p
          className={styles.productNameHeading}
          style={{
            filter:
              isAvailable === false && isAvailable !== undefined
                ? `opacity(0.5)`
                : "",
          }}
        >
          {product.Name.length > 25
            ? product.Name.substring(0, 30)
            : product.Name}
        </p>
      </div>
      <PricePreviewer
        style={{ position: "absolute", bottom: "5px", left: "15px" }}
        price={product.Price}
        color={theme.activeTextColor}
        fontSizeDecimal={"1.8vw"}
      />
      <motion.div
        id="productCardBtnsWrapper"
        animate={{
          backgroundColor:
            isPlacedInOrder_Available_NoUpsale && isButtonOpened
              ? "#000000"
              : "#F9F9F9",
          width:
            isPlacedInOrder_Available_NoUpsale && isButtonOpened
              ? "96%"
              : "40px",
          minWidth: "40px",
          height: "40px",
          maxWidth: "100%",
          maxHeight: "40px",
          lineHeight: "40px",
          padding: 0,
        }}
        transition={{ type: "spring", duration: 1 }}
        className={styles.cardButtonWrapper}
        style={{
          color: theme.activeTextColor,
          justifyContent:
            isPlacedInOrder_Available_NoUpsale && isButtonOpened
              ? "space-between"
              : "center",
          alignItems: "center",
          borderColor:
            isPlacedInOrder_Available_NoUpsale && isButtonOpened ? "black" : "",
          padding:
            isPlacedInOrder_Available_NoUpsale && isButtonOpened ? "0 3vw" : 0,
          width:
            isPlacedInOrder_Available_NoUpsale && isButtonOpened
              ? "100%"
              : "3.6vh",
          display: "flex",
          cursor: "pointer",
        }}
        onClick={() => {
          if (isButtonOpened) {
            return;
          }

          setIsButtonOpened(true);
          setQuantity(1);
        }}
      >
        {notPlacedInOrders_Available_OR_isPlacedInOrders_But_HasUpsale ? (
          <Plus color={"gray"} />
        ) : !isButtonOpened ? (
          <p>{meal.quantity}</p>
        ) : (
          ""
        )}

        {isMealPlacedInOrders &&
          isAvailable &&
          !product.HasUpsaleCollection &&
          isButtonOpened && (
            <>
              <button
                className={styles.quantityBtns}
                onClick={takeOutBtnHandler}
              >
                {" "}
                {meal.quantity === 1 ? <Trashcan /> : <Minus color="black" />}
              </button>
              <div
                style={{
                  flexBasis: "33.333%",
                  color: "white",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={styles.quantityRender}
              >
                {meal.quantity}
              </div>
              <button
                className={styles.quantityBtns}
                onClick={addMoreBtnHandler}
              >
                {" "}
                <Plus color="black" />{" "}
              </button>
            </>
          )}
      </motion.div>

      {/* <motion.div
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
                style={{ color: "black" }}
              >
                {meal.quantity}
              </span>

              <button
                className={styles.productBtn}
                style={{
                  color: theme.textColor,
                  backgroundColor: theme.activeTextColor,
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
      </motion.div> */}
      {upsaleMessage && (
        <Modal borderColor={"black"}>
          <>
            itemot ima upsale ama na cms ne e setirano UpsaleSteps
            <button
              onClick={() => {
                setUpsaleMessage(false);
                handleStepChange("lang");
              }}
            >
              Close
            </button>
          </>
        </Modal>
      )}
    </motion.div>
  );
};

export default MealCard;
