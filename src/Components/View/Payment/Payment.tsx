import { motion } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomSquare from "../../Reusables/BottomSquare";
import styles from "./PaymentStyles.module.css";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import qr from "../../../../public/qr.png";
import Modal from "../../Reusables/Modal";

const Payment = () => {
  const {
    orders,
    getOrderTotal,
    handleSetOrderNumber,
    handleSetIdOrderNumber,
    cancelOrder,
  } = useContext(OrderContext);
  const { handleStepChange, setFinalOrderDetails } = useContext(StepContext);
  const { theme, orderReferenceData } = useContext(DataContext);
  const { t } = useTranslation();

  const [isAvailable, setIsAvailable] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // const checkAvailability = async () => {
  //   try {
  //     if (!orderReferenceData?.reference) {
  //       throw new Error("Missing order reference data");
  //     }

  //     const url = `https://kioskapi.dev.revelapps.com/api/CheckKioskPayment?reference=${orderReferenceData.reference}`;

  //     const response = await fetch(url);
  //     const data = await response.json();

  //     console.log("Data od Responsot", data);

  //     if (data.Message) {
  //       if (data.Message === "An error has occurred.") {
  //         handleStepChange("paymentErr");
  //       }
  //     }

  //     handleStepChange("finnish");
  //     handleSetOrderNumber(data.Data.AdditionalData);
  //     handleSetIdOrderNumber(data.Data.IdOrder);
  //     setIsAvailable(data.IsSuccess);
  //   } catch (error) {
  //     console.error("Error fetching product availability:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (!isAvailable) {
  //     const interval = setInterval(() => {
  //       checkAvailability();
  //     }, 10000);

  //     return () => clearInterval(interval);
  //   }
  // }, [isAvailable]);

  const checkAvailability = useCallback(async () => {
    try {
      if (!orderReferenceData?.reference) {
        console.warn("Skipping API call: Missing order reference data");
        return;
      }

      const url = `https://kioskapi.dev.revelapps.com/api/CheckKioskPayment?reference=${orderReferenceData.reference}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log("Data od Responsot", data);

      if (data.Message === "An error has occurred.") {
        handleStepChange("paymentErr");
        return;
      }

      handleStepChange("finnish");
      handleSetOrderNumber(data.Data.AdditionalData);
      handleSetIdOrderNumber(data.Data.IdOrder);
      setIsAvailable(data.IsSuccess);
      setIsCancelModalOpen(false)
    } catch (error) {
      console.error("Error fetching product availability:", error);
    }
  }, [orderReferenceData]); 

  useEffect(() => {
    if (!isAvailable && orderReferenceData?.reference) {
      const interval = setInterval(() => {
        checkAvailability();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isAvailable, orderReferenceData, checkAvailability]);

  const handleCancelOrder = () => {
    cancelOrder();
    handleStepChange("start");
  };

  return (
    <>
      <motion.section
        key={"payment"}
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "100vw" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fullScreenTablet`}
      >
        <p className="biggerPageTitles fontSF">{t("payment")}</p>

        <div className={styles.midSection}>
          <p className={`${styles.subTitle} fontSF`}>{t("qr_title")}</p>

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
            <img
              src={
                orderReferenceData.qrCodeImg ? orderReferenceData.qrCodeImg : qr
              }
              alt="QRCode"
            />
          </button>
        </div>

        <BottomSquare />
        <BottomGreenRibbon bgColor={"white"}>
          <button
            className="fontSF bottomRibbonButton"
            style={{
              backgroundColor: "white",
              color: theme.textColor,
            }}
            onClick={() => {
              setIsCancelModalOpen(true)
            }}
          >
            {t("cancel_order")}
          </button>
        </BottomGreenRibbon>
      </motion.section>

      {isCancelModalOpen && (
        <Modal borderColor={theme.activeTextColor}>
          <>
            <h2 className={`fontSF paymentPagesSubtitle`}>Are You Sure?</h2>
            <div className={styles.modalBtnsWrapper}>
              <button
              onClick={() => {
              setIsCancelModalOpen(false)

              }}
              style={{borderColor: theme.activeTextColor}}>No</button>
              <button
                onClick={handleCancelOrder}
              style={{borderColor: theme.activeTextColor, backgroundColor: theme.activeTextColor, color: theme.textColor}}>Cancel Order</button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default Payment;
