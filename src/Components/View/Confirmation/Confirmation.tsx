import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Counter from "../../Reusables/Counter/Counter";
import styles from "./Confirmation.module.css";

const Confirmation = () => {
  const [isCounterVisible, setIsCounterVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCounterVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      key={"confirmation"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fullScreenTablet ${styles.confirmationView}`}
    >
      <img src="/checkMarkGif.gif" alt="Check Mark" width={250} height={250} />
      <p
        className={`fontSF`}
        style={{ fontSize: "5vw", textAlign: "center", fontWeight: 500 }}
      >
        YOUR ORDER IS WAITING <br />
        FOR YOU AT THE COUNTER{" "}
      </p>

      {isCounterVisible && (
        <div className={`countOverlay`}>
          <Counter start={5} />
        </div>
      )}
    </motion.section>
  );
};

export default Confirmation;
