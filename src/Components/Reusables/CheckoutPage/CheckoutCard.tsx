import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { RootData, SingleMealType, ThemeType } from "../../../Types/Types";
import Plus from "../SVG/Plus";
import Trashcan from "../SVG/Trashcan";
import styles from "./CheckoutCardStyles.module.css";
import PricePreviewer from "../PricePreviewer/PricePreviewer";
import Minus from "../SVG/Minus";
import { UpsaleContext } from "../../../Contexts/UpsaleContext/UpsaleContext";

type CheckoutCardPropsType = {
  order: SingleMealType; 
  theme: ThemeType;
  data: RootData;
  hideShowRibbon: (value: boolean) => void;
};

const CheckoutCard = ({
  order,
  theme,
  // data,
  hideShowRibbon,
}: CheckoutCardPropsType) => {
  const {
    orders,
    setSingleMealQuantity,
    setSingleMealNote,
    removeMealFromOrders,
    setMeal
  } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);
  const {resetUpsale} = useContext(UpsaleContext)


  const [quantity, setQuantity] = useState(
    order.quantity >= 1 ? order.quantity : 1
  );
  const [isProductNoteInputVisible, setIsProductNoteInputVisible] =
    useState(false);

  const [inputValue, setInputValue] = useState(order.note ?? ("" as string));
  const formRef = useRef<HTMLFormElement>(null);

  const { t } = useTranslation();

  const handleClickToCloseForm = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      setIsProductNoteInputVisible(false);
    }
  };

  useEffect(() => {
    if (isProductNoteInputVisible) {
      document.addEventListener("mousedown", handleClickToCloseForm);
    } else {
      document.removeEventListener("mousedown", handleClickToCloseForm);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickToCloseForm);
  }, [isProductNoteInputVisible]);

  console.log(order)

  return (
    <div className={styles.checkoutCardNoteInputWrapper}>
      <div className={styles.checkoutCard}>
        {/* TOTAL PRICE */}

        <div
          className={styles.checkoutCardPicture}
          style={{
            backgroundImage: `url(${order.product!.SmallPictureUrl})`,
          }}
        ></div>

        <PricePreviewer
          style={{ top: '10px', right: '5%'}}
          price={order.totalPrice}
          color={theme.activeTextColor}
          fontSizeRound={"4.5vw"}
          fontSizeDecimal={"1.8vw"}
        />

        <div className={styles.checkoutCardInfoWrapper}>
          <div className={styles.cardTitlePriceRow}>
            <p className={styles.checkoutCardMealName}>
              {order.product!.Name.length > 35
                ? `${order.product!.Name.substring(0, 35)}...`
                : order.product!.Name}
            </p>
          </div>

          <div className={styles.mealInfoWrapper}>
            {order.upsale && order.upsale![2].stepData && (
              <p className={`${styles.checkoutCardExtrasText}`}>
                {order.upsale![2].stepData.map((i, idx) => (
                  <span key={i.option.Id}>
                    {i.option.Name}{" "}
                    <span style={{ textTransform: "lowercase" }}>
                      {" "}
                      x{i.quantity}
                    </span>{" "}
                    {idx === order!.upsale![2].stepData.length - 1 ? "" : "|"}{" "}
                  </span>
                ))}
              </p>
            )}

            {order.upsale && order.upsale![3].stepData && (
              <p className={`${styles.checkoutCardExtrasText}`}>
                {order.upsale![3].stepData.map((i, idx) => (
                  <span key={i.option.Id}>
                    {i.option.Name}{" "}
                    <span style={{ textTransform: "lowercase" }}>
                      {" "}
                      x{i.quantity}
                    </span>{" "}
                    {idx === order!.upsale![3].stepData.length - 1 ? "" : "|"}{" "}
                  </span>
                ))}
              </p>
            )}

            {order.upsale && order.upsale![4].stepData && (
              <p className={`${styles.checkoutCardExtrasText}`}>
                {order.upsale![4].stepData.map((i, idx) => (
                  <span key={i.option.Id}>
                    {i.option.Name}{" "}
                    <span style={{ textTransform: "lowercase" }}>
                      {" "}
                      x{i.quantity}
                    </span>{" "}
                    {idx === order!.upsale![4].stepData.length - 1 ? "" : "|"}{" "}
                  </span>
                ))}
              </p>
            )}

            {order.note !== "" && (
              <p className={`${styles.checkoutCardExtrasText}`}>
                {t("note")}: {order.note}
              </p>
            )}
          </div>

          <div className={styles.cardNoteBtnsWrapper}>
            {order?.product?.HasUpsaleCollection && !isProductNoteInputVisible && (
              <motion.button
                key={"Edit Note Btn"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={styles.addNoteBtn}
                onClick={() => {

                  // delete product
                  removeMealFromOrders(order.id);

                  // delete upsale
                  resetUpsale()
                  // setMeal

                  setMeal(order.product!)
                  // run thru upsale
                  handleStepChange('menuUpgrade')
                }}
              >
                <Plus color={"#555555a0"} /> Edit
              </motion.button>
            )}

            {!isProductNoteInputVisible && (
              <motion.button
                key={"Add Note Btn"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={styles.addNoteBtn}
                onClick={() => {
                  setIsProductNoteInputVisible(true);
                }}
              >
                <Plus color={"#555555a0"} /> Add
              </motion.button>
            )}

            {isProductNoteInputVisible && (
              <motion.form
                key={"noteForm"}
                ref={formRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`formStyles ${styles.productNoteForm}`}
                onSubmit={(e) => {
                  e.preventDefault();

                  setSingleMealNote(inputValue ?? "", order);
                  setIsProductNoteInputVisible(false);
                  hideShowRibbon(true);
                  e.currentTarget.reset();
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="note"
                    type="text"
                    style={{
                      borderColor: theme.activeTextColor,
                      width: inputValue.length > 4 ? "83%" : "100%",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    className="defInput"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.currentTarget.value);
                    }}
                  />

                  <button
                    type="submit"
                    className={`defSubmitFormBtn`}
                    style={{
                      backgroundColor: theme.activeTextColor,
                      borderColor: theme.activeTextColor,
                      width: "22%",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      color: "white",
                    }}
                  >
                    {order.note ? "Edit" : "Done"}
                  </button>
                </div>
              </motion.form>
            )}

            {/* BUTTONS */}
            {!isProductNoteInputVisible && (
              <motion.div
                key={"buttons"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#000000",
                  flexBasis: "55%",
                  borderRadius: "50px",
                  border: "1px solid #525252",
                }}
              >
                <button
                  style={{
                    flexBasis: "33.3333%",
                    height: "100%",
                    borderRadius: "inherit",
                    border: "none",
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    if (quantity === 1) {
                      if (orders.length === 1) {
                        handleStepChange("order");
                      }

                      setQuantity(1);
                      removeMealFromOrders(order.id);
                    } else {
                      setQuantity((quantity) => quantity - 1);
                      setSingleMealQuantity(order, "minus");
                    }
                  }}
                >
                  {quantity === 1 ? <Trashcan /> : <Minus color="black" />}
                </button>
                <p
                className={styles.orderQuantity}>
                  {order.quantity}
                </p>
                <button
                  style={{
                    flexBasis: "33.333%",
                    height: "100%",
                    borderRadius: "inherit",
                    border: "none",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setQuantity((quantity) => quantity + 1);
                    setSingleMealQuantity(order, "plus");
                  }}
                >
                  <Plus color="black" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
