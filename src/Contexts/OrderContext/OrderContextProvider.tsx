import { useState } from "react";
import { DrinksType, Option, Product, SingleMealType } from "../../Types/Types";
import { OrderContext, OrderContextValue } from "./OrderContext";

type OrderContextProviderPropsType = {
  children: JSX.Element;
};

const OrderContextProvider = ({ children }: OrderContextProviderPropsType) => {
  const startingMealFormula = {
    id: 1,
    product: undefined,
    image: undefined,
    isTakeaway: false,
    menuUpgrade: undefined,
    supersize: undefined,
    extras: undefined,
    drinks: undefined,
    sides: undefined,
    originalTotal: 0,
    totalPrice: 0,
    quantity: 1,
  };

  const [orders, setOrders] = useState<SingleMealType[]>([]);
  const [singleMeal, setSingleMeal] =
    useState<SingleMealType>(startingMealFormula);

  const setTakeaway = () => setSingleMeal({ ...singleMeal, isTakeaway: true });
  const setMeal = (product: Product) =>
    setSingleMeal({ ...singleMeal, product, image: product.SmallPictureUrl });
  const setNoMenu = (option: Option) =>
    setSingleMeal({ ...singleMeal, menuUpgrade: option });
  const setMenuUpgrade = (option: Option) =>
    setSingleMeal({ ...singleMeal, menuUpgrade: option });
  const setNoSupersize = (option: Option) =>
    setSingleMeal({ ...singleMeal, supersize: option });
  const setSupersizeUpgrade = (option: Option) =>
    setSingleMeal({ ...singleMeal, supersize: option });
  const setExtras = (extras: Option[]) =>
    setSingleMeal({ ...singleMeal, extras });
  const setSides = (sides: Option[]) => setSingleMeal({ ...singleMeal, sides });
  const setDrinks = (drinks: DrinksType[]) =>
    setSingleMeal({ ...singleMeal, drinks });

  const placeMealInOrders = (meal: SingleMealType) => {
    const startingPrice = meal.product!.Price;

    if (meal.menuUpgrade) {
      const menuUpgradePrice = meal.menuUpgrade!.Price;
      const supersizePrice = meal.supersize!.Price;
      const extrasPrice = meal.extras!.reduce((a, b) => a + b.Price, 0);
      const sidesPrice = meal.sides!.reduce((a, b) => a + b.Price, 0);
      const drinksPrice = meal.drinks!.reduce((a, b) => a + b.total, 0);

      const finalPrice =
        startingPrice! +
        menuUpgradePrice +
        supersizePrice +
        extrasPrice +
        sidesPrice! +
        drinksPrice;

      const finnishedMeal: SingleMealType = {
        id: meal.product!.ProductId,
        product: meal.product,
        image: meal.product!.SmallPictureUrl,
        isTakeaway: meal.isTakeaway,
        menuUpgrade: meal.menuUpgrade,
        supersize: meal.supersize,
        extras: meal.extras,
        sides: meal.sides,
        drinks: meal.drinks,
        originalTotal: finalPrice,
        totalPrice: finalPrice,
        quantity: meal.quantity,
      };

      setOrders([...orders, finnishedMeal]);
      setSingleMeal(startingMealFormula);
    } else {
      const finnishedMeal: SingleMealType = {
        id: meal.product!.ProductId,
        product: meal.product,
        image: meal.product!.SmallPictureUrl,
        isTakeaway: meal.isTakeaway,
        menuUpgrade: meal.menuUpgrade,
        supersize: meal.supersize,
        extras: meal.extras,
        sides: meal.sides,
        drinks: meal.drinks,
        originalTotal: startingPrice,
        totalPrice: startingPrice,
        quantity: meal.quantity,
      };

      setOrders([...orders, finnishedMeal]);
      setSingleMeal(startingMealFormula);
    }
  };

  const setSingleMealQuantity = (
    meal: SingleMealType,
    countType: "minus" | "plus"
  ) => {
    const filteredOrders = orders.map((o) => {
      if (o.product!.ProductId === meal.id) {

        const originalTotal = o.originalTotal;
        const newQuantity =
          countType === "minus" ? o.quantity - 1 : o.quantity + 1;

        if (newQuantity < 1) return o;

        const newTotal = originalTotal * newQuantity;
        return {
          ...o,
          quantity: newQuantity,

          totalPrice: newTotal,
        };
      } else {
        return o;
      }
    });

    setOrders(filteredOrders);
  };

  const cancelOrder = () => {
    setOrders([]);
    setSingleMeal(startingMealFormula);
  };

  const getOrderTotal = () =>
    +orders.reduce((a, b) => a + b.totalPrice, 0).toFixed(2);

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
    getOrderTotal,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
