import { useEffect, useRef } from "react";
import { Product, ThemeType } from "../../../../Types/Types";
import MealCard from "../MealCard/MealCard";
import styles from "./ListingStyles.module.css";

type ListingPropsType = {
  products: Product[];
  selectedCategory: number;
  theme: ThemeType;
  isRibbonVisible: boolean;
};

const Listing = ({
  products,
  selectedCategory,
  theme,
  isRibbonVisible,
}: ListingPropsType) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  console.log(isRibbonVisible);
  

  if (products.length) {
    return (
      <div
        className={`hideScrollBar ${styles.mealsListing}`}
        ref={containerRef}
        style={{
          height: `calc(100vh - ${isRibbonVisible ? "286px" :  "200px" })`
        }}
      >
        {products.map((p) => (
          <MealCard key={p.ProductId} product={p} theme={theme} />
        ))}
      </div>
    );
  }

  return <div>Listing</div>;
};

export default Listing;
