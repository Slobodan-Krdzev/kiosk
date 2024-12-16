import { motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import styles from './PreviewStyles.module.css'
import OrderInfoCard from "../../Reusables/PaymentPage/OrderInfoCard";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { useTranslation } from "react-i18next";

const Preview = () => {

    const {orders, getOrderTotal} = useContext(OrderContext)
    const {theme} = useContext(DataContext)
    const {handleStepChange} = useContext(StepContext)
    const {t} = useTranslation()


  return (
    <motion.section
      className={`fullScreenTablet`}
      key={"preview"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <p className={`fontSF biggerPageTitles`}>{t('order_overview')}</p>

      <div
        className={styles.previewInfoWrapper}
        style={{ borderColor: theme.activeTextColor }}
      >
        <div className={` ${styles.previewOrdersWrapper}`}>
          {orders.map((order) => (
            <OrderInfoCard key={order.id} order={order} />
          ))}
        </div>

        <div className={styles.totalWrapper} style={{backgroundColor: theme.activeTextColor}}>
          <p
            className={`fontSF`}
          >
            {t('total')}
          </p>
          <p
            className={`fontSF`}
          >
            {getOrderTotal()}
          </p>
        </div>
      </div>

      <BottomGreenRibbon bgColor={theme.activeTextColor}>
        <button
          className="fontSF bottomRibbonButton"
          style={{
            backgroundColor: theme.activeTextColor
          }}
          onClick={() => {
            handleStepChange("payment");
          }}
        >
          Place Order
        </button>
        </BottomGreenRibbon>
    </motion.section>
  );
};

export default Preview;
