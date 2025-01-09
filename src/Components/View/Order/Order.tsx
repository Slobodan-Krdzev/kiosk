import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { Product } from "../../../Types/Types";
import Logo from "../../Reusables/Logo";
import Listing from "../../Reusables/OrderPage/Listing/Listing";
import styles from "./OrderStyles.module.css";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import Backet from "../../Reusables/SVG/Backet";
import { useTranslation } from "react-i18next";
import Promotion from "../../Reusables/OrderPage/Promotion/Promotion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Order = () => {
  const { data, allProducts, allCategories, theme } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);
  const { getOrderTotal, orders } = useContext(OrderContext);
  const { t } = useTranslation();

  const [isBottomRibbonVisible] = useState(true);
  const scrollingDiv = useRef<HTMLDivElement>(null);

  const total = getOrderTotal();

  // OVA KE GO KORISTIME za monthly specials
  const [monthlySpecials] = useState<Product[]>(allProducts.filter(p => p.IsPromotion))

  const [outOfStockProducts, setOutOfStockProducts] = useState<number[]>([])

  const [selectedCategory, setselectedCategory] = useState(
    allCategories[0].SubCategoryId
  );

  const [mealsToDisplay, setMealsToDisplay] = useState<Product[]>(
    allProducts.filter(
      (p) => p.SubCategoryId === selectedCategory && p.OutOfStock === false && !outOfStockProducts.includes(p.ProductId)
    )
  );


  const handleCategoryChange = (catID: number) => {
    setselectedCategory(catID);

    //OVDE SE MENAT JADENJATA NA RENDER
    const filteredProducts: Product[] = allProducts.filter(
      (p) => p.SubCategoryId === catID && p.OutOfStock === false
    );

    setMealsToDisplay(filteredProducts);
  };

  useEffect(() => {
    const filteredProducts = allProducts.filter(
      (p) =>
        p.SubCategoryId === selectedCategory &&
        p.OutOfStock === false &&
        !outOfStockProducts.includes(p.ProductId) 
    );
    setMealsToDisplay(filteredProducts);
  }, [allProducts, selectedCategory, outOfStockProducts])

  const removeOutOfStockProduct = (id: number) => {

    setOutOfStockProducts([...outOfStockProducts, id])
  }

  console.log("Orders from orfers screen", orders);

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
        <Swiper
          className={`${styles.orderViewSidebar}`}
          direction="vertical" 
          slidesPerView={10}
          spaceBetween={14}
          style={{ height: "auto" }} 
        >
          {allCategories.map((category) => (
            <SwiperSlide
              key={category.SubCategoryId}
              className={styles.categoryCard}
              style={{
                backgroundColor:
                  selectedCategory === category.SubCategoryId
                    ? `${theme.activeTextColor}90`
                    : "#FFFFFF",
                border:
                  selectedCategory === category.SubCategoryId
                    ? `1px solid ${theme.activeTextColor}`
                    : "",
              }}
              onClick={() => {
                handleCategoryChange(category.SubCategoryId);
              }}
            >
              
              <img
                src={"/category.png"}
                alt={category.Name.toLowerCase()}
                className={styles.image}
              />
              <p
                className={`fontSF ${styles.categoryCardText}`}
                style={{ color: 'black' }}
              >
                {category.Name.length > 15 ? `${category.Name.substring(0, 5)}...` : category.Name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.orderViewRightSide} ref={scrollingDiv}>
          {/* USLOV  */}
          {Boolean(monthlySpecials.length) && <Promotion products={monthlySpecials} />}
          <Listing
            products={mealsToDisplay}
            selectedCategory={selectedCategory}
            theme={theme}
            isRibbonVisible={orders.length > 0}
            removeOutOfStockProduct={removeOutOfStockProduct}
          />
        </div>
      </div>

      {/* RIBBON */}
      {orders.length > 0 && isBottomRibbonVisible && (
        <BottomGreenRibbon animate>
          <div
            className={`bottomRibbonButton ${styles.bottomRibbonContent}`}
            style={{
              justifyContent: total > 0 ? "space-between" : "center",
              backgroundColor: theme.activeTextColor,
              color: theme.textColor,
            }}
            onClick={() => {
              handleStepChange("checkout");
            }}
          >
            <div className={styles.ribbonContentWrapper}>
              <Backet color={theme.textColor} />

              <span className={`fontSF `}>{orders.length}</span>
            </div>

            <p className={`fontSF `}>{t("view_order")} &rsaquo;</p>

            <p className={`fontSF `}>{total} </p>
          </div>
        </BottomGreenRibbon>
      )}
    </motion.section>
  );
};

export default Order;
