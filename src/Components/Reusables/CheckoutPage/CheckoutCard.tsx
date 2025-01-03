import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { SingleMealType, ThemeType } from "../../../Types/Types";
import Plus from "../SVG/Plus";
import Trashcan from "../SVG/Trashcan";
import styles from "./CheckoutCardStyles.module.css";

type CheckoutCardPropsType = {
  order: SingleMealType;
  theme: ThemeType;
  hideShowRibbon: (value: boolean) => void;
};

const CheckoutCard = ({
  order,
  theme,
  hideShowRibbon,
}: CheckoutCardPropsType) => {
  const {
    orders,
    setSingleMealQuantity,
    setSingleMealNote,
    removeMealFromOrders,
  } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);

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

  return (
    <div className={styles.checkoutCardNoteInputWrapper}>
      <div className={styles.checkoutCard}>
        {/* TOTAL PRICE */}
        <p className={`${styles.checkoutCardPrice} fontSF`}>
          {order.totalPrice.toFixed(2)}
        </p>

        <img
          src={`${order.product!.SmallPictureUrl}`}
          alt={order.product!.Name}
          className={styles.checkoutCardPicture}
        />

        <div className={styles.checkoutCardInfoWrapper}>
          <p className={`${styles.checkoutCardMealName} fontSF`}>
            {order.product!.Name.length > 35
              ? `${order.product!.Name.substring(0, 35)}...`
              : order.product!.Name}
          </p>

          <div className={styles.mealInfoWrapper}>
            {order.upsale && order.upsale![2].stepData && (
              <p className={`${styles.checkoutCardExtrasText} fontSF`}>
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
              <p className={`${styles.checkoutCardExtrasText} fontSF`}>
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
              <p className={`${styles.checkoutCardExtrasText} fontSF`}>
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
          </div>

          {order.note !== "" && (
            <p className={`${styles.checkoutCardExtrasText} fontSF`}>
              {t("note")}: {order.note}
            </p>
          )}
        </div>

        {!isProductNoteInputVisible && (
          <motion.button
            initial={{ y: "60%" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fontSF ${styles.addNoteBtn}`}
            onClick={() => {
              setIsProductNoteInputVisible(true);
            }}
          >
            {/* <Plus /> {order.note === "" ? `${t("add_note")}` : `${t("edit_note")}`} */}
            <Plus color={"black"} />{" "}
            {order.note === "" ? `Add Note` : `Edit Note`}
          </motion.button>
        )}

        {isProductNoteInputVisible && (
          <motion.form
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
                className={`${styles.productNoteInput} noteInput`}
                required
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.currentTarget.value);
                }}
              />

              <button
                type="submit"
                className={`submitBtn fontSF`}
                style={{
                  backgroundColor: theme.activeTextColor,
                  borderColor: theme.activeTextColor,
                  width: "22%",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  color: theme.textColor,
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`${styles.checkoutCardQuantityWrapper} fontSF`}
            style={{
              backgroundColor: theme.textColor,
              color: theme.activeTextColor,
            }}
          >
            <button
              className={styles.quantityWrapperBtns}
              style={{
                height: "100%",
                width: "33.33%",
                borderTopLeftRadius: "4vw",
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
              {quantity === 1 ? (
                <Trashcan />
              ) : (
                <span style={{ color: theme.activeTextColor }}>&#8722;</span>
              )}
            </button>
            <p className={styles.quantityCounter} style={{ width: "33.33%" }}>
              {quantity}
            </p>
            <button
              className={styles.quantityWrapperBtns}
              style={{
                height: "100%",
                width: "33.33%",
                backgroundColor: theme.textColor,
                color: theme.activeTextColor,
              }}
              onClick={() => {
                setQuantity((quantity) => quantity + 1);
                setSingleMealQuantity(order, "plus");
              }}
            >
              <span style={{}}>&#43;</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutCard;