import { useContext } from "react";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import OrderInfoCard from "../../Reusables/PaymentPage/OrderInfoCard";
import styles from "./PaymentStyles.module.css";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import Elipse from "../../Reusables/Elipse/Elipse";

const Payment = () => {
  const { orders, getOrderTotal } = useContext(OrderContext);
  const { handleStepChange, setFinalOrderDetails } = useContext(StepContext);
  const { theme } = useContext(DataContext);

  console.log("ORDERS FROM PAYMENT", orders);

  return (
    <section className={styles.paymentView}>
      <p className="bottomRibbonHeadingBig fontRaleway">PAYMENT</p>

      <div
        className={styles.paymentInfoWrapper}
        style={{ borderColor: theme.activeTextColor }}
      >
        <div className={styles.paymentOrdersWrapper}>
          {orders.map((order) => (
            <OrderInfoCard key={order.id} order={order} theme={theme} />
          ))}
        </div>

        <div className={styles.totalWrapper}>
          <p
            className="productNameHeading fontRaleway totalBoldText"
            style={{ fontWeight: "bold" }}
          >
            Total:
          </p>
          <p
            className="pageTitleHeading fontRaleway totalBoldText"
            style={{ fontWeight: "bold" }}
          >
            {getOrderTotal()} $
          </p>
        </div>
      </div>

      <div className={styles.midSection}>
        <p
          className="pageTitleHeading fontRaleway"
          style={{ textAlign: "center", marginBottom: "2rem", fontWeight: 700 }}
        >
          Please scan your QR code
        </p>

          <button
            className={`fontRaleway ${styles.qrCode}`}
            style={{ 
              color: theme.textColor,
              borderColor: theme.activeTextColor,
              outline: `10px solid ${theme.activeTextColor}`,
              borderRadius: "20px",
             }}
            onClick={() => {
              handleStepChange("finnish");

              setFinalOrderDetails(orders);

              console.log({
                orderNO: +new Date().valueOf().toFixed(2),
                orders,
                total: getOrderTotal(),
              });
            }}
          >
            QR
          </button>
      </div>

      <Elipse color={theme.activeTextColor}/>
    </section>
  );
};

export default Payment;
