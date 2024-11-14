import { createContext } from "react";
import { DrinksType, Option, Product, SingleMealType } from "../../Types/Types";

export type OrderContextValue = {

    orders: SingleMealType[],
    singleMeal: SingleMealType,
    setTakeaway: () => void,
    setMeal: (meal:Product) => void,
    setMenuUpgrade: (option:Option) => void,
    setNoMenu: (option:Option) => void,
    setNoSupersize: (option:Option) => void,
    setSupersizeUpgrade: (option:Option) => void
    setExtras: (extras: Option[]) => void
    setSides: (sides: Option[]) => void,
    setDrinks: (drinks: DrinksType[]) => void,
    placeMealInOrders: (meal: SingleMealType) => void,
    removeMealFromOrders: (productId: number) => void,
    setSingleMealQuantity: (meal: SingleMealType, countType: 'minus' | 'plus') => void,
    getOrderTotal: () => number,
    cancelOrder:() => void,
    setSingleMealNote: (note: string, meal: SingleMealType) => void
}

export const OrderContext = createContext({} as OrderContextValue)