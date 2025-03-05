import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { Product } from "../../../Types/Types";
import BottomFixedShadowLayer from "../../Reusables/BottomFixedShadowLayer/BottomFixedShadowLayer";
import BottomOrderInfo from "../../Reusables/BottomOrderInfo/BottomOrderInfo";
import Logo from "../../Reusables/Logo";
import Listing from "../../Reusables/OrderPage/Listing/Listing";
import Promotion from "../../Reusables/OrderPage/Promotion/Promotion";
import Chevron from "../../Reusables/SVG/Chevron";
import TopFixedRibbon from "../../Reusables/TopFixedRibbon/TopFixedRibbon";
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";
import XButton from "../../Reusables/XButton/XButton";
import styles from "./OrderStyles.module.css";
import { UpsaleContext } from "../../../Contexts/UpsaleContext/UpsaleContext";
import DefaultButton from "../../Reusables/DefaultButton/DefaultButton";
import Modal from "../../Reusables/Modal";
import { t } from "i18next";
import SmallOrderTypeSelector from "../../Reusables/SmallOrderTypeSelector/SmallOrderTypeSelector";
import SlideUpModal from "../../Reusables/SlideUpModal/SlideUpModal";
import MealInfo from "../../Reusables/MealInfo/MealInfo";

const Order = () => {
  const { data, allProducts, allCategories, theme } = useContext(DataContext);
  const { handleStepChange, mealForInfo } = useContext(StepContext);
  const { getOrderTotal, orders, cancelOrder } = useContext(OrderContext);
  const { resetUpsale } = useContext(UpsaleContext);

  const [isCancelmodalOpen, setIsCancelModalOpen] = useState(false);
  const [isBottomRibbonVisible] = useState(true);
  const scrollingDiv = useRef<HTMLDivElement>(null);

  const total = getOrderTotal();

  // OVA KE GO KORISTIME za monthly specials
  const [monthlySpecials] = useState<Product[]>(
    allProducts.filter((p) => p.IsPromotion)
  );

  const [outOfStockProducts, setOutOfStockProducts] = useState<number[]>([]);

  const [selectedCategory, setselectedCategory] = useState(
    allCategories[0].SubCategoryId
  );

  const [mealsToDisplay, setMealsToDisplay] = useState<Product[]>(
    allProducts.filter(
      (p) =>
        p.SubCategoryId === selectedCategory &&
        p.OutOfStock === false &&
        !outOfStockProducts.includes(p.ProductId)
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
  }, [allProducts, selectedCategory, outOfStockProducts]);

  const removeOutOfStockProduct = (id: number) => {
    setOutOfStockProducts([...outOfStockProducts, id]);
  };

  const handleXBtnClick = () => {
    setIsCancelModalOpen(true);
  };

  const cancelOrderClick = () => {
    handleStepChange("start");
    resetUpsale();
    cancelOrder();
  };

  console.log("Orders from orfers screen", orders);

  return (
    <ViewFullScreenAnimated framerKey={"order"}>
      <TopFixedRibbon justifyContent={"space-between"} style={{
        alignItems: 'stretch'
      }}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={40} />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "3vw",
            flexBasis: "50%",
          }}
        >
          <SmallOrderTypeSelector />
          <XButton clickHandler={handleXBtnClick} />
        </div>
      </TopFixedRibbon>

      <div className={styles.orderViewMidSection}>
        <Swiper
          className={`${styles.orderViewSidebar}`}
          direction="vertical"
          slidesPerView={6}
          spaceBetween={14}
        >
          {allCategories.map((category) => (
            <SwiperSlide
              key={category.SubCategoryId}
              className={styles.categoryCard}
              style={{
                background:
                  selectedCategory === category.SubCategoryId
                    ? `${theme.activeTextColor}60`
                    : `radial-gradient(100% 92% at 98% 0%, ${theme.activeTextColor}40 0%, rgba(255, 255, 255, 0) 93%) `,

                position: "relative",
                border:
                  selectedCategory === category.SubCategoryId
                    ? `1px solid ${theme.activeTextColor}`
                    : `0.35px solid #a8a8a86d`,
              }}
              onClick={() => {
                handleCategoryChange(category.SubCategoryId);
              }}
            >
              <img
                src={"/alcohol.png"}
                alt={category.Name.toLowerCase()}
                className={styles.image}
              />
              <p
                className={styles.categoryCardText}
                style={{ color: "#383838" }}
              >
                {category.Name.length > 15
                  ? `${category.Name.substring(0, 5)}...`
                  : category.Name}
              </p>

              {selectedCategory === category.SubCategoryId && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15,
                    ease: "easeInOut",
                  }}
                  className={styles.absoluteChevron}
                >
                  <Chevron color={"#3F3F3F"} />
                </motion.div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.orderViewRightSide} ref={scrollingDiv}>
          {/* USLOV  */}
          {Boolean(monthlySpecials.length) && (
            <Promotion products={monthlySpecials} />
          )}
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
      <AnimatePresence mode="wait">
        {orders.length > 0 && isBottomRibbonVisible && (
          <BottomFixedShadowLayer>
            <>
              <BottomOrderInfo
                clickHandler={() => handleStepChange("checkout")}
                total={total}
                numberOfProductsInCart={orders.length}
                nextText={t("view_order")}
                width={"100%"}
              />
            </>
          </BottomFixedShadowLayer>
        )}
      </AnimatePresence>

      {isCancelmodalOpen && (
        <Modal borderColor={theme.activeTextColor}>
          <>
            <h2
              style={{ textAlign: "center", fontSize: "2.6vw", width: "60%" }}
              className={`fontCustom1 paymentPagesSubtitle`}
            >
              {t('cancel_order_modal_question')}
            </h2>
            <div className={`modalBtnsWrapper`}>
              <DefaultButton
                clickHandler={() => setIsCancelModalOpen(false)}
                style={{
                  height: "100%",
                  minHeight: "70px",
                  width: "100%",
                }}
              >
                {t('back_Btn')}
              </DefaultButton>
              <DefaultButton
                clickHandler={cancelOrderClick}
                style={{
                  height: "100%",
                  backgroundColor: "#FF4F4F",
                  color: "white",
                  width: "100%",
                  border: '1px solid #FF4F4F'
                }}
              >
                {t('yes')}
              </DefaultButton>
            </div>
          </>
        </Modal>
      )}

      {"product" in mealForInfo &&
        Object.keys(mealForInfo.product).length !== 0 && (
          <SlideUpModal>
            <>
              <MealInfo
                meal={mealForInfo.product!}
                availability={mealForInfo.availability}
              />
            </>
          </SlideUpModal>
        )}
    </ViewFullScreenAnimated>
  );
};

export default Order;
