import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import styles from "./FinnishViewStyles.module.css";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import Elipse from "../../Reusables/Elipse/Elipse";

const Finish = () => {
  const { finalInfo } = useContext(StepContext);
  const { theme } = useContext(DataContext);

  console.log("====================================");
  console.log(
    "FINNISHED ORDER",
    "Order Number: ",
    finalInfo.orderNum,
    "Order: ",
    finalInfo.orderDet
  );
  console.log("====================================");

  return (
    <section className={styles.finishView}>
      <div className={styles.checkMarkWrapper}>
        <div
          style={{ backgroundColor: theme.activeTextColor }}
          className={styles.checkMark}
        >
          <svg
            width="73"
            height="55"
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

      <p className={`${styles.successMsg} fontRaleway`}>
        Order Succesfull!
      </p>
      <p className="pageTitleHeading fontRaleway" style={{textAlign: 'center'}}>
        You can pick up your order at the counter.
      </p>

      <div className={styles.orderNoWrapper} style={{borderColor: theme.activeTextColor}}>
        <p className={`pageTitleHeading fontRaleway`}>Your Order Number</p>
        <p className={`${styles.orderNO} fontRaleway`}>{finalInfo.orderNum}</p>
      </div>

      <Elipse color={theme.activeTextColor}/>
    </section>
  );
};

export default Finish;
