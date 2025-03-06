import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import CheckoutCard from "../../Reusables/CheckoutPage/CheckoutCard";
import { useTranslation } from "react-i18next";
import { useSendOrder } from "../../../Query/SendOrder";
import { Item, SendOrderType } from "../../../Types/SendOrderTypes";
import Logo from "../../Reusables/Logo";
import Pencil from "../../Reusables/SVG/Pencil";
import TopFixedRibbon from "../../Reusables/TopFixedRibbon/TopFixedRibbon";
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";
import styles from "./CheckoutStyles.module.css";
import BottomFixedShadowLayer from "../../Reusables/BottomFixedShadowLayer/BottomFixedShadowLayer";
import BottomOrderInfo from "../../Reusables/BottomOrderInfo/BottomOrderInfo";
import DefaultButton from "../../Reusables/DefaultButton/DefaultButton";
import Keyboard from "react-simple-keyboard";

const Checkout = () => {
  const { handleStepChange, handleOrderNote, finalInfo, isTestMode } =
    useContext(StepContext);
  const { orders, getOrderTotal } = useContext(OrderContext);
  const { theme, data } = useContext(DataContext);
  const { t } = useTranslation();
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(true);
  const [inputValue, setInputValue] = useState('')
  const [isRibbonShown, setIsRibbonShown] = useState(true);
  const [, setPaddingTop] = useState(50);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [isParentKeyboardActive, setIsParentKeyboardActive] = useState(false)
  const scrollContRef = useRef<null | HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null)

  const hideShowRibbon = (value: boolean) => {
    setIsRibbonShown(value);
  };

  const { mutate } = useSendOrder();

  const formulateMealsForPostRequest = () => {
    const formulatedOrders: Item[] = orders.map((order) => {
      if (order.upsale) {
        return {
          Item: {
            Id: order!.product!.ProductId,
            PluCode: "",
            Image: order!.product!.SmallPictureUrl,
            Name: order!.product!.Name,
            Price: order!.product!.Price,
          },
          Variants: [],
          UpsaleCollection: order.upsale.flatMap((upsale) =>
            upsale.stepData.map((stepData) => ({
              UpsaleStepOptionModel: {
                ProductId: stepData.option.ProductId as number,
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
            Price: order.product!.Price,
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

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContRef.current;
      if (!container) return;

      const { scrollTop } = container;

      // Reduce paddingTop smoothly as the user scrolls
      setPaddingTop(Math.max(20 - scrollTop, 0));
    };

    const container = scrollContRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNextAction = () => {
    if (isTestMode) {
      handleStepChange("payment");
    } else {
      handleSendOrder();
      handleStepChange("payment");
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hideShowRibbon(true);

    setIsOrderFormVisible(false);
    // OVDE SE DODAVA FULL ORDER NOTE
    handleOrderNote(inputValue ?? "No Note");
    e.currentTarget.reset();
    setIsParentKeyboardActive(false)
  };

  const handleKeyboardActivity = (boolean: boolean) => {
    setIsKeyboardActive(boolean);
  };

  const handleKeyboardChange = (newValue: string) => {
    console.log(newValue);

    if (newValue === "Backspace") {
      setInputValue((prevInput) => prevInput.slice(0, -1));
    } else {
      setInputValue(newValue);
    }
  };

  const handleOnKetPresKeyboardChange = (button: string) => {
    if (button === "{bksp}") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (button === "{enter}") {
      onFormSubmit({
        preventDefault: () => {}, // Prevent default behavior
        currentTarget: formRef.current,
      } as React.FormEvent<HTMLFormElement>);
    }
  };


  return (
    <ViewFullScreenAnimated framerKey={"Checkout"} backgroundColor="#F1F1F1">
      <TopFixedRibbon justifyContent={"space-between"}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={50} />

        <p className={styles.topText}>{t("my_order")}</p>
      </TopFixedRibbon>

      <div
        ref={scrollContRef}
        id="checkoutScrollParent"
        className={`hideScrollBar ${styles.checkoutCardWrapper}`}
      >
        {orders.map((product) => (
          <CheckoutCard
            key={product.id}
            order={product}
            theme={theme}
            data={data}
            hideShowRibbon={hideShowRibbon}
            handleKeyboardActivity={handleKeyboardActivity}
          />
        ))}

        {!isOrderFormVisible && (
          <motion.div
            key={"orderNote"}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.orderNotePreviewWrapper}
            style={{ borderColor: theme.activeTextColor }}
          >
            <p className="fontSF" style={{ fontSize: "2.6vw" }}>
              {t("note")}: {finalInfo.orderNote}
            </p>

            <button
              className={styles.orderNoteEditBtn}
              onClick={() =>{ 
                setIsOrderFormVisible(true)
                setIsParentKeyboardActive(true)
                setIsRibbonShown(false)}}
            >
              <Pencil color={theme.activeTextColor} />
            </button>
          </motion.div>
        )}

        {isOrderFormVisible && (
          <motion.form
          ref={formRef}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`formStyles ${styles.inputField}`}
            onSubmit={(e) => {
              e.preventDefault()
              onFormSubmit(e)
              e.currentTarget.reset()
            }}
          >
            <label htmlFor="orderNoteInput" className="noteLabel fontSF">
              {t("order_note")}
            </label>

            <div style={{ display: "flex" }}>
              <input
              value={inputValue}
                style={{
                  borderColor: theme.activeTextColor,
                  width: "80%",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                type="text"
                id="orderNoteInput"
                required
                className="defInput"
                placeholder={
                  finalInfo.orderNote !== ""
                    ? finalInfo.orderNote
                    : `${t("add_note")}`
                }
                onFocus={() => {
                  hideShowRibbon(false);
                  setIsParentKeyboardActive(true)
                }}
                onChange={(e) => {
                  setInputValue(e.currentTarget.value)
                }}
              />

              <button
                type="submit"
                className={`defSubmitFormBtn`}
                style={{
                  backgroundColor: theme.activeTextColor,
                  borderColor: theme.activeTextColor,
                  width: "22%",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  color: "white",
                }}
              >
                {finalInfo.orderNote !== ""
                  ? `${t("edit_note")}`
                  : `${t("done")}`}
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {isRibbonShown && !isKeyboardActive && (
        <BottomFixedShadowLayer>
          <>
            <DefaultButton
              style={{
                flexBasis: "20%",
                height: "80%",
                textTransform: "uppercase",
              }}
              clickHandler={() => handleStepChange("order")}
            >
              {t("back_Btn")}
            </DefaultButton>
            <BottomOrderInfo
              width={"80%"}
              clickHandler={handleNextAction}
              total={getOrderTotal()}
              numberOfProductsInCart={orders.length}
              nextText={t("payment")}
            />
          </>
        </BottomFixedShadowLayer>
      )}

      {isParentKeyboardActive && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            ref={keyboardRef}
          >
            <Keyboard
              theme="hg-theme-default"
              style={{
                position: "fixed",
                bottom: 0,
                border: "2px solid red",
                pointerEvents: "auto",
              }}
              onChange={handleKeyboardChange}
              onKeyPress={handleOnKetPresKeyboardChange}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </ViewFullScreenAnimated>
  );
};

export default Checkout;
