import { createContext } from "react";
import { Product, RootData, SubCategory2, ThemeType } from "../../Types/Types";

type DataContextValueType = {
  data: RootData;
  isError: boolean;
  isLoading: boolean;
  allCategories: SubCategory2[];
  allProducts: Product[];
  theme: ThemeType;
  orderReferenceData: { reference: string; qrCodeImg: string };
  handleSetOrderReferenceData: (data: {
    reference: string;
    qrCodeImg: string;
  }) => void;
};

export const DataContext = createContext({} as DataContextValueType);
