import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomButtonholderRibbon from "../../Reusables/BottomButtonHolderWibbon/BottomButtonholderRibbon";
import DefaultButton from "../../Reusables/DefaultButton/DefaultButton";
import Logo from "../../Reusables/Logo";
import TopFixedRibbon from "../../Reusables/TopFixedRibbon/TopFixedRibbon";
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";
import styles from "./FinnishViewStyles.module.css";

const Finish = () => {
  const { finalInfo, handleRemoveNote, handleStepChange, isTestMode } =
    useContext(StepContext);
  const { cancelOrder, orderNum, IdOrder } = useContext(OrderContext);
  const {  data } = useContext(DataContext);
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
    } else {
      return;
    }
  };

  return (
    <ViewFullScreenAnimated
    backgroundColor="#F0F0F0"
      framerKey={"orderNumber"}
      // className={`fullScreenTablet ${styles.finnishView}`}
    >
      <TopFixedRibbon justifyContent={"center"}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={50} />
      </TopFixedRibbon>

      <div className={styles.checkMarkWrapper}>
        <motion.img
           src="check.png"
          alt="Check Mark"
          width={70}
          height={70}
        />

        {/* </div> */}

        <p className={`biggerPageTitles fontCustom1`}>
          {t("finishPage.finishTitle")}
        </p>
      </div>

      <p className={`${styles.subTitle} paymentPagesSubtitle fontSF`}>
        {t("finishPage.finnishSubtitle")}
      </p>

      <div className={styles.orderNoWrapper}>
        <p className={styles.orderNOTitle}>{t("finishPage.orderNumber")}</p>
        <p className={styles.orderNO}>{isTestMode ? 1 : orderNum}</p>
      </div>

      <form
        className={`formStyles ${styles.form}`}
        style={{ width: "90%", margin: "0 auto" }}
        onSubmit={(e) => {
          e.preventDefault();

        }}
      >
        <label className={`noteLabel ${styles.formLabel}`} htmlFor="emailInput">
          {t("finishPage.receiptEmail")}.
        </label>
        <input
          style={{ borderRadius: 8 }}
          className="defInput"
          type="email"
          required
          placeholder="example@examplemail.com"
          ref={formInputVal}
        />
      </form>

      <BottomButtonholderRibbon>
        <DefaultButton
        style={{width: '100%', height: '100%', backgroundColor: 'black', color: 'white', textTransform: 'uppercase'}}
          clickHandler={() => {
            sendEmailForReceipt();
            handleStepChange("confirmation");
            cancelOrder();
            handleRemoveNote();
          }}
        >
          {t('finish')}
        </DefaultButton>
      </BottomButtonholderRibbon>
     
    </ViewFullScreenAnimated>
  );
};

export default Finish;
