import { motion } from "framer-motion";
import { Product, ThemeType } from "../../../Types/Types";
import AlergenItem from "../../Reusables/AlergenItem/AlergenItem";
import UpgradeBottomRibbon from "../../Reusables/UpgradeBottomRibbon/UpgradeBottomRibbon";
import styles from "./MealInfoStyles.module.css";
import { useContext } from "react";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import Pregnancy from "../../Reusables/SVG/Pregnancy";
import Vegan from "../../Reusables/SVG/Vegan";
import Spicy from "../../Reusables/SVG/Spicy";
import Vegeterian from "../../Reusables/SVG/Vegeterian";

type MealInfoPropsType = {
  meal: Product;
  theme: ThemeType;
};

const MealInfo = ({ meal, theme }: MealInfoPropsType) => {
  const { placeMealInOrders } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);

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
            <AlergenItem bgColor="#BB6BD9" text="Not suitable for pregnancy">
              <Pregnancy />
            </AlergenItem>
          )}
          {true && (
            <AlergenItem bgColor="#219653" text="Vegan">
              <Vegan />
            </AlergenItem>
          )}
          {true && (
            <AlergenItem bgColor="#FF9500" text="Spicy">
              <Spicy />
            </AlergenItem>
          )}
          {true && (
            <AlergenItem bgColor="#235F0A" text="Vegeterian">
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

        {Boolean(meal.ProductsTags.length) && (
          <div style={{ margin: "2rem 0 0" }}>
            <p>Allergens</p>
            <div></div>
          </div>
        )}
      </div>

      <UpgradeBottomRibbon
        nextText="Add to Basket"
        backStep={"order"}
        nextStep={meal.HasUpsaleCollection ? "menuUpgrade" : "order"}
        disableNextBtn={false}
        nextAction={() => {
          if (meal.HasUpsaleCollection) {
            console.log("HAS UPSALE");
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
            });
            handleStepChange("order");
          }
        }}
      />
    </motion.section>
  );
};

export default MealInfo;
