import { useState } from "react";
import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { Product } from "../../../Types/Types";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import Logo from "../../Reusables/Logo";
import CategoryCard from "../../Reusables/OrderPage/CategoryCard/CategoryCard";
import Listing from "../../Reusables/OrderPage/Listing/Listing";
import styles from "./OrderStyles.module.css"

const Order = () => {
  const { data, allProducts, allCategories, theme } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);
  const { getOrderTotal, orders } = useContext(OrderContext);

  const total = getOrderTotal();

  const [selectedCategory, setselectedCategory] = useState(
    allCategories[0].SubCategoryId
  );
  const [mealsToDisplay, setMealsToDisplay] = useState<Product[]>(
    allProducts.filter((p) => p.SubCategoryId === selectedCategory)
  );

  const handleCategoryChange = (catID: number) => {
    setselectedCategory(catID);

    //OVDE SE MENAT JADENJATA NA RENDER
    const filteredProducts: Product[] = allProducts.filter(
      (p) => p.SubCategoryId === catID
    );

    setMealsToDisplay(filteredProducts);
  };

  return (
    <section
      className={styles.orderView}
      style={{ backgroundImage: `url('${data.ThemeResponse.CoverImage.Url}')` }}
    >
      <div className={styles.orderViewLogoWrapperTop}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={350} />
      </div>

      <div className={styles.orderViewMidSection}>
        <div className={styles.orderViewSidebar}>
          {allCategories.map((category) => (
            <CategoryCard
              key={category.SubCategoryId}
              category={category}
              currentCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              theme={theme}
            />
          ))}
        </div>

        <div className={styles.orderViewRightSide}>
          <Listing
            products={mealsToDisplay}
            selectedCategory={selectedCategory}
            theme={theme}
          />
        </div>
      </div>

      
        <BottomGreenRibbon>
          <div
          className={styles.bottomRibbonContent}
            style={{
              justifyContent: total > 0 ? "space-between" : "center",
              backgroundColor: theme.activeTextColor,
            }}
          >
            {total > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleStepChange("checkout");
                }}
              >
                <img src="/basket.png" alt="Basket" />
                <span className="mediumSizeDimmedHeading fontraleway" style={{fontWeight: 700}}>
                  {orders.length}
                </span>
              </div>
            )}

            <p className="bottomRibbonHeadingBig fontRaleway">
              Je Bestelling
            </p>

            {total > 0 && (
              <p className="mediumSizeDimmedHeading fontraleway" style={{fontWeight: 700}}>
                {total} {data.ThemeResponse.CurrencySettings.CurrencySymbol}
              </p>
            )}
          </div>
        </BottomGreenRibbon>
    </section>
   
  );
};

export default Order;
