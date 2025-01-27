import { useEffect, useRef, useState } from "react";
import { Product, ThemeType } from "../../../../Types/Types";
import MealCard from "../MealCard/MealCard";
import styles from "./ListingStyles.module.css";

type ListingPropsType = {
  products: Product[];
  selectedCategory: number;
  theme: ThemeType;
  isRibbonVisible: boolean;
  removeOutOfStockProduct: (id: number) => void;
};

const Listing = ({
  products,
  selectedCategory,
  theme,
  isRibbonVisible,
  removeOutOfStockProduct,
}: ListingPropsType) => {
  
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  const getDynamicScrollOffset = () => {
    let offset;

    if (screenWidth < 480) {
      offset = "38vh";
    } else if (screenWidth < 770) {
      offset = `27vh`;
    } else if (screenWidth < 805) {
      offset = `24.7vh`;
    } else {
      offset = `36.3vh`;
    }

    return offset;
  };

  if (products.length) {
    return (
      <div
        className={`hideScrollBar ${styles.mealsListing}`}
        ref={containerRef}
        style={{
          height: isRibbonVisible
            ? `calc(100% - ${getDynamicScrollOffset()} )`
            : ``,
        }}
      >
        {products.map((p) => (
          <MealCard
            key={p.ProductId}
            product={p}
            theme={theme}
            removeOutOfStockProduct={removeOutOfStockProduct}
          />
        ))}
      </div>
    );
  }

  return <div>Listing</div>;
};

export default Listing;
