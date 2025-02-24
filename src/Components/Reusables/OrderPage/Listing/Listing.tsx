import { useEffect, useRef, useState } from "react";
import { Product, ThemeType } from "../../../../Types/Types";
import MealCard from "../MealCard/MealCard";
import styles from "./ListingStyles.module.css";
import Loading from "../../../Loading";
import { AnimatePresence } from "framer-motion";

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
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [paddingTop, setPaddingTop] = useState(20);
  const scrollContRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContRef.current;
      if (!container) return;

      const { scrollTop} = container;

      // Reduce paddingTop smoothly as the user scrolls
      setPaddingTop(Math.max(20 - scrollTop, 0));

    };

    const container = scrollContRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedCategory]);

  // const getDynamicScrollOffset = () => {
  //   let offset;

  //   if (screenWidth < 480) {
  //     offset = "26.5vh";
  //   } else if (screenWidth < 770) {
  //     offset = `27vh`;
  //   } else if (screenWidth < 805) {
  //     offset = `24.7vh`;
  //   } else {
  //     offset = `22.8vh`;
  //   }

  //   return offset;
  // };

  if (products.length) {
    return (
      <AnimatePresence mode="wait">
        <div
          className={`hideScrollBar ${styles.mealsListing}`}
          ref={scrollContRef}
          style={{
            paddingTop,
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
      </AnimatePresence>
    );
  }

  return <Loading />;
};

export default Listing;
