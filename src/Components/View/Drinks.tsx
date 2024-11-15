import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { DrinksType, Option } from "../../Types/Types";
import BigerHeading from "../Reusables/BigerHeading";
import DrinksCard from "../Reusables/DrinksCard";
import RedTopTexture from "../Reusables/RedTopTexture";

const Drinks = () => {
  const { data, theme } = useContext(DataContext);
  // const { handleStepChange } = useContext(StepContext);
  const { setDrinks,  singleMeal } = useContext(OrderContext);
  const [selectedDrinks, setSelectedDrinks] = useState<
    DrinksType[] | undefined
  >([]);

  const drinkOptions =
    data.TMKData[0].UpsaleColletions[0].UpsaleSteps[4].Options;

  const handleAddDrink = (drink: Option) => {
    const formatedDrink: DrinksType = {
      drink,
      quantity: 1,
      total: drink.Price,
    };

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
    const filteredDrinks =
      selectedDrinks &&
      selectedDrinks.map((d) => {
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
  }, [selectedDrinks]);

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
              theme={theme}
            />
          ))}
        </div>
      </div>

      {/* <UpgradeBottomRibbon>
        <div className="bottomRibbonBtnWrapper">
          <button
            className="bottomRibbonBtn fontRaleway"
            style={{ borderColor: theme.activeTextColor }}
            onClick={() => {
              handleStepChange("sides");
            }}
          >
            Cancel
          </button>
          <p>3/5</p>
          <button
            className="bottomRibbonBtn fontRaleway"
            style={{
              backgroundColor: theme.activeTextColor,
            }}
            onClick={() => {
              handleStepChange("checkout");
              placeMealInOrders(singleMeal);
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon> */}
    </section>
  );
};

export default Drinks;
