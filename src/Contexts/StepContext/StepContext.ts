import { createContext } from "react";
import { FinalInfoType, Product, SingleMealType } from "../../Types/Types";

export type StepType = "outOfService" | "preview" | "mealInfo" | 'start' | 'lang' | "order" | 'menuUpgrade' | 'supersize' | "extras" | 'sides' | "drinks" | "checkout" | "payment" | "finnish" | "paymentErr" | 'confirmation';

type StepContextItitialValue = {

    step: StepType,
    handleStepChange: (step: StepType) => void,
    setFinalOrderDetails: (orders: SingleMealType[]) => void,
    finalInfo: FinalInfoType,
    handleSetMealForInfo: (meal: Product, availability: boolean) => void,
    mealForInfo: {product: Product, availability: boolean},
    handleOrderNote: (note: string) => void,
    handleSetTakeawayOption: (option: "Dine In" | "Takeaway") => void,
    handleRemoveNote: () => void,
    isTestMode: boolean
}

export const StepContext = createContext({} as StepContextItitialValue)