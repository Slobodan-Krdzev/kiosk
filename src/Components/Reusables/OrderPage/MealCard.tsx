import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import {  Product } from "../../../Types/Types";
// import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";

type MealCardPropsType = {
  product: Product;
};

const MealCard = ({ product: {Name, SmallPictureUrl, Price} }: MealCardPropsType) => {

  const {handleStepChange} = useContext(StepContext)
  // const {setMeal} = useContext(OrderContext)

  return (
    <div className="mealCard">
      <div style={{ position: "relative", height: "100%" }}>
        <img
          src={`${SmallPictureUrl}`}
          alt={Name}
          style={{ width: 126, height: 95, margin: "0 1.2rem" }}
        />
        <p>{Name}</p>

        <p style={{ position: "absolute", bottom: 10, fontSize: "15px" }}>
          {Price}
        </p>
        <button
          style={{ position: "absolute", bottom: 0, right: 0 }}
          onClick={() => {

            handleStepChange('menuUpgrade')

            // ovde se setira productot koj e izbran
            // setMeal(product)
          }}
        >
          <img src="/plus.png" alt="Add" />
        </button>
      </div>
    </div>
  );
};

export default MealCard;
