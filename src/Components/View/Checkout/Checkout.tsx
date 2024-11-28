import { motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import CheckoutCard from "../../Reusables/CheckoutPage/CheckoutCard";
import UpgradeBottomRibbon from "../../Reusables/UpgradeBottomRibbon/UpgradeBottomRibbon";
import styles from "./CheckoutStyles.module.css";

const Checkout = () => {
  const { handleStepChange, handleOrderNote } = useContext(StepContext);
  const { orders } = useContext(OrderContext);
  const { theme } = useContext(DataContext);

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
      <p className={`fontSF biggerPageTitles`}>MY ORDER</p>

      <div className={`hideScrollBar ${styles.checkoutCardWrapper}`}>
        {orders.map((product) => (
          <CheckoutCard
            key={product.product!.ProductId}
            order={product}
            theme={theme}
            ordersLength={orders.length}
            hideShowRibbon={hideShowRibbon}
          />
        ))}

        <form
          className="formStyles"
          onSubmit={(e) => {
            e.preventDefault();
            hideShowRibbon(true);

            // OVDE SE DODAVA FULL ORDER NOTE
            handleOrderNote(orderNoteInput.current!.value);
            e.currentTarget.reset();
          }}
        >
          <label htmlFor="orderNoteInput" className="noteLabel fontSF">
            Do you want to leave a note for your order?
          </label>

          <input
            ref={orderNoteInput}
            style={{ borderColor: theme.activeTextColor }}
            type="text"
            id="orderNoteInput"
            required
            className="noteInput"
            onFocus={() => {
              hideShowRibbon(false);
            }}
            onBlur={() => {
              hideShowRibbon(true);
            }}
          />
        </form>
      </div>

      {isRibbonShown && (
        <div className={`${styles.bottomRibbon}`}>
          <UpgradeBottomRibbon
            nextText="Place Order"
            backText="Back to Menu"
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
