import { useContext, useState } from "react";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import CheckoutCard from "../Reusables/CheckoutCard";
import Modal from "../Reusables/Modal";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";

const Checkout = () => {
  const { handleStepChange } = useContext(StepContext);
  const { orders, cancelOrder } = useContext(OrderContext);

  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <section className="fullScreen">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "0 auto",
          padding: "2rem 0",
        }}
      >
        <p style={{ fontSize: "46px", lineHeight: "54px", fontWeight: 700 }}>
          MY ORDER
        </p>
        <p
          style={{
            fontSize: "36px",
            lineHeight: "42.26px",
            fontWeight: 400,
            color: "#575559",
          }}
        >
          Dine in
        </p>
      </div>

      <div style={{ width: "95%", margin: "0 auto" }}>
        {orders.map((item) => (
          <CheckoutCard key={item.id} order={item} />
        ))}
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button
            className="cancelBtn"
            onClick={() => {
              setIsModalShown(true);
            }}
          >
            Cancel Order
          </button>
          <button className="cancelBtn nextBtn" onClick={() => {
            handleStepChange('order')
          }}>Add Meal</button>
          <button
            className="cancelBtn nextBtn"
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
          <div className="modalInnerWrapper">
            <p>Cancel Order?</p>
            <div className="modalBtnWrapper">
              <button
                onClick={() => {
                  handleStepChange("start");
                  cancelOrder();
                }}
              >
                Yes
              </button>

              <button
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
