import { useContext, useEffect, useState } from "react";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import BigerHeading from "../Reusables/BigerHeading";
import DrinksCard from "../Reusables/DrinksCard";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { DrinksType } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";

const drinks = [
  {
    id: 1,
    name: "Coca Cola",
    price: 1.2,
    image: "/coke.png",
  },
  {
    id: 2,
    name: "Coca Cola2",
    price: 1.4,
    image: "/coke.png",
  },
  {
    id: 3,
    name: "Coca Cola3",
    price: 4.4,
    image: "/coke.png",
  },
  {
    id: 4,
    name: "Coca Cola4",
    price: 1.4,
    image: "/coke.png",
  },
  {
    id: 5,
    name: "Coca Cola5",
    price: 2.4,
    image: "/coke.png",
  },
  {
    id: 6,
    name: "Coca Cola6",
    price: 3.4,
    image: "/coke.png",
  },
];

const Drinks = () => {
  const { handleStepChange } = useContext(StepContext);
  const { setDrinks, placeMealInOrders, singleMeal } = useContext(OrderContext);
  const [selectedDrinks, setSelectedDrinks] = useState<
    {
      id: number;
      name: string;
      price: number;
      quntity: number;
      totalPrice: number;
    }[]
  >([]);

  const handleAddDrink = (drink: DrinksType) => {
    const formatedDrink: DrinksType = {
      id: drink.id,
      name: drink.name,
      price: drink.price,
      quntity: drink.quntity,
      totalPrice: drink.price * drink.quntity,
    };

    setSelectedDrinks([...selectedDrinks, formatedDrink]);
  };

  const handleRemoveDrink = (id: number) => {
    const formatedDrinks = selectedDrinks.slice().filter((d) => d.id !== id);

    setSelectedDrinks(formatedDrinks);
  };

  const handeAddQuantityToDrink = (drink: {
    id: number;
    name: string;
    price: number;
    quntity: number;
    totalPrice: number;
  }) => {
    const filteredDrinks = selectedDrinks.map((d) => {
      if (d.id === drink.id) {
        return { ...d, quntity: drink.quntity, totalPrice: drink.totalPrice };
      } else {
        return d;
      }
    });

    setSelectedDrinks(filteredDrinks);
  };

  useEffect(() => {
    setDrinks(selectedDrinks);

  }, [selectedDrinks]);

  return (
    <section className="fullScreen">
      <RedTopTexture>
        <div className="extrasWrapper">
          <img src={`/${singleMeal.image}`} alt="Image" />
          <p className="smallMessage">{singleMeal.meal?.name} {singleMeal.menuUpgrade && 'Menu'}</p>
        </div>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading text={"Choose your sides"} fontSize={40} />

        <div className="extrasWrapper">
          {drinks.map((extra) => (
            <DrinksCard
              key={extra.id}
              extra={extra}
              text={extra.name}
              image={extra.image}
              price={extra.price}
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
              placeMealInOrders(singleMeal)
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
