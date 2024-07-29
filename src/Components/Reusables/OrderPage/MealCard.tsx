import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import { MealType } from "../../../Types/Types";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";

type MealCardPropsType = {
  meal: MealType;
};

const MealCard = ({ meal }: MealCardPropsType) => {

  const {handleStepChange} = useContext(StepContext)
  const {setMeal} = useContext(OrderContext)

  return (
    <div className="mealCard">
      <div style={{ position: "relative", height: "100%" }}>
        <img
          src={`/${meal.img}`}
          alt={meal.name}
          style={{ width: 126, height: 95, margin: "0 1.2rem" }}
        />
        <p>{meal.name}</p>

        <p style={{ position: "absolute", bottom: 10, fontSize: "15px" }}>
          {meal.price}
        </p>
        <button
          style={{ position: "absolute", bottom: 0, right: 0 }}
          onClick={() => {

            handleStepChange('menuUpgrade')
            setMeal(meal)
          }}
        >
          <img src="/plus.png" alt="Add" />
        </button>
      </div>
    </div>
  );
};

export default MealCard;
