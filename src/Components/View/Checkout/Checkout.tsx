import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import CheckoutCard from "../../Reusables/CheckoutPage/CheckoutCard";
import UpgradeBottomRibbon from "../../Reusables/UpgradeBottomRibbon/UpgradeBottomRibbon";
import styles from "./CheckoutStyles.module.css";
import { useTranslation } from "react-i18next";
import { Item, SendOrderType } from "../../../Types/SendOrderTypes";
import { useSendOrder } from "../../../Query/SendOrder";
import Pencil from "../../Reusables/SVG/Pencil";

const Checkout = () => {
  const { handleStepChange, handleOrderNote, finalInfo } =
    useContext(StepContext);
  const { orders, getOrderTotal } = useContext(OrderContext);
  const { theme, data } = useContext(DataContext);
  const { t } = useTranslation();
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(true);

  const orderNoteInput = useRef<HTMLInputElement | null>(null);

  const [isRibbonShown, setIsRibbonShown] = useState(true);

  const hideShowRibbon = (value: boolean) => {
    setIsRibbonShown(value);
  };

  const { mutate } = useSendOrder();

  const formulateMealsForPostRequest = () => {
    const formulatedOrders: Item[] = orders.map((order) => {
      if (order.upsale) {
        return {
          Item: {
            Id: order!.product!.ProductId,
            PluCode: "",
            Image: order!.product!.SmallPictureUrl,
            Name: order!.product!.Name,
            Price: order!.product!.Price,
          },
          Variants: [],
          UpsaleCollection: order.upsale.flatMap((upsale) =>
            upsale.stepData.map((stepData) => ({
              UpsaleStepOptionModel: {
                ProductId: stepData.option.ProductId as number,
                Name: stepData.option.Name,
                Price: stepData.option.Price,
              },
              Quantity: stepData.quantity,
            }))
          ),
          Quantity: order.quantity,
          ItemGuid: "",
          CoursePosition: 0,
          Note: order.note,
        };
      } else {
        return {
          Item: {
            Id: order.product!.ProductId,
            PluCode: "",
            Image: order.product!.SmallPictureUrl,
            Name: order.product!.Name,
            Price: order.product!.Price,
          },
          Variants: [],
          UpsaleCollection: [],
          Quantity: order.quantity,
          ItemGuid: "",
          CoursePosition: 0,
          Note: order.note,
        };
      }
    });

    return formulatedOrders;
  };

  const handleSendOrder = () => {
    const orderData: SendOrderType = {
      Order: {
        OrderGuid: "",
        SessionGuid: "",
        Items: formulateMealsForPostRequest(),
      },
      tableNumber: "308",
      deviceSessionId: "",
    };

    mutate(orderData);
  };

  return (
    <motion.section
      className={`fullScreenTablet`}
      key={"checkout"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={styles.titleWrapper}>
        <p className={`fontSF biggerPageTitles`}>{t("my_order")}</p>
        <p
          className={`fontSF paymentPagesSubtitle ${styles.total}`}
          style={{ borderColor: theme.activeTextColor }}
        >
          {t("total")}: {getOrderTotal()}{" "}
          {data.ThemeResponse.CurrencySettings.CurrencySymbol}
        </p>
      </div>

      <div className={`hideScrollBar ${styles.checkoutCardWrapper}`}>
        {orders.map((product) => (
          <CheckoutCard
            key={product.id}
            order={product}
            theme={theme}
            data={data}
            hideShowRibbon={hideShowRibbon}
          />
        ))}

        {!isOrderFormVisible && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.orderNotePreviewWrapper}
            style={{borderColor: theme.activeTextColor}}
          >
            <p className="fontSF" style={{ fontSize: "2.6vw"}}>
              {t("note")}: {finalInfo.orderNote}
            </p>

            <button className={styles.orderNoteEditBtn} onClick={() => setIsOrderFormVisible(true)}>
              <Pencil color={theme.activeTextColor}/>
            </button>
          </motion.div>
        )}

        {isOrderFormVisible && (
          <motion.form
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`formStyles ${styles.inputField}`}
            onSubmit={(e) => {
              e.preventDefault();
              hideShowRibbon(true);

              setIsOrderFormVisible(false);
              // OVDE SE DODAVA FULL ORDER NOTE
              handleOrderNote(orderNoteInput.current!.value ?? "No Note");
              e.currentTarget.reset();
            }}
          >
            <label htmlFor="orderNoteInput" className="noteLabel fontSF">
              {t("order_note")}
            </label>

            <div style={{ display: "flex" }}>
              <input
                ref={orderNoteInput}
                style={{
                  borderColor: theme.activeTextColor,
                  width: "80%",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                type="text"
                id="orderNoteInput"
                required
                className="noteInput"
                placeholder={
                  finalInfo.orderNote !== ""
                    ? finalInfo.orderNote
                    : `${t("add_note")}`
                }
                onFocus={() => {
                  hideShowRibbon(false);
                }}
                onBlur={() => {
                  hideShowRibbon(true);
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
                {finalInfo.orderNote !== ""
                  ? `${t("edit_note")}`
                  : `${t("done")}`}
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {isRibbonShown && (
        <div className={`bottomRibbon`}>
          <UpgradeBottomRibbon
            nextText={t("place_order")}
            backText={t("back_to_menu")}
            backStep={"order"}
            nextStep={"payment"}
            disableNextBtn={false}
            nextAction={() => {
              handleSendOrder();
              handleStepChange("payment");
            }}
          />
        </div>
      )}
    </motion.section>
  );
};

export default Checkout;
