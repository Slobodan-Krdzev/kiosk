import { createContext } from "react";
import { Product, SingleMealType } from "../../Types/Types";
import { UpsaleData } from "../UpsaleContext/UpsaleContext";

export type OrderContextValue = {

    orders: SingleMealType[],
    singleMeal: SingleMealType,
    setMeal: (meal:Product) => void,
    setUpsale: (upsale: UpsaleData) => void,
    placeMealInOrders: (meal: SingleMealType) => void,
    removeMealFromOrders: (productId: number) => void,
    setSingleMealQuantity: (meal: SingleMealType, countType: 'minus' | 'plus') => void,
    getOrderTotal: () => number,
    cancelOrder:() => void,
    setSingleMealNote: (note: string, meal: SingleMealType) => void
}

export const OrderContext = createContext({} as OrderContextValue)