import { useState } from "react";
import {
  DrinksType,
  ExtraType,
  MealType,
  SidesType,
  SingleMealType,
} from "../../Types/Types";
import { OrderContext, OrderContextValue } from "./OrderContext";

type OrderContextProviderPropsType = {
  children: JSX.Element;
};


const OrderContextProvider = ({ children }: OrderContextProviderPropsType) => {

  const startingMealFormula = {
    id: 1,
    meal: undefined,
    image: undefined,
    isTakeaway: false,
    menuUpgrade: false,
    supersize: false,
    extras: [],
    drinks: [],
    sides: undefined,
    originalTotal: 0,
    totalPrice: 0,
    quantity: 1,
  }

  const [orders, setOrders] = useState<SingleMealType[]>([]);
  const [singleMeal, setSingleMeal] = useState<SingleMealType>(startingMealFormula);

  const setTakeaway = () => setSingleMeal({ ...singleMeal, isTakeaway: true });
  const setMeal = (meal: MealType) => setSingleMeal({ ...singleMeal, meal, image: meal.img });
  const setNoMenu = () => setSingleMeal({ ...singleMeal, menuUpgrade: false });
  const setMenuUpgrade = () =>
    setSingleMeal({ ...singleMeal, menuUpgrade: true });
  const setNoSupersize = () =>
    setSingleMeal({ ...singleMeal, supersize: false });
  const setSupersizeUpgrade = () =>
    setSingleMeal({ ...singleMeal, supersize: true });
  const setExtras = (extras: ExtraType[]) =>
    setSingleMeal({ ...singleMeal, extras });
  const setSides = (sides: SidesType) =>
    setSingleMeal({ ...singleMeal, sides });
  const setDrinks = (drinks: DrinksType[]) =>
    setSingleMeal({ ...singleMeal, drinks });

  const placeMealInOrders = (meal: SingleMealType) => {
    const startingPrice = meal.meal?.price;
    const menuUpgradePrice = meal.menuUpgrade ? 5.89 : 0;
    const supersizePrice = meal.menuUpgrade ? 5.89 : 0;
    const extrasPrice = meal.extras.length > 0 ? meal.extras.reduce((a, b) => a + b.price, 0) : 0;
    const sidesPrice = meal.sides ? meal.sides?.price : 0;
    const drinksPrice = meal.drinks.length ? meal.drinks.reduce((a, b) => a + b.totalPrice, 0) : 0;

    const finalPrice =
      startingPrice! +
      menuUpgradePrice +
      supersizePrice +
      extrasPrice +
      sidesPrice! +
      drinksPrice;

    const finnishedOrder: SingleMealType = { ...meal, totalPrice: +finalPrice.toFixed(2), originalTotal: +finalPrice.toFixed(2), id: new Date().valueOf()};
    setOrders([...orders, finnishedOrder]);
    setSingleMeal(startingMealFormula)
  };

  const setSingleMealQuantity = (
    meal: SingleMealType,
    countType: "minus" | "plus"
  ) => {
    const filteredOrders = orders.map((o) => {
      if (o.id === meal.id) {

        const originalTotal = o.originalTotal;

        return {
          ...o,
          quantity: countType === "minus" ? o.quantity - 1 : o.quantity + 1,
          totalPrice: originalTotal * ( countType === "minus" ? o.quantity - 1 : o.quantity + 1)
        };
      } else {
        return o;
      }
    });

    setOrders(filteredOrders);
  };

  const cancelOrder = () => {
    setOrders([])
    setSingleMeal(startingMealFormula)
  }

  const getOrderTotal = () => +orders.reduce((a, b) => a + b.totalPrice, 0).toFixed(2)
  

  const contextValue: OrderContextValue = {
    orders,
    singleMeal,
    setTakeaway,
    setMeal,
    setMenuUpgrade,
    setNoMenu,
    setNoSupersize,
    setSupersizeUpgrade,
    setExtras,
    setSides,
    setDrinks,
    placeMealInOrders,
    setSingleMealQuantity,
    cancelOrder,
    getOrderTotal
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
