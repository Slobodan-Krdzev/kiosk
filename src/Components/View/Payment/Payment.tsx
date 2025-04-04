import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import qr from "../../../../public/qr.png";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomButtonholderRibbon from "../../Reusables/BottomButtonHolderWibbon/BottomButtonholderRibbon";
import DefaultButton from "../../Reusables/DefaultButton/DefaultButton";
import Logo from "../../Reusables/Logo";
import Modal from "../../Reusables/Modal";
import TopFixedRibbon from "../../Reusables/TopFixedRibbon/TopFixedRibbon";
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";
import styles from "./PaymentStyles.module.css";

const Payment = () => {
  const {
    orders,
    getOrderTotal,
    handleSetOrderNumber,
    handleSetIdOrderNumber,
    cancelOrder,
  } = useContext(OrderContext);
  const { handleStepChange, setFinalOrderDetails } = useContext(StepContext);
  const { theme, data, orderReferenceData } = useContext(DataContext);
  const { t } = useTranslation();

  const [isAvailable, setIsAvailable] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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
      setIsCancelModalOpen(false);
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
    <ViewFullScreenAnimated framerKey={"qrPayment"} backgroundColor="#F0F0F0">
      <TopFixedRibbon justifyContent={"center"}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={50} />
      </TopFixedRibbon>

      <div className={styles.midSection}>
        <p className={styles.title}>{t("payment.paymentTitle")}</p>

        <p className={`${styles.subTitle}`}>{t("payment.scanQR")}</p>

        <button
          className={styles.qrCode}
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

      <BottomButtonholderRibbon
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <DefaultButton
          style={{
            height: "100%",
            flexBasis: "23%",
          }}
          clickHandler={() => handleStepChange("order")}
        >
          {t("back")}
        </DefaultButton>
        <DefaultButton
          style={{
            height: "100%",
            flexBasis: "73%",
            borderColor: "#FF4F4F",
            color: "#FF4F4F",
            textTransform: "capitalize"
          }}
          clickHandler={() => setIsCancelModalOpen(true)}
        >
          {t("cancelOrder")}
        </DefaultButton>
      </BottomButtonholderRibbon>

      {isCancelModalOpen && (
        <Modal borderColor={theme.activeTextColor}>
          <>
            <h2
              style={{ textAlign: "center", fontSize: "2.6vw", width: "60%" }}
              className={`fontCustom1 paymentPagesSubtitle`}
            >
              {t("cancelQuestion")}
            </h2>
            <div className={styles.modalBtnsWrapper}>
              <DefaultButton
                clickHandler={() => setIsCancelModalOpen(false)}
                style={{
                  height: "100%",
                  minHeight: "70px",
                }}
              >
                {t("back")}
              </DefaultButton>
              <DefaultButton
                clickHandler={handleCancelOrder}
                style={{
                  height: "100%",
                  backgroundColor: "#FF4F4F",
                  color: "white",
                }}
              >
                {t("yes")}
              </DefaultButton>
            </div>
          </>
        </Modal>
      )}
    </ViewFullScreenAnimated>
  );
};

export default Payment;
