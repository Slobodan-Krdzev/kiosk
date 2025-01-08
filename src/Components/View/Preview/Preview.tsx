import { motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import styles from "./PreviewStyles.module.css";
import OrderInfoCard from "../../Reusables/PaymentPage/OrderInfoCard";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { useTranslation } from "react-i18next";
import { useSendOrder } from "../../../Query/SendOrder";
import { v4 as uuidv4 } from "uuid";
import { Item, SendOrderType } from "../../../Types/SendOrderTypes";

const Preview = () => {
  const { orders, getOrderTotal } = useContext(OrderContext);
  const {
    finalInfo: { orderDet, orderNote, orderType },
  } = useContext(StepContext);
  const { theme } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);
  const { t } = useTranslation();

  const { mutate, isSuccess, error, data } = useSendOrder();

  const formulateMealsForPostRequest = () => {
    const formulatedOrders: Item[] = orders.map((order) => {
      if (order.upsale) {
        return {
          Item: {
            Id: order!.product!.ProductId,
            PluCode: "",
            Image: order!.product!.SmallPictureUrl,
            Name: order!.product!.Name,
            Price: order!.totalPrice,
          },
          Variants: [],
          UpsaleCollection: order.upsale.flatMap((upsale) =>
            upsale.stepData.map((stepData) => ({
              UpsaleStepOptionModel: {
                ProductId: stepData.option.Id,
                Name: stepData.option.Name,
                Price: stepData.option.Price,
              },
              Quantity: stepData.quantity,
            }))
          ),
          Quantity: order.quantity,
          ItemGuid: "",
          CoursePosition: 0,
          Note: order.note,
        };
      } else {
        return {
          Item: {
            Id: order.product!.ProductId,
            PluCode: "",
            Image: order.product!.SmallPictureUrl,
            Name: order.product!.Name,
            Price: order.totalPrice,
          },
          Variants: [],
          UpsaleCollection: [],
          Quantity: order.quantity,
          ItemGuid: "",
          CoursePosition: 0,
          Note: order.note,
        };
      }
    });

    return formulatedOrders;
  };

  const handleSendOrder = () => {
    const orderData: SendOrderType = {
      Order: {
        OrderGuid: "",
        SessionGuid: "",
        Items: formulateMealsForPostRequest(),
      },
      tableNumber: "308",
      deviceSessionId: "",
    };

    mutate(orderData);
  };

  if (isSuccess) {
    console.log(data);
  }

  if (error) {
    console.log("Error");
  }

  return (
    <motion.section
      className={`fullScreenTablet`}
      key={"preview"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <p className={`fontSF biggerPageTitles`}>{t("order_overview")}</p>

      <div
        className={styles.previewInfoWrapper}
        style={{ borderColor: theme.activeTextColor }}
      >
        <div className={` ${styles.previewOrdersWrapper}`}>
          {orders.map((order) => (
            <OrderInfoCard key={order.id} order={order} />
          ))}
        </div>

        <div
          className={styles.totalWrapper}
          style={{
            backgroundColor: theme.activeTextColor,
            color: theme.textColor,
          }}
        >
          <p className={`fontSF`}>{t("total")}</p>
          <p className={`fontSF`}>{getOrderTotal()}</p>
        </div>
      </div>

      <BottomGreenRibbon bgColor={theme.activeTextColor}>
        <button
          className="fontSF bottomRibbonButton"
          style={{
            backgroundColor: theme.activeTextColor,
            color: theme.textColor,
          }}
          onClick={() => {
            // ovde da ispratime post request
            // pa ako e valid da odi na handleStepChange

            handleSendOrder();
          }}
        >
          {t("place_order")}
        </button>
      </BottomGreenRibbon>
    </motion.section>
  );
};

export default Preview;
