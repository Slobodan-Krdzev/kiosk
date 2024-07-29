import { createContext } from "react";
import { FinalInfoType, SingleMealType } from "../../Types/Types";

export type StepType = 'start' | 'lang' | "order" | 'menuUpgrade' | 'supersize' | "extras" | 'sides' | "drinks" | "checkout" | "payment" | "finnish"

type StepContextItitialValue = {

    step: StepType,
    handleStepChange: (step: StepType) => void,
    setFinalOrderDetails: (orders: SingleMealType[]) => void,
    finalInfo: FinalInfoType
}

export const StepContext = createContext({} as StepContextItitialValue)