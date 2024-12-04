import { createContext } from "react";
import { Option, StepDataType } from "../../Types/Types";

export type UpsaleStepData = {step: number, stepData: StepDataType[]}

export type UpsaleData = UpsaleStepData[]

export type UpsaleContextValueType = {
    upsaleData: UpsaleData,
    addOption: (step: number, o: Option, quantity: number, maxSelection: number) => void;
    removeOption: (step: number, option: Option) => void;
    resetUpsale: () => void,
}

export const UpsaleContext = createContext({} as UpsaleContextValueType)