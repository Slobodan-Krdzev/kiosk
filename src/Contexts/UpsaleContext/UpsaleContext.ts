import { createContext } from "react";
import { Option } from "../../Types/Types";


export type UpsaleStepData = {step: number, stepData: {option: Option, quantity: number}[]}

export type UpsaleData = UpsaleStepData[]

export type UpsaleContextValueType = {
    upsaleData: UpsaleData,
    resetUpsale: () => void,
    addNewOption: (step: number, option: Option, maxSelection: number, quantity: number) => void;
    removeAnOption: (step:number, option: Option) => void,
    predefineUpsale: (upsale: UpsaleData) => void,
    addUpsaleId: (id: number) => void,
    upsaleId: number,
    toggleEditMode: (mode: boolean) => void,
    isEditMode: boolean
}

export const UpsaleContext = createContext({} as UpsaleContextValueType)