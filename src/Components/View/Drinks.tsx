import { useContext, useEffect, useState } from "react";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import BigerHeading from "../Reusables/BigerHeading";
import DrinksCard from "../Reusables/DrinksCard";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { DrinksType, Option } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

// const drinks = [
//   {
//     id: 1,
//     name: "Coca Cola",
//     price: 1.2,
//     image: "/coke.png",
//   },
//   {
//     id: 2,
//     name: "Coca Cola2",
//     price: 1.4,
//     image: "/coke.png",
//   },
//   {
//     id: 3,
//     name: "Coca Cola3",
//     price: 4.4,
//     image: "/coke.png",
//   },
//   {
//     id: 4,
//     name: "Coca Cola4",
//     price: 1.4,
//     image: "/coke.png",
//   },
//   {
//     id: 5,
//     name: "Coca Cola5",
//     price: 2.4,
//     image: "/coke.png",
//   },
//   {
//     id: 6,
//     name: "Coca Cola6",
//     price: 3.4,
//     image: "/coke.png",
//   },
// ];

const Drinks = () => {
  const { data } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);
  const { setDrinks, placeMealInOrders, singleMeal } = useContext(OrderContext);
  const [selectedDrinks, setSelectedDrinks] = useState<
    DrinksType[] | undefined
  >([]);

  const drinkOptions =
    data.TMKData[0].UpsaleColletions[0].UpsaleSteps[4].Options;

  const handleAddDrink = (drink: Option) => {
    const formatedDrink: DrinksType = { drink, quantity: 1, total: drink.Price };

    if (!selectedDrinks) {
      setSelectedDrinks([formatedDrink]);
    } else {
      setSelectedDrinks([...selectedDrinks, formatedDrink]);
    }
  };

  const handleRemoveDrink = (drink: Option) => {
    if (selectedDrinks)
      setSelectedDrinks(
        selectedDrinks.slice().filter((d) => d.drink.Id !== drink.Id)
      );
  };

  const handeAddQuantityToDrink = (drink: DrinksType) => {
    const filteredDrinks = selectedDrinks && selectedDrinks.map((d) => {
      if (d.drink.Id === drink.drink.Id) {
        return { ...d, quantity: drink.quantity, total: drink.total };
      } else {
        return d;
      }
    });

    setSelectedDrinks(filteredDrinks);
  };

  useEffect(() => {
    if (selectedDrinks) setDrinks(selectedDrinks);


  console.log("SINGLE MEAL DRINKS", selectedDrinks);

  }, [selectedDrinks]);

  console.log("SINGLE MEAL DRINKS", singleMeal);

  return (
    <section className="fullScreen">
      <RedTopTexture image="">
        <div className="extrasWrapper">
          <img src={`/${singleMeal.image}`} alt="Image" />
          <p className="smallMessage">
            {singleMeal.product!.Name} {singleMeal.menuUpgrade && "Menu"}
          </p>
        </div>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading text={"Choose your sides"} fontSize={40} />

        <div className="extrasWrapper">
          {drinkOptions.map((extra) => (
            <DrinksCard
              key={extra.Id}
              extra={extra}
              addDrink={handleAddDrink}
              removeDrink={handleRemoveDrink}
              addQuantity={handeAddQuantityToDrink}
            />
          ))}
        </div>
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button
            className="cancelBtn"
            onClick={() => {
              handleStepChange("sides");
            }}
          >
            Cancel
          </button>
          <p>3/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("checkout");
              placeMealInOrders(singleMeal);
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon>
    </section>
  );
};

export default Drinks;
