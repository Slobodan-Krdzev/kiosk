import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import CheckoutCard from "../../Reusables/CheckoutPage/CheckoutCard";
import UpgradeBottomRibbon from "../../Reusables/UpgradeBottomRibbon/UpgradeBottomRibbon";
import styles from "./CheckoutStyles.module.css";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { handleStepChange, handleOrderNote, finalInfo } = useContext(StepContext);
  const { orders } = useContext(OrderContext);
  const { theme } = useContext(DataContext);
  const { t } = useTranslation();

  const orderNoteInput = useRef<HTMLInputElement | null>(null);

  // const [isModalShown, setIsModalShown] = useState(false);
  const [isRibbonShown, setIsRibbonShown] = useState(true);

  const hideShowRibbon = (value: boolean) => {
    setIsRibbonShown(value);
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
      <p className={`fontSF biggerPageTitles`}>{t("my_order")}</p>

      <div className={`hideScrollBar ${styles.checkoutCardWrapper}`}>
        {orders.map((product) => (
          <CheckoutCard
            key={product.product!.ProductId}
            order={product}
            theme={theme}
            hideShowRibbon={hideShowRibbon}
          />
        ))}

        <form
          className={`formStyles ${styles.inputField}`}
          onSubmit={(e) => {
            e.preventDefault();
            hideShowRibbon(true);

            // OVDE SE DODAVA FULL ORDER NOTE
            handleOrderNote(orderNoteInput.current!.value);
            e.currentTarget.reset();
          }}
        >
          <label htmlFor="orderNoteInput" className="noteLabel fontSF">
            {t("order_note")}
          </label>

          <div style={{display: "flex"}}>
            <input
              ref={orderNoteInput}
              style={{ borderColor: theme.activeTextColor, width: '80%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              type="text"
              id="orderNoteInput"
              required
              className="noteInput"
              placeholder={finalInfo.orderNote !== "" ? finalInfo.orderNote : `${t("add_note")}`}
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
              }}
            >
              {finalInfo.orderNote !== "" ? `${t("edit_note")}`: `${t("done")}`}
            </button>
          </div>
        </form>
      </div>

      {isRibbonShown && (
        <div className={`bottomRibbon`}>
          <UpgradeBottomRibbon
            nextText={t("place_order")}
            backText={t("back_to_menu")}
            backStep={"order"}
            nextStep={"preview"}
            disableNextBtn={false}
            nextAction={() => {
              handleStepChange("preview");
            }}
          />
        </div>
      )}

      {/* OVA STOESHE ZA CANCEL ORDER CONFIRM AMA VEKJE NEMAME  */}
      {/* {isModalShown && (
        <Modal>
          <div
            className="modalInnerWrapper "
            style={{ borderColor: theme.activeTextColor }}
          >
            <p className="pageTitleHeading fontRaleway">Cancel Order?</p>
            <div className="modalBtnWrapper ">
              <button
                className="fontRaleway"
                style={{ backgroundColor: theme.activeTextColor }}
                onClick={() => {
                  handleStepChange("start");
                  cancelOrder();
                }}
              >
                Yes
              </button>

              <button
                className="fontRaleway"
                style={{ borderColor: theme.activeTextColor }}
                onClick={() => {
                  setIsModalShown(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )} */}
    </motion.section>
  );
};

export default Checkout;
