import { createContext } from "react";
import { FinalInfoType, Product, SingleMealType } from "../../Types/Types";

export type StepType = "preview" | "mealInfo" | 'start' | 'lang' | "order" | 'menuUpgrade' | 'supersize' | "extras" | 'sides' | "drinks" | "checkout" | "payment" | "finnish"

type StepContextItitialValue = {

    step: StepType,
    handleStepChange: (step: StepType) => void,
    setFinalOrderDetails: (orders: SingleMealType[]) => void,
    finalInfo: FinalInfoType,
    handleSetMealForInfo: (meal: Product) => void,
    mealForInfo: Product
}

export const StepContext = createContext({} as StepContextItitialValue)