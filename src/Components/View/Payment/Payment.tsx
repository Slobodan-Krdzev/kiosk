import { motion } from "framer-motion";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomSquare from "../../Reusables/BottomSquare";
import styles from "./PaymentStyles.module.css";

const Payment = () => {
  const { orders, getOrderTotal } = useContext(OrderContext);
  const { handleStepChange, setFinalOrderDetails } = useContext(StepContext);
  const { theme, orderReferenceData } = useContext(DataContext);
  const {t} = useTranslation()

  console.log("ORDERS FROM PAYMENT", orders);
  console.log("ORDER REFERENCE", orderReferenceData.reference);


  return (
    <motion.section
      key={"payment"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fullScreenTablet`}
    >
      <p className="biggerPageTitles fontSF">{t('payment')}</p>

      <div className={styles.midSection}>
        <p className={`${styles.subTitle} fontSF`}>{t('qr_title')}</p>

        <button
          className={`fontSF ${styles.qrCode}`}
          style={{
            color: theme.textColor,
            borderColor: theme.textColor,
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
          <img src={orderReferenceData.qrCodeImg} alt="QRCode" />
        </button>
      </div>

      <BottomSquare/>
    </motion.section>
  );
};

export default Payment;
