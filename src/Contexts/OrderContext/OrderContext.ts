import { createContext } from "react";
import { DrinksType, ExtraType, MealType, SidesType, SingleMealType } from "../../Types/Types";

export type OrderContextValue = {

    orders: SingleMealType[],
    singleMeal: SingleMealType,
    setTakeaway: () => void,
    setMeal: (meal:MealType) => void,
    setMenuUpgrade: () => void,
    setNoMenu: () => void,
    setNoSupersize: () => void,
    setSupersizeUpgrade: () => void
    setExtras: (extras: ExtraType[]) => void
    setSides: (sides: SidesType) => void,
    setDrinks: (drinks: DrinksType[]) => void,
    placeMealInOrders: (meal: SingleMealType) => void,
    setSingleMealQuantity: (meal: SingleMealType, countType: 'minus' | 'plus') => void,
    getOrderTotal: () => number,
    cancelOrder:() => void
}

export const OrderContext = createContext({} as OrderContextValue)