import { useState } from "react";
import { meals } from "../../Data/Meals";
import { MealType } from "../../Types/Types";
import BottomGreenRibbon from "../Reusables/BottomGreenRibbon";
import Logo from "../Reusables/Logo";
import CategoryCard from "../Reusables/OrderPage/CategoryCard";
import Listing from "../Reusables/OrderPage/Listing";
import SpecialPromo from "../Reusables/OrderPage/SpecialPromo";
import { useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../Contexts/StepContext/StepContext";

const Order = () => {
  const { getOrderTotal, orders } = useContext(OrderContext);
  const { handleStepChange } = useContext(StepContext);

  const [selectedCategory, setselectedCategory] = useState("");
  const [mealsToDisplay, setMealsToDisplay] = useState<MealType[]>(meals);

  const allCategories = Array.from(new Set(meals.map((meal) => meal.category)));
  const specialOfferItem = meals.find((meal) => meal.mothlySpecial);

  const handleCategoryChange = (cat: string) => {
    setselectedCategory(cat);

    setMealsToDisplay(
      meals.slice().filter((meal) => meal.category.toLowerCase() === cat)
    );
  };

  const total = getOrderTotal();

  console.log(total);
  

  return (
    <section className="startScreen">
      <div className="overlay">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Logo width={166} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
            padding: "2rem 1rem",
            backgroundColor: "white",
            minHeight: "71%",
            maxHeight: "71%",
            overflow: "hidden",
          }}
        >
          {/* SIDEBAR */}
          <div
            style={{
              flexBasis: "22%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "75%",
              overflowY: "scroll",
            }}
          >
            {allCategories.map((category) => (
              <CategoryCard
                key={category}
                text={category}
                currentCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
              />
            ))}
          </div>

          {/* MAIN */}
          <div style={{ flexBasis: "78%" }}>
            {specialOfferItem && <SpecialPromo item={specialOfferItem} />}

            <Listing meals={mealsToDisplay} />
          </div>
        </div>

        <BottomGreenRibbon>
          <div
            style={{
              display: "flex",
              justifyContent: total > 0 ? "space-between" : "center",
              alignItems: "center",
              minWidth: "100%",
              minHeight: "148px",
              padding: "0 4rem",
            }}
          >

            {total > 0 && <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor:'pointer' }}
              onClick={() => {
                handleStepChange('checkout')
              }}
            >
              <img src="/basket.png" alt="Basket" />
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  fontFamily: "sans-serif",
                  backgroundColor: "inherit",

                  border: "none",
                }}
              >
                {orders.length}
              </span>
            </div>}
            

            <p
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                fontFamily: "sans-serif",
                backgroundColor: "inherit",

                border: "none",
              }}
            >
              Je Bestelling
            </p>

            {total > 0 && (
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  fontFamily: "sans-serif",
                  backgroundColor: "inherit",

                  border: "none",
                }}
              >
                {total}
              </p>
            )}
          </div>
        </BottomGreenRibbon>
      </div>
    </section>
  );
};

export default Order;
