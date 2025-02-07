import { motion } from "framer-motion";
import styles from "./PaymentError.module.css";
import { useContext } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";

const PaymentError = () => {

  const { handleStepChange, step } = useContext(StepContext)
  const { theme } = useContext(DataContext)

  return (
    <motion.section
      className={`fullScreenTablet ${styles.paymentErrorScreen}`}
      key={"paymentError"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <img src="/errorGrafic.webp" alt="Error" width={200} height={200} />
      <p
        className={`fontSF`}
        style={{ fontSize: "5vw", textAlign: "center", fontWeight: 500 }}
      >
        Oops!!! <br />
        {" "}
        {step === 'paymentErr' ? "Payment failed." : "Something Went Wrong!"}
      </p>
      <p className={`fontSF paymentPagesSubtitle`}>
        Please contact our staff and check your card details.
      </p>
      <button
        className={`fontSF ${styles.btn}`}
        style={{
          backgroundColor: step === 'paymentErr' ? theme.activeTextColor : 'lightblue',
          color:step === 'paymentErr' ? theme.textColor : 'white',
        }}
        onClick={() => {
          handleStepChange("start");

          document.documentElement.requestFullscreen();
        }}
      >
        Start Again
      </button>
    </motion.section>
  );
};

export default PaymentError;
