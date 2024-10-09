import { useContext, useState } from "react";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import CheckoutCard from "../../Reusables/CheckoutPage/CheckoutCard";
import Modal from "../../Reusables/Modal";
import UpgradeBottomRibbon from "../../Reusables/UpgradeBottomRibbon";
import styles from "./CheckoutStyles.module.css";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";

const Checkout = () => {
  const { handleStepChange } = useContext(StepContext);
  const { orders, cancelOrder } = useContext(OrderContext);
  const { theme } = useContext(DataContext);

  const [isModalShown, setIsModalShown] = useState(false);

  console.log("====================================");
  console.log("ORDERS", orders);
  console.log("====================================");

  return (
    <section className={styles.checkoutView}>
      <div className={styles.topWrapper}>
        <p className="bottomRibbonHeadingBig fontRaleway">MY ORDER</p>
        <p
          className="mediumSizeDimmedHeading fontRaleway"
          color={theme.textColor}
        >
          Dine in
        </p>
      </div>

      <div className={styles.checkoutCardWrapper}>
        {orders.map((product) => (
          <CheckoutCard
            key={product.product!.ProductId}
            order={product}
            theme={theme}
          />
        ))}
      </div>

      <UpgradeBottomRibbon>
        <div style={{ width: "100%" }}>
          <button
            style={{
              borderColor: theme.activeTextColor,
            }}
            className="bottomRibbonDefaultBtn"
            onClick={() => {
              setIsModalShown(true);
            }}
          >
            Cancel Order
          </button>
          <button
            className="bottomRibbonDefaultBtn"
            style={{ backgroundColor: theme.activeTextColor }}
            onClick={() => {
              handleStepChange("order");
            }}
          >
            Add Meal
          </button>
          <button
            style={{ backgroundColor: theme.activeTextColor }}
            className="bottomRibbonDefaultBtn"
            onClick={() => {
              handleStepChange("payment");
            }}
          >
            Checkout
          </button>
        </div>
      </UpgradeBottomRibbon>

      {isModalShown && (
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
      )}
    </section>
  );
};

export default Checkout;
