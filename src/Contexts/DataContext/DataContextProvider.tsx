import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import Get from "../../Query/Get";
import {
  MainCategory2,
  Product,
  SubCategory2,
  ThemeType,
  Tmkdaum,
} from "../../Types/Types";
import { DataContext } from "./Datacontext";
// import i18n from "i18next";
import { useContext, useState } from "react";
import PaymentError from "../../Components/View/PaymentError/PaymentError";
import { StepContext } from "../StepContext/StepContext";
import DB from "../../Data/DB.json"

type DataContextProviderPropsType = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: DataContextProviderPropsType) => {
  const { isTestMode } = useContext(StepContext);
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('i18nextLng') ?? 'nl')
  const menuID = new URLSearchParams(window.location.search).get("menuId");

  const isDadawan = menuID && +menuID! === 2490;

  const { data, isError, isLoading } = useQuery({
    queryFn: () => Get(isTestMode),
    queryKey: ["data"],
  });

  const dummyData = DB 

  console.log("Dummy Data", dummyData, data)

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

  const handleLangChange = (lang: string) => {
    setCurrentLang(lang)
  }


  console.log("====================================");
  console.log(data);
  console.log("====================================");

  if (isError) {
    return <PaymentError />;
  }

  if (isLoading) {
    return <Loading />;
  }

 
  // OD BACKEND TREBA DA DOJDAT KAKO SUBCATEGORY

  // const dummyTmkData: Tmkdaum = dummyData.TMKData[0]
  const tmkData: Tmkdaum = data.TMKData.find((tmkItem: Tmkdaum) => tmkItem.Language === currentLang) ?? data.TMKData[0];
  // const dummyCategoryToRender = dummyTmkData.MainCategories[0]
  const categoryToRender: MainCategory2 = tmkData?.MainCategories[0];

  console.log(tmkData)
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
    bgColor: categoryToRender.BackgroundColor,
    textColor: isDadawan
      ? categoryToRender.TextColorActive
      : categoryToRender.TextColor,
    activeTextColor: isDadawan
      ? categoryToRender.TextColor
      : categoryToRender.TextColorActive,
  };

  const returnValue = {
    data,
    tmkData,
    // dummyTmkData,
    isError,
    isLoading,
    allCategories: allSubCategories,
    allProducts,
    theme,
    orderReferenceData,
    handleSetOrderReferenceData,
    handleLangChange,
  };

  return (
    <DataContext.Provider value={returnValue}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
