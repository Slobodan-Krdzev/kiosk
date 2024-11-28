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
import Backet from "../../Reusables/SVG/Backet";

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
          {/* <div className={styles.promoBanner} > promo goes here </div> */}
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
              <Backet />

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
