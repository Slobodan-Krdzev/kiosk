import { useEffect, useRef } from "react";
import { Product } from "../../../Types/Types";
import MealCard from "./MealCard";

type ListingPropsType = {
  products: Product[];
  selectedCategory: number
};

const Listing = ({ products, selectedCategory }: ListingPropsType) => {
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
      <div className="mealsListing" ref={containerRef}>
        {products.map((p) => (
          <MealCard key={p.ProductId} product={p} />
        ))}
      </div>
    );
  }

  return <div>Listing</div>;
};

export default Listing;
