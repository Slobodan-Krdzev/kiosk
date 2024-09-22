import { createContext } from "react";
import { RootData } from "../../Types/Types";

type DataContextValueType = {
    data: RootData,
    isError: boolean,
    isLoading: boolean
}

export const DataContext = createContext({} as DataContextValueType)