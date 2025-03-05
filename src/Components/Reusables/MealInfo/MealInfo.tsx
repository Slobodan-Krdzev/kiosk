import { t } from "i18next";
import { Product } from "../../../Types/Types";
import AlergenItem from "../AlergenItem/AlergenItem";
import Pregnancy from "../SVG/Pregnancy";
import Spicy from "../SVG/Spicy";
import Vegan from "../SVG/Vegan";
import Vegeterian from "../SVG/Vegeterian";
import styles from "./MealInfoStyles.module.css";
import AlergensListerMealInfo from "../AlergensListerMealInfo/AlergensListerMealInfo";
import DefaultButton from "../DefaultButton/DefaultButton";
import PricePreviewer from "../PricePreviewer/PricePreviewer";
import { useContext, useState } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import QuantityBtns from "../QuantityBtns/QuantityBtns";
import Swal from "sweetalert2";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { useMutation } from "@tanstack/react-query";
import CheckAvailability from "../../../Query/CheckAvailability";

interface MealInfoProps {
  meal: Product;
  availability: boolean;
}

const MealInfo = ({ meal }: MealInfoProps) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(!meal.OutOfStock);
  const [quantity, setQuantity] = useState(1);

  const { isTestMode, handleStepChange } = useContext(StepContext);
  const { theme, data } = useContext(DataContext);
  const { placeMealInOrders, setMeal, orders } = useContext(OrderContext);
  const { handleSetMealForInfo } = useContext(StepContext);

  const logo = data.ThemeResponse.LogoImage.Url;
  const isItemAllreadyAdded = Boolean(
    orders.find((m) => m.product?.ProductId === meal.ProductId)
  );
  const itemHasUpsale = meal.HasUpsaleCollection;

  const isAddBtnDisabled = isItemAllreadyAdded && !itemHasUpsale;

  const incrementBtn = () => {
    setQuantity((prevQuant) => prevQuant! + 1);
  };

  const decrementBtn = () => {
    setQuantity((prevQuant) => prevQuant! - 1);
  };

  const { mutateAsync } = useMutation({
    mutationFn: CheckAvailability,
  });

  const handleCheckAvailability = async () => {
    try {
      const availability = await mutateAsync(meal.ProductId);

      setIsAvailable(availability);
      return availability;
    } catch (error) {
      console.error("Error checking availability:", error);
      return null;
    }
  };

  const addBtnHandler = async () => {
    const availability = isTestMode ? true : await handleCheckAvailability();

    if (meal.NoInteraction) {
      handleSetMealForInfo(meal, availability);
      handleStepChange("mealInfo");
    } else {
      if (!availability) {
        Swal.fire({
          title: "Out Of Stock",
          text: `Sorry, ${meal.Name} is currently out of stock.`,
          icon: "warning",
          confirmButtonText: "OK, I'll get something else.",
          customClass: {
            popup: styles.popup,
          },
          didOpen: () => {
            const btn = document.querySelector(`.swal2-confirm`) as HTMLElement;
            if (btn) btn.style.backgroundColor = theme.activeTextColor;
            btn.style.color = theme.textColor;
          },
        });
      } else if (availability && hasUpsale_notPlacedInOrders) {
        console.log("vleguvame vo true");

        setQuantity((q) => q! + 1);
        setMeal(meal);
        handleStepChange("menuUpgrade");
      } else if (isPlacedInOrders_Available_hasUpsale) {
        //OVA E CASE-OT ZA DOKOLKU IMA UPSALE A PRETHODNO E STAVEN VO ORDERS

        setMeal(meal);
        handleStepChange("menuUpgrade");
      } else {
        if (isItemAllreadyAdded) {
          // removeMealFromOrders(product.ProductId) sadasdasd;
          return;
        } else {
          placeMealInOrders({
            id: new Date().valueOf(),
            product: meal,
            image: meal.SmallPictureUrl,
            upsale: undefined,
            originalTotal: meal.Price,
            totalPrice: meal.Price,
            quantity: quantity,
            note: "",
            itemGUI: undefined,
          });

          setQuantity(1);
        }
      }
    }

    handleSetMealForInfo({} as Product, false);
  };

  const hasUpsale_notPlacedInOrders = itemHasUpsale && !isItemAllreadyAdded;
  const isPlacedInOrders_Available_hasUpsale =
    itemHasUpsale && isItemAllreadyAdded && isAvailable;

  return (
    <div className={styles.mealInfoWrapper}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${
            meal.ProductDetails.ProductPictureUrl ?? logo
          })`,
          backgroundSize: meal.ProductDetails.ProductPictureUrl ? 'cover' : 'contain',
        }}
      ></div>

      <div className={styles.titleQuantityWrapper}>
        <div className={styles.titlePriceWraper}>
          <p className={styles.mealName}>{meal.Name}</p>
          <PricePreviewer
            price={meal.Price}
            color={"black"}
            style={{ position: "relative" }}
          />
        </div>

        {!isItemAllreadyAdded && !itemHasUpsale && (
          <div className={styles.btns}>
            <QuantityBtns
              product={meal}
              increment={incrementBtn}
              decrement={decrementBtn}
              quantity={quantity!}
            />
          </div>
        )}
      </div>

      <p className={styles.desc}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. "Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat."Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <div className={styles.barsWrapper}>
        {true && (
          <AlergenItem bgColor="#BB6BD9" text={t("pregnancy")}>
            <Pregnancy />
          </AlergenItem>
        )}
        {true && (
          <AlergenItem bgColor="#219653" text={t("vegan")}>
            <Vegan />
          </AlergenItem>
        )}
        {true && (
          <AlergenItem bgColor="#FF9500" text={t("spicy")}>
            <Spicy />
          </AlergenItem>
        )}
        {true && (
          <AlergenItem bgColor="#235F0A" text={t("vegeterian")}>
            <Vegeterian />
          </AlergenItem>
        )}
      </div>

      <div className={styles.alergensWrapper}>
        <AlergensListerMealInfo product={meal} />
      </div>

      <div className={styles.btnsWrapper}>
        <DefaultButton
          clickHandler={() => {
            handleSetMealForInfo({} as Product, false);
          }}
          style={{
            height: "6vh",
            minHeight: "100%",
            alignSelf: "stretch",
            flexBasis: "50%",
            backgroundColor: "white",
            color: "black",
            textTransform: "uppercase",
          }}
        >
          close
        </DefaultButton>
        <DefaultButton
          dissabled={isAddBtnDisabled}
          clickHandler={addBtnHandler}
          style={{
            height: "6vh",
            minHeight: "100%",
            flexBasis: "50%",
            backgroundColor: isAddBtnDisabled ? "#5c5c5c73" : "black",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          {isAddBtnDisabled ? <>{t('already_in_basket')}</> : <>{t('add_to_basket')}</>}
        </DefaultButton>
      </div>
    </div>
  );
};

export default MealInfo;
