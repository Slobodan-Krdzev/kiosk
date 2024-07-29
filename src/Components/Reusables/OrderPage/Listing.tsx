import { MealType } from "../../../Types/Types";
import MealCard from "./MealCard";

type ListingPropsType = {
  meals: MealType[];
};

const Listing = ({ meals }: ListingPropsType) => {
  if (meals.length) {
    return (
      <div className="mealsListing">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    );
  }

  return <div>Listing</div>;
};

export default Listing;
