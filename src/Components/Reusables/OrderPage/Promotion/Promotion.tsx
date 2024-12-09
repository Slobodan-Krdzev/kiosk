import "swiper/css";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "../../../../Types/Types";
import PromotionSlide from "./PromotionSlide/PromotionSlide";
import styles from "./PromotionStyles.module.css";

type PromotionPropsType = {
  products: Product[];
};

const Promotion = ({ products }: PromotionPropsType) => {

    
  return (
    <div className={styles.promotionWrapper}>
      <Swiper autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}  modules={[ Autoplay]} className={styles.swiper}>
        {products.map((p) => (
          <SwiperSlide key={p.ProductId}>
            <PromotionSlide product={p}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Promotion;
