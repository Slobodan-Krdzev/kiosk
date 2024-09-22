import { useState } from "react";
import { meals } from "../../Data/Meals";
import { MainCategory2, Product } from "../../Types/Types";
import BottomGreenRibbon from "../Reusables/BottomGreenRibbon";
import Logo from "../Reusables/Logo";
import CategoryCard from "../Reusables/OrderPage/CategoryCard";
import Listing from "../Reusables/OrderPage/Listing";
import SpecialPromo from "../Reusables/OrderPage/SpecialPromo";
import { useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

const Order = () => {

  const { data } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);
  const { getOrderTotal, orders } = useContext(OrderContext);

  const allCategories = data.TMKData[0].MainCategories

  const getAllProducts = (categories: MainCategory2[]) => {
    return categories.flatMap(category => 
      category.SubCategories.flatMap(subCategory => 
        subCategory.Products.map(p => p)
      )
    );
  };

  const total = getOrderTotal();
  const allProducts = getAllProducts(allCategories)

  const [selectedCategory, setselectedCategory] = useState(data.TMKData[0].MainCategories[0].MainCategoryId);
  const [mealsToDisplay, setMealsToDisplay] = useState<Product[]>(allProducts.filter(p => p.MainCategoryId === selectedCategory));

  const specialOfferItem = meals.find((meal) => meal.mothlySpecial);

  const handleCategoryChange = (catID: number) => {
    setselectedCategory(catID);

    //OVDE SE MENAT JADENJATA NA RENDER  
    const filteredProducts: Product[] = allProducts.filter(p => p.MainCategoryId === catID)

    setMealsToDisplay(filteredProducts)
  };

  
  
  return (
    <section className="startScreen" style={{backgroundImage: `url('${data.ThemeResponse.CoverImage.Url}')`}}>
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
          <Logo source={data.ThemeResponse.LogoImage.Url} width={166} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
            padding: "2rem 1rem",
            backgroundColor: "white",
            minHeight: "71%",
            maxHeight: "79%",
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
                key={category.MainCategoryId}
                category={category}
                currentCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
              />
            ))}
          </div>

          {/* MAIN */}
          <div style={{ flexBasis: "78%" }}>
            {specialOfferItem && <SpecialPromo item={specialOfferItem} />}

            <Listing products={mealsToDisplay} selectedCategory={selectedCategory}/>
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
