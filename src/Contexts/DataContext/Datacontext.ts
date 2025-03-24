import { createContext } from "react";
import { Product, RootData, SubCategory2, ThemeType, Tmkdaum } from "../../Types/Types";

type DataContextValueType = {
  data: RootData;
  tmkData: Tmkdaum;
  // dummyTmkData: Tmkdaum;
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
  handleLangChange: (lang: string) => void
};

export const DataContext = createContext({} as DataContextValueType);
