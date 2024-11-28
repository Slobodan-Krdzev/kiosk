import { useContext } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import Elipse from "../../Reusables/Elipse/Elipse";
import styles from "./PaymentStyles.module.css";
import { motion } from "framer-motion";
import QR from "../../Reusables/SVG/QR";

const Payment = () => {
  const { orders, getOrderTotal } = useContext(OrderContext);
  const { handleStepChange, setFinalOrderDetails } = useContext(StepContext);
  const { theme } = useContext(DataContext);

  console.log("ORDERS FROM PAYMENT", orders);

  return (
    <motion.section
      key={"payment"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fullScreenTablet`}
    >
      <p className="biggerPageTitles fontSF">PAYMENT</p>

      <div className={styles.midSection}>
        <p className={`${styles.subTitle} fontSF`}>Please scan your QR code</p>

        <button
          className={`fontSF ${styles.qrCode}`}
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
          <QR />
        </button>
      </div>

      <Elipse color={theme.activeTextColor} />
    </motion.section>
  );
};

export default Payment;
