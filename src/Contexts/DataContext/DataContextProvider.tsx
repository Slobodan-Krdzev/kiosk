import { useQuery } from "@tanstack/react-query";
import Get from "../../Query/Get";
import { DataContext } from "./Datacontext";
import {
  MainCategory2,
  Product,
  SubCategory2,
  ThemeType,
  Tmkdaum,
} from "../../Types/Types";
import Loading from "../../Components/Loading";
import i18n from "i18next";
import { useContext, useState } from "react";
import PaymentError from "../../Components/View/PaymentError/PaymentError";
import { StepContext } from "../StepContext/StepContext";

type DataContextProviderPropsType = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: DataContextProviderPropsType) => {

  const {isTestMode} = useContext(StepContext)
  const menuID = new URLSearchParams(window.location.search).get("menuId")

  const isDadawan = menuID && +menuID! === 2490 
  const isKunkurent = menuID && +menuID === 2408

  const { data, isError, isLoading } = useQuery({
    queryFn: () => Get(isTestMode),
    queryKey: ["data"],
  });

  const [orderReferenceData, setOrderReferenceData] = useState({
    reference: "",
    qrCodeImg: "",
  });

  const handleSetOrderReferenceData = (data: {
    reference: string;
    qrCodeImg: string;
  }) => {
    setOrderReferenceData({
      reference: data.reference,
      qrCodeImg: data.qrCodeImg,
    });
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  if (isError) {
    return <PaymentError />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const currentLanguage = i18n.language;

  // OD BACKEND TREBA DA DOJDAT KAKO SUBCATEGORY 


  // const categoryToRender: MainCategory2 = data.TMKData[0].MainCategories[0]; // FOOD TO SHARE KATEGORIJA
  const categoryToRender: MainCategory2 = data.TMKData.find((TMKItem: Tmkdaum) => TMKItem.Language === currentLanguage)?.MainCategories[isTestMode ? isKunkurent ? 8 : 0 : 9] ?? data.TMKData[0].MainCategories[0];

  console.log("Current Lang and Category", currentLanguage,data.TMKData[0].Language === currentLanguage);

  const allSubCategories = categoryToRender!.SubCategories;

  const getAllProducts = (subCategories: SubCategory2[]) => {
    const allProducts: Product[] = [];

    subCategories.forEach((subCat) =>
      subCat.Products.forEach((product) => allProducts.push(product))
    );

    return allProducts;
  };

  const allProducts = getAllProducts(allSubCategories);

  const theme: ThemeType = {
    bgColor:  categoryToRender.BackgroundColor,
    textColor: isDadawan ? categoryToRender.TextColorActive :  categoryToRender.TextColor,
    activeTextColor: isDadawan ? categoryToRender.TextColor : categoryToRender.TextColorActive,
    
  };

  const returnValue = {
    data,
    isError,
    isLoading,
    allCategories: allSubCategories,
    allProducts,
    theme,
    orderReferenceData,
    handleSetOrderReferenceData,
  };

  return (
    <DataContext.Provider value={returnValue}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
