import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
// import { UpsaleContext } from "../../../Contexts/UpsaleContext/UpsaleContext";
import { RootData, SingleMealType, ThemeType } from "../../../Types/Types";
import PricePreviewer from "../PricePreviewer/PricePreviewer";
import Minus from "../SVG/Minus";
import Plus from "../SVG/Plus";
import Trashcan from "../SVG/Trashcan";
import CheckoutCardExtraPreview from "./CheckoutCardExtrasPreview/CheckoutCardExtraPreview";
import styles from "./CheckoutCardStyles.module.css";

type CheckoutCardPropsType = {
  order: SingleMealType;
  theme: ThemeType;
  data: RootData;
  hideShowRibbon: (value: boolean) => void;
  handleKeyboardActivity: (boolean: boolean) => void;
};

const CheckoutCard = ({
  order,
  theme,
  hideShowRibbon,
  handleKeyboardActivity,
}: CheckoutCardPropsType) => {
  const {
    orders,
    setSingleMealQuantity,
    setSingleMealNote,
    removeMealFromOrders,
    // setMeal,
  } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);
  // const {  toggleEditMode, addUpsaleId } = useContext(UpsaleContext);

  const [quantity, setQuantity] = useState(
    order.quantity >= 1 ? order.quantity : 1
  );
  const [isProductNoteInputVisible, setIsProductNoteInputVisible] =
    useState(false);

  const keyboardRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState(order.note ?? ("" as string));
  const formRef = useRef<HTMLFormElement>(null);
  const parentDiv = document.querySelector("#checkoutScrollParent");

  const { t } = useTranslation();

  const handleClickToCloseForm = (e: MouseEvent) => {
    if (
      formRef.current &&
      !formRef.current.contains(e.target as Node) &&
      keyboardRef.current &&
      !keyboardRef.current.contains(e.target as Node)
    ) {
      setIsProductNoteInputVisible(false);
      handleKeyboardActivity(false);
      parentDiv?.classList.remove("scrollPaddingTop");
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submited");

    e.preventDefault();

    setSingleMealNote(inputValue ?? "", order);
    setIsProductNoteInputVisible(false);
    hideShowRibbon(true);
    handleKeyboardActivity(false);
    parentDiv?.classList.remove("scrollPaddingTop");
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (isProductNoteInputVisible) {
      document.addEventListener("mousedown", handleClickToCloseForm);
    } else {
      document.removeEventListener("mousedown", handleClickToCloseForm);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickToCloseForm);
  }, [isProductNoteInputVisible]);

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

  const handleFocus = () => {
    // Scroll the card into view within the container

    parentDiv?.classList.add("scrollPaddingTop");

    console.log(parentDiv);

    cardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start", // Align it to the top
    });
  };

  return (
    <>
      <div
        ref={cardRef}
        className={styles.checkoutCardNoteInputWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.checkoutCard}>
          {/* TOTAL PRICE */}

          <div
            className={styles.checkoutCardPicture}
            style={{
              backgroundImage: order.upsale
                ? `url(${order!.upsale[0]!.stepData[0].option.PictureUrl})`
                : `url(${order.product!.SmallPictureUrl})`,
            }}
          ></div>

          <PricePreviewer
            style={{ top: "2%", right: "5%" }}
            price={order.totalPrice}
            color={theme.activeTextColor}
            fontSizeRound={"4.5vw"}
            fontSizeDecimal={"1.8vw"}
          />

          <div className={`hideScrollBar ${styles.checkoutCardInfoWrapper}`}>
            <div className={styles.cardTitlePriceRow}>
              <p className={styles.checkoutCardMealName}>
                {order.product!.Name.length > 35
                  ? `${order.product!.Name.substring(0, 35)}...`
                  : order.product!.Name}
              </p>
            </div>

            <div className={styles.mealInfoWrapper}>
              {order.upsale &&
                order.upsale.map((step, idx: number) => (
                  <CheckoutCardExtraPreview
                    stepData={step.stepData}
                    order={order}
                    key={idx}
                  />
                ))}

              {order.note !== "" && (
                <p className={`${styles.checkoutCardExtrasText}`}>
                  <>&bull; </>
                  {t("note")}:{" "}
                  {order.note.length > 50
                    ? `${order.note.substring(0, 10)}...`
                    : order.note}
                </p>
              )}

             
            </div>

            <div className={styles.cardNoteBtnsWrapper}>
              {/* {order?.product?.HasUpsaleCollection &&
                !isProductNoteInputVisible && (
                  <motion.button
                    key={"Edit Note Btn"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={styles.addNoteBtn}
                    style={{ fontSize: "2vw" }}
                    onClick={() => {
                      // removeMealFromOrders(order.id);

                      // resetUpsale();
                      toggleEditMode(true)
                      if(order) addUpsaleId(order?.product?.UpsaleCollectionId ?? 0)
                      
                      setMeal(order.product!);
                      // run thru upsale
                      handleStepChange("menuUpgrade");

                      
                      console.log(order)
                    }}
                  >
                    <img
                      src="/edit.png"
                      alt="edit"
                      style={{
                        width: "15%",
                      }}
                    />{" "}
                    {t("edit_note")}
                  </motion.button>
                )} */}

              {!isProductNoteInputVisible && (
                <motion.button
                  key={"Add Note Btn"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={styles.addNoteBtn}
                  style={{ fontSize: "2vw" }}
                  onClick={() => {
                    setIsProductNoteInputVisible(true);
                    handleKeyboardActivity(true);
                    handleFocus();
                  }}
                >
                  <img
                    src="/editNotePlus.png"
                    alt="Edit Note"
                    style={{ width: "15%" }}
                  />{" "}
                  {t("note")}
                </motion.button>
              )}

              {isProductNoteInputVisible && (
                <motion.form
                  key={"noteForm"}
                  ref={formRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`formStyles ${styles.productNoteForm}`}
                  onSubmit={onFormSubmit}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <input
                      id="note"
                      type="text"
                      style={{
                        borderColor: theme.activeTextColor,
                        width: inputValue.length > 4 ? "83%" : "100%",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      className="defInput"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.currentTarget.value);
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
                      {order.note ? "Edit" : "Done"}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* BUTTONS */}
              {!isProductNoteInputVisible && (
                <motion.div
                  key={"buttons"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#000000",
                    flexBasis: "55%",
                    borderRadius: "50px",
                    border: "1px solid #525252",
                  }}
                >
                  <button
                    style={{
                      flexBasis: "33.3333%",
                      height: "100%",
                      borderRadius: "inherit",
                      border: "none",
                      backgroundColor: "white",
                    }}
                    onClick={() => {
                      if (quantity === 1) {
                        if (orders.length === 1) {
                          handleStepChange("order");
                        }

                        setQuantity(1);
                        removeMealFromOrders(order.id);
                      } else {
                        setQuantity((quantity) => quantity - 1);
                        setSingleMealQuantity(order, "minus");
                      }
                    }}
                  >
                    {quantity === 1 ? <Trashcan /> : <Minus color="black" />}
                  </button>
                  <p className={styles.orderQuantity}>{order.quantity}</p>
                  <button
                    style={{
                      flexBasis: "33.333%",
                      height: "100%",
                      borderRadius: "inherit",
                      border: "none",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setQuantity((quantity) => quantity + 1);
                      setSingleMealQuantity(order, "plus");
                    }}
                  >
                    <Plus color="black" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isProductNoteInputVisible && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            ref={keyboardRef}
          >
            <Keyboard
              theme="hg-theme-default "
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
    </>
  );
};

export default CheckoutCard;
