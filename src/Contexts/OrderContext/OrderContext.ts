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
    setSingleMealNote: (note: string, meal: SingleMealType) => void,
    handleSetOrderNumber: (number: string) => void,
    orderNum: string,
    IdOrder: number,
    handleSetIdOrderNumber: (number: number) => void,
    handleSetCopyOfEditingItem: (meal: SingleMealType) => void,
    copyOfEditingItem: SingleMealType | undefined
}

export const OrderContext = createContext({} as OrderContextValue)