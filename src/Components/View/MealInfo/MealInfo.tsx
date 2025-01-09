import { motion } from "framer-motion";
import { useContext } from "react";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { Product, ThemeType } from "../../../Types/Types";
import AlergenItem from "../../Reusables/AlergenItem/AlergenItem";
import Pregnancy from "../../Reusables/SVG/Pregnancy";
import Spicy from "../../Reusables/SVG/Spicy";
import Vegan from "../../Reusables/SVG/Vegan";
import Vegeterian from "../../Reusables/SVG/Vegeterian";
import UpgradeBottomRibbon from "../../Reusables/UpgradeBottomRibbon/UpgradeBottomRibbon";
import styles from "./MealInfoStyles.module.css";
import { useTranslation } from "react-i18next";
import AlergensListerMealInfo from "../../Reusables/AlergensListerMealInfo/AlergensListerMealInfo";

type MealInfoPropsType = {
  meal: Product;
  theme: ThemeType;
  availability: boolean
};

const MealInfo = ({ meal, theme, availability }: MealInfoPropsType) => {
  

  const { placeMealInOrders, setMeal, orders } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);
  const { t } = useTranslation();

  const isMealAllreadyInOrders = Boolean(orders.find(m => m.product?.ProductId === meal.ProductId))

  console.log(availability)

  return (
    <motion.section
      className="fullScreenTablet"
      key={"order"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={styles.mealPictureWrapper}
        style={{ backgroundColor: theme.bgColor }}
      >
        <img
          className={styles.mealPicture}
          src={meal.SmallPictureUrl}
          alt={meal.Name}
          loading="lazy"
        />
      </div>
      <div
        style={{
          padding: "1rem 1.5rem",
        }}
      >
        <h2 className={`fontSF ${styles.mealName}`}>{meal.Name}</h2>

        <div style={{ margin: "1rem 0 0" }}>
          {true && (
            <AlergenItem bgColor="#BB6BD9" text={t('pregnancy')}>
              <Pregnancy />
            </AlergenItem>
          )}
          {true && (
            <AlergenItem bgColor="#219653" text={t('vegan')}>
              <Vegan />
            </AlergenItem>
          )}
          {true && (
            <AlergenItem bgColor="#FF9500" text={t('spicy')}>
              <Spicy />
            </AlergenItem>
          )}
          {true && (
            <AlergenItem bgColor="#235F0A" text={t('vegeterian')}>
              <Vegeterian />
            </AlergenItem>
          )}
        </div>
        <p className={`fontSF ${styles.mealDescription}`}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>

        <AlergensListerMealInfo product={meal}/>
      </div>

      <UpgradeBottomRibbon
        nextText={availability ? isMealAllreadyInOrders ? `${t("already_in_basket")}` : `${t("add_to_basket")}` : `${t("out_of_stock")}`}
        backStep={"order"}
        backText={t('back_Btn')}
        nextStep={meal.HasUpsaleCollection ? "menuUpgrade" : "order"}
        disableNextBtn={availability ? isMealAllreadyInOrders ? true : false : true}
        nextAction={() => {
          if (meal.HasUpsaleCollection) {
            
            setMeal(meal)
          } else {
            placeMealInOrders({
              id: meal.ProductId,
              product: meal,
              image: meal.SmallPictureUrl,
              upsale: undefined,
              originalTotal: meal.Price,
              totalPrice: meal.Price,
              quantity: 1,
              note: "",
              itemGUI: undefined
            });
            handleStepChange("order");
          }
        }}
      />
    </motion.section>
  );
};

export default MealInfo;
