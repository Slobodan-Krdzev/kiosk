import { useContext, useState } from "react";
import { SingleMealType, ThemeType } from "../../../Types/Types";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import styles from "./CheckoutCardStyles.module.css";
import { StepContext } from "../../../Contexts/StepContext/StepContext";

type CheckoutCardPropsType = {
  order: SingleMealType;
  theme: ThemeType;
  ordersLength: number;
  hideShowRibbon: (value: boolean) => void;
};

const CheckoutCard = ({
  order,
  theme,
  ordersLength,
  hideShowRibbon,
}: CheckoutCardPropsType) => {
  const [quantity, setQuantity] = useState(
    order.quantity >= 1 ? order.quantity : 1
  );
  const [isProductNoteInputVisible, setIsProductNoteInputVisible] =
    useState(false);

  const [inputValue, setInputValue] = useState(order.note ?? "" as string)

  const { setSingleMealQuantity, setSingleMealNote, removeMealFromOrders } =
    useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);

  return (
    <div className={styles.checkoutCardNoteInputWrapper}>
      <div className={styles.checkoutCard}>
        <div className={styles.checkoutCardActionBtnsWrapper}>
          <button
            onClick={() => {
              setIsProductNoteInputVisible(!isProductNoteInputVisible);
              hideShowRibbon(false);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
                stroke={"black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
                stroke={"black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 13H12"
                stroke={"black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 17H16"
                stroke={"black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              removeMealFromOrders(order.product!.ProductId);

              if (ordersLength === 1) {
                handleStepChange("order");
              }
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047"
                stroke="#FF453A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                stroke="#FF453A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.8504 9.13965L18.2004 19.2096C18.0904 20.7796 18.0004 21.9996 15.2104 21.9996H8.79039C6.00039 21.9996 5.91039 20.7796 5.80039 19.2096L5.15039 9.13965"
                stroke="#FF453A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.3301 16.5H13.6601"
                stroke="#FF453A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 12.5H14.5"
                stroke="#FF453A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <img
          src={`${order.product!.SmallPictureUrl}`}
          alt={order.product!.Name}
          className={styles.checkoutCardPicture}
        />

        <div className={styles.checkoutCardInfoWrapper}>
          <p className={`${styles.checkoutCardMealName} fontSF`}>
            {order.product!.Name.length > 35
              ? `${order.product!.Name.substring(0, 35)}...`
              : order.product!.Name}
          </p>
          <div className={styles.mealInfoWrapper}>
            {order.sides && (
              <p
                className={`${styles.checkoutCardExtrasText} fontSF`}
                style={{ color: theme.textColor }}
              >
                {order.sides.map((s) => (
                  <span key={s.Id}>{s.Name} x 1</span>
                ))}
              </p>
            )}

            {order.drinks && (
              <p className={`${styles.checkoutCardExtrasText} fontSF`}>
                {order.drinks.map((drink) => (
                  <span key={drink.drink.Id}>
                    {drink.drink.Name} x ${drink.quantity},
                  </span>
                ))}
              </p>
            )}

            {order.extras && (
              <p className={`${styles.checkoutCardExtrasText} fontSF`}>
                {order.extras.map((e) => (
                  <span key={e.Id}>{e.Name} x 1</span>
                ))}
              </p>
            )}
          </div>

          {order.note !== "" && (
            <p
              className={`${styles.checkoutCardExtrasText} fontSF`}
              style={{ fontSize: 14 }}
            >
              Note: {order.note}
            </p>
          )}

          {/* TOTAL PRICE */}
          <p className={`${styles.checkoutCardPrice} fontSF`}>
            {order.totalPrice.toFixed(2)} {order.product!.PriceValue}
          </p>
        </div>
        {/* BUTTONS */}
        <div
          className={`${styles.checkoutCardQuantityWrapper} fontSF`}
          style={{ backgroundColor: theme.activeTextColor }}
        >
          <button
            onClick={() => {
              if (quantity === 1) {
                setQuantity(1);
              } else {
                setQuantity((quantity) => quantity - 1);
                setSingleMealQuantity(order, "minus");
              }
            }}
          >
            &#8722;
          </button>
          <p className={styles.quantityCounter}>{quantity}</p>
          <button
            onClick={() => {
              setQuantity((quantity) => quantity + 1);
              setSingleMealQuantity(order, "plus");
            }}
          >
            &#43;
          </button>
        </div>
      </div>

      {isProductNoteInputVisible && (
        <form
          className="formStyles"
          onSubmit={(e) => {
            e.preventDefault();

            setSingleMealNote(inputValue ?? "", order);
            setIsProductNoteInputVisible(false);
            hideShowRibbon(true);
            e.currentTarget.reset();
          }}
        >
          <label htmlFor="note" className={`fontSF noteLabel`}>
            Product Note
          </label>
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
                width: inputValue.length > 4 ? "83%" : '100%',
                borderTopRightRadius: inputValue.length > 4 ? 0 : 8,
                borderBottomRightRadius: inputValue.length > 4 ? 0 : 8,
              }}
              className={`noteInput`}
              required
              value={inputValue}
              onChange={e => {
                setInputValue(e.currentTarget.value)
              }}
            />

            {inputValue.length > 4 && (
                <button
                  type="submit"
                  className={`submitBtn fontSF`}
                  style={{
                    backgroundColor: theme.activeTextColor,
                    borderColor: theme.activeTextColor,
                    width: "17%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                 {order.note ? "Edit" : "Add"} 
                </button>
              )}
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutCard;
