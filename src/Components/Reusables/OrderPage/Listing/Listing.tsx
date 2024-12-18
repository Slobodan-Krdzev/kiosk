import { useEffect, useRef, useState } from "react";
import { Product, ThemeType } from "../../../../Types/Types";
import MealCard from "../MealCard/MealCard";
import styles from "./ListingStyles.module.css";

type ListingPropsType = {
  products: Product[];
  selectedCategory: number;
  theme: ThemeType;
  isRibbonVisible: boolean
};

const Listing = ({
  products,
  selectedCategory,
  theme,
  isRibbonVisible
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
    
    if(screenWidth < 480){
      offset = '60vh'
    }
    else if(screenWidth < 770){
      offset = `45.3vh`

    }else if(screenWidth < 805){
      offset = `42.3vh`
      
    }else {
      offset = `36.3vh`

    }

    return offset
  }

  if (products.length) {
    return (
      <div
        className={`hideScrollBar ${styles.mealsListing}`}
        ref={containerRef}
        style={{
          // height: isRibbonVisible ?  `calc(100% - 24.3vh - 157px)` : ``
            height: isRibbonVisible ?  `calc(100% - ${getDynamicScrollOffset()} )` : ``

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
