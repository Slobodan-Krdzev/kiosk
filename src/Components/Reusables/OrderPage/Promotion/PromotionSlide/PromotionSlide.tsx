import { useContext } from "react";
import "swiper/css";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { Product } from "../../../../../Types/Types";
import Plus from "../../../SVG/Plus";
import styles from "./PromotionSlideStyles.module.css";
import { useMutation } from "@tanstack/react-query";
import { OrderContext } from "../../../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../../../Contexts/StepContext/StepContext";
import CheckAvailability from "../../../../../Query/CheckAvailability";
import CheckMark from "../../../SVG/CheckMark";

type PromotionSlidePropsType = {
  product: Product;
};

const PromotionSlide = ({ product }: PromotionSlidePropsType) => {
  const { theme } = useContext(DataContext);
  const { mutateAsync } = useMutation({
    mutationFn: CheckAvailability,
  });

  const { handleStepChange, handleSetMealForInfo } = useContext(StepContext);
  const {
    placeMealInOrders,
    setMeal,
    removeMealFromOrders,
    orders
  } = useContext(OrderContext);

  const isMealPlacedInOrders = Boolean(
    orders.find((meal) => meal.id === product.ProductId)
  );

  return (
    <>
      <div
        className={styles.swiperSlide}
        style={{ backgroundColor: `${theme.activeTextColor}98` }}
      >
        <p className={`${styles.slideTitle} fontNoteworthy`}>Monthly Special</p>
        <p className={`fontSF ${styles.productName}`}>
          {product.Name.substring(0, 20)}
        </p>
        <p className={`fontSF ${styles.productPrice}`}> Now {product.Price}</p>

        <img
          src={product.SmallPictureUrl}
          alt={product.Name}
          className={styles.image}
        />

        <button
          disabled={isMealPlacedInOrders}
          style={{ backgroundColor:  theme.activeTextColor }}
          className={styles.Btn}
          onClick={async () => {

            const availability = await mutateAsync(product.ProductId);

            if (product.NoInteraction) {

                handleSetMealForInfo(product, availability);
                handleStepChange("mealInfo");
                
              } else {

                if (!availability) {
                  return;
                }

                if (product.HasUpsaleCollection && !isMealPlacedInOrders) {
                  // ako ima upsale postavuva signleMeal i step change vo upsale

                  setMeal(product);
                  handleStepChange("menuUpgrade");
                } else {
                  if (isMealPlacedInOrders) {
                    removeMealFromOrders(product.ProductId);
                  } else {
                    placeMealInOrders({
                      id: product.ProductId,
                      product: product,
                      image: product.SmallPictureUrl,
                      upsale: undefined,
                      originalTotal: product.Price,
                      totalPrice: product.Price,
                      quantity: 1,
                      note: "",
                    });
                  }
                }
              }
          }}
        >
         {isMealPlacedInOrders ? <CheckMark /> : <Plus />} 
        </button>
      </div>
    </>
  );
};

export default PromotionSlide;
