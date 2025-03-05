import { useState } from "react";
import { Product, SingleMealType } from "../../Types/Types";
import { OrderContext, OrderContextValue } from "./OrderContext";
import { UpsaleData } from "../UpsaleContext/UpsaleContext";
import { v4 as uuidv4 } from 'uuid';

type OrderContextProviderPropsType = {
  children: JSX.Element;
};

const OrderContextProvider = ({ children }: OrderContextProviderPropsType) => {
  const startingMealFormula = {
    id: new Date().valueOf(),
    product: undefined,
    image: undefined,
    upsale: undefined,
    originalTotal: 0,
    totalPrice: 0,
    quantity: 1,
    note: "",
    itemGUI: undefined
  };

  const [orders, setOrders] = useState<SingleMealType[]>([]);
  const [orderNum, setOrderNumber] = useState<string>('')
  const [IdOrder, setIdOrder] = useState<number>(0)

  const [singleMeal, setSingleMeal] =
    useState<SingleMealType>(startingMealFormula);
    
  const setMeal = (product: Product) =>
    setSingleMeal({ ...singleMeal,id: new Date().valueOf(), product, image: product.SmallPictureUrl });

  const getUpsaleTotal = (upsaleData: UpsaleData) => {
    let total = 0;

    for (let i = 0; i < upsaleData.length; i++) {
      const stepTotal = upsaleData[i].stepData.reduce(
        (a, b) => a + b.option.Price * b.quantity,
        0
      );

      total = total + stepTotal;
    }

    return total;
  };

  const placeMealInOrders = (meal: SingleMealType) => {

    const uniqueGUI = uuidv4();

    const startingPrice = meal.product!.Price;
    console.log('Meal od Handler', startingPrice,meal)

    if (meal.upsale !== undefined) {
      const finalPrice = startingPrice! + getUpsaleTotal(meal.upsale);

      const finnishedMeal: SingleMealType = {
        id: new Date().valueOf(),
        product: meal.product,
        image: meal.product!.SmallPictureUrl,
        upsale: meal.upsale,
        originalTotal: finalPrice,
        totalPrice: finalPrice,
        quantity: meal.quantity,
        note: "",
        itemGUI: uniqueGUI
      };

      setOrders([...orders, finnishedMeal]);
      setSingleMeal(startingMealFormula);
    } else {
      const finnishedMeal: SingleMealType = {
        id: new Date().valueOf(),
        product: meal.product,
        image: meal.product!.SmallPictureUrl,
        upsale: meal.upsale,
        originalTotal: startingPrice,
        totalPrice: startingPrice * meal.quantity,
        quantity: meal.quantity,
        note: meal.note,
        itemGUI: uniqueGUI
      };

      setOrders([...orders, finnishedMeal]);
      setSingleMeal(startingMealFormula);
    }

  };

  const removeMealFromOrders = (productId: number) => {
    setOrders(orders.filter((m) => m.id !== productId));
  };

  const setSingleMealQuantity = (
    meal: SingleMealType,
    countType: "minus" | "plus"
  ) => {

    const filteredOrders = orders.map((o) => {
      if (o.id === meal.id) {
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

  const setSingleMealNote = (note: string, meal: SingleMealType) => {
    setOrders(
      orders.map((order) => {
        if (meal.id === order.id) {
          return { ...order, note };
        } else {
          return order;
        }
      })
    );
  };

  const cancelOrder = () => {
    setOrders([]);
    setSingleMeal(startingMealFormula);
    setUpsale([])
  };

  const getOrderTotal = () =>
    +orders.reduce((a, b) => a + b.totalPrice, 0).toFixed(2);

  const setUpsale = (upsale: UpsaleData) => {
    setSingleMeal({ ...singleMeal, upsale });
  };


  const handleSetOrderNumber = (number: string) => {

    setOrderNumber(number)
  }

  const handleSetIdOrderNumber = (number: number) => {

    setIdOrder(number)
  }

  const contextValue: OrderContextValue = {
    orders,
    singleMeal,
    setMeal,
    setUpsale,
    placeMealInOrders,
    removeMealFromOrders,
    setSingleMealQuantity,
    cancelOrder,
    getOrderTotal,
    setSingleMealNote,
    handleSetOrderNumber,
    orderNum,
    handleSetIdOrderNumber,
    IdOrder
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;


