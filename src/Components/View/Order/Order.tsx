import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { Product } from "../../../Types/Types";
import Logo from "../../Reusables/Logo";
import CategoryCard from "../../Reusables/OrderPage/CategoryCard/CategoryCard";
import Listing from "../../Reusables/OrderPage/Listing/Listing";
import styles from "./OrderStyles.module.css";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";

const Order = () => {
  const { data, allProducts, allCategories, theme } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);
  const { getOrderTotal, orders } = useContext(OrderContext);

  const [isBottomRibbonVisible, setIsBottomRibbonVisible] = useState(true);
  const scrollingDiv = useRef<HTMLDivElement>(null);
  const prevScrollTop = useRef(0);

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


  // NE JA KORISTIME DOKOLKU NE SE ODLUCI ZA ANIMACIJATA ZA BOTTOM RIBBON
  useEffect(() => {
    const handleScroll = () => {
      if (scrollingDiv.current) {
        const { scrollTop } = scrollingDiv.current;

        // Proverka na scroll direction
        if (scrollTop > prevScrollTop.current) {
          // ovde se scrolla nadole
          setIsBottomRibbonVisible(false);
        } else {
          // ovde se scrolla nagore
          setIsBottomRibbonVisible(true);
        }

        // Update na previus scroll pozicija
        prevScrollTop.current = scrollTop;
      }
    };

    const targetDiv = scrollingDiv.current;
    targetDiv!.addEventListener("scroll", handleScroll);

    return () => targetDiv!.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.section
      key={"order"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      
      className={`fullScreenTablet ${styles.orderView}`}
      style={{ backgroundImage: `url('${data.ThemeResponse.CoverImage.Url}')` }}
    >
      <div className={styles.orderViewLogoWrapperTop}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={60} />
      </div>
      <div className={styles.orderViewMidSection}>
        <div className={` ${styles.orderViewSidebar}`}>
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

        <div className={styles.orderViewRightSide} ref={scrollingDiv}>
          <div className={styles.promoBanner} > promo goes here </div>
          <Listing
            products={mealsToDisplay}
            selectedCategory={selectedCategory}
            theme={theme}
            isRibbonVisible={orders.length > 0}
          />
        </div>
      </div>

      {/* RIBBON */}
      {orders.length > 0 && isBottomRibbonVisible && (
        <BottomGreenRibbon animate>
          <div
            className={styles.bottomRibbonContent}
            style={{
              justifyContent: total > 0 ? "space-between" : "center",
              backgroundColor: theme.activeTextColor,
            }}
            onClick={() => {
              handleStepChange("checkout");
            }}
          >
            <div className={styles.ribbonContentWrapper}>
              <svg
                className={styles.ribbonIcon}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.0591 19.1529H10.5649C10.1603 19.1446 9.7589 19.2285 9.39061 19.3982C9.02235 19.568 8.69655 19.8194 8.43742 20.1336C8.17829 20.4479 7.99244 20.8171 7.89363 21.2139C7.79483 21.6106 7.7856 22.0248 7.86664 22.4256L10.8348 37.4254C10.9609 38.0505 11.3 38.6115 11.7931 39.0099C12.2861 39.4086 12.9018 39.62 13.5331 39.6072H36.091C36.7224 39.62 37.3381 39.4086 37.8311 39.0099C38.3241 38.6115 38.6633 38.0505 38.7893 37.4254L41.7574 22.4256C41.8384 22.0248 41.8292 21.6106 41.7304 21.2139C41.6317 20.8171 41.4458 20.4479 41.1867 20.1336C40.9274 19.8194 40.6017 19.568 40.2334 19.3982C39.8651 19.2285 39.4639 19.1446 39.0591 19.1529Z"
                  stroke="#202020"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30.2089 9.60742L35.6055 19.1527"
                  stroke="#202020"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.0189 19.1527L19.4155 9.60742"
                  stroke="#202020"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className={`fontSF ${styles.ribbonTextStyles}`}>
                {orders.length} 
              </span>
            </div>

            <p className={`fontSF ${styles.ribbonTextStyles}`}>
              View Order &rsaquo;
            </p>

            <p className={`fontSF ${styles.ribbonTextStyles}`}>{total} {data.ThemeResponse.CurrencySettings.CurrencySymbol}</p>
          </div>
        </BottomGreenRibbon>
      )}
    </motion.section>
  );
};

export default Order;
