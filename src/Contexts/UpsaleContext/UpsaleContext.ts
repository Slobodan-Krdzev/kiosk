import { createContext } from "react";
import { Option } from "../../Types/Types";

export type UpsaleStepData = {step: number, options: Option[]}

export type UpsaleData = UpsaleStepData[]

export type UpsaleContextValueType = {
    upsaleData: UpsaleData,
    addOption: (step: number, option: Option, maxSelection: number) => void;
    removeOption: (step: number, option: Option) => void;
    resetUpsale: () => void,
}

export const UpsaleContext = createContext({} as UpsaleContextValueType)