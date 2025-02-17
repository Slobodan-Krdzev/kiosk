import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import styles from "./FinnishViewStyles.module.css";

const Finish = () => {
  const { finalInfo, handleRemoveNote, handleStepChange, isTestMode } =
    useContext(StepContext);
  const { cancelOrder, orderNum, IdOrder } = useContext(OrderContext);
  const { theme } = useContext(DataContext);
  const { t } = useTranslation();

  const formInputVal = useRef<HTMLInputElement | null>(null);

  console.log("====================================");
  console.log("FINNISHED ORDER", orderNum);
  console.log("Order Number:", finalInfo.orderNum);
  console.log("Order Note:", finalInfo.orderNote);
  console.log("Order Type:", finalInfo.orderType);
  console.log("Order Meals:", finalInfo.orderDet);

  console.log("====================================");

  const sendEmailForReceipt = async () => {
    if (formInputVal.current!.value !== "") {
      try {
        const res = await fetch(
          `https://kioskapi.dev.revelapps.com/api/sendkioskbillonemail`,
          {
            method: "POST",
            body: JSON.stringify({
              IdOrder: IdOrder,
              email: formInputVal.current!.value,
            }),
          }
        );

        if (!res.ok) throw new Error("Error During Response");

        const result = await res.json();

        console.log("Success", result);
      } catch {
        console.error("Error During Post request / send email");
      }
    }else {
      return 
    }
  };

  return (
    <motion.section
      key={"finnish"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fullScreenTablet ${styles.finnishView}`}
    >
      <p className={`biggerPageTitles fontSF`}>{t("order_successfull")}</p>

      <div className={styles.checkMarkWrapper}>
        <div
          style={{ backgroundColor: theme.activeTextColor }}
          className={styles.checkMark}
        >
          <svg
            width="53"
            height="35"
            viewBox="0 0 73 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M71.5853 1.35019C70.167 -0.098379 67.8676 -0.098379 66.4491 1.35019L22.9374 45.7877L6.21222 28.7068C4.79396 27.2583 2.49455 27.2584 1.07601 28.7068C-0.342394 30.1553 -0.342394 32.5036 1.07601 33.9521L20.3693 53.6555C21.7871 55.1039 24.0882 55.1029 25.5055 53.6555L71.5853 6.59564C73.0037 5.14722 73.0036 2.79876 71.5853 1.35019Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <p className={`${styles.subTitle} paymentPagesSubtitle fontSF`}>
        {t("pick_order")}
      </p>

      <div
        className={styles.orderNoWrapper}
        style={{ borderColor: theme.activeTextColor }}
      >
        <p className={`${styles.orderNO} fontSF`}>{isTestMode ? 1 : orderNum}</p>
      </div>

      <form
        className={`formStyles ${styles.form}`}
        style={{ width: "90%", margin: "0 auto" }}
        onSubmit={(e) => {
          e.preventDefault();

          console.log("Form Input Value", formInputVal.current!.value);
        }}
      >
        <label className={`noteLabel ${styles.formLabel}`} htmlFor="emailInput">
          {t("enter_Email")}
        </label>
        <input
          style={{ border: theme.activeTextColor }}
          className="noteInput fontSF"
          type="email"
          required
          placeholder="example@examplemail.com"
          ref={formInputVal}
        />
      </form>

      <div style={{ position: "fixed", bottom: "3%", left: 0, right: 0 }}>
        <BottomGreenRibbon bgColor={theme.activeTextColor}>
          <button
            className="fontSF bottomRibbonButton"
            style={{
              backgroundColor: theme.activeTextColor,
              color: theme.textColor,
            }}
            onClick={() => {
              sendEmailForReceipt();
              handleStepChange("confirmation");
              cancelOrder();
              handleRemoveNote();
            }}
          >
            {t("send_Receipt")}
          </button>
        </BottomGreenRibbon>
      </div>

    </motion.section>
  );
};

export default Finish;
