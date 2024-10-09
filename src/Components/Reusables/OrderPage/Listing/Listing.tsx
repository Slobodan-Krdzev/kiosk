import { useEffect, useRef } from "react";
import { Product, ThemeType } from "../../../../Types/Types";
import MealCard from "../MealCard/MealCard";
import styles from"./ListingStyles.module.css"

type ListingPropsType = {
  products: Product[];
  selectedCategory: number;
  theme:ThemeType
};

const Listing = ({ products, selectedCategory, theme }: ListingPropsType) => {

  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {

    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Use 'auto' for instant scroll without animation
      });
    }

  }, [selectedCategory])

  if (products.length) {
    return (
      <div className={styles.mealsListing} ref={containerRef}>
        {products.map((p) => (
          <MealCard key={p.ProductId} product={p} theme={theme}/>
        ))}
      </div>
    );
  }

  return <div>Listing</div>;
};

export default Listing;
