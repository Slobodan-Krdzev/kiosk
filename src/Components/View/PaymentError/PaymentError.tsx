import { motion } from "framer-motion";
import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomOpacityContentWrapper from "../../Reusables/BottomOpacityContentWrapper/BottomOpacityContentWrapper";
import LargeBtn from "../../Reusables/LargeBtn/LargeBtn";
import styles from "./PaymentError.module.css";
import { t } from "i18next";

const PaymentError = () => {
  const { handleStepChange, step } = useContext(StepContext);

  return (
    <motion.section
      className={`fullScreenTablet ${styles.paymentErrorScreen}`}
      key={"paymentError"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <img
        src="/errorGrafic.webp"
        alt="Error"
        style={{ width: "45vw", aspectRatio: "1 / 1" }}
      />
      <p
        className={styles.oops}
        style={{ fontSize: "5vw", textAlign: "center", fontWeight: 500 }}
      >
        Oops!!! <br />{" "}
        {step === "paymentErr" ? (
          <>{t("errorPage.title")}</>
        ) : (
          <>{t("errorPage.title2")}</>
        )}
      </p>
      <p className={styles.message}>{t("errorPage.subtitle")}</p>

      <BottomOpacityContentWrapper
        style={{
          // background: `linear-gradient(180.09deg, rgba(20, 20, 20, 0) 0.07%, rgba(0, 0, 0, 0.71) 99.93%)`,
          height: "33.333vh",
          gap: "3vh",
          padding: "8vw 5vw",
          position: "fixed",
          bottom: 0,

          left: 0,
          right: 0,
        }}
      >
        <LargeBtn
          borderColor="white"
          width={"100%"}
          clickHandler={() => {
            handleStepChange("start");

            document.documentElement.requestFullscreen();
          }}
        >
          {t("errorPage.btn")}
        </LargeBtn>
      </BottomOpacityContentWrapper>
    </motion.section>
  );
};

export default PaymentError;
