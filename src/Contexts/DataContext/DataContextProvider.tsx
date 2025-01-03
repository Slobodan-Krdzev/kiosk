import { useQuery } from "@tanstack/react-query";
import Get from "../../Query/Get";
import { DataContext } from "./Datacontext";
import { MainCategory2, Product, SubCategory2, ThemeType, Tmkdaum } from "../../Types/Types";
import Loading from "../../Components/Loading";
import i18n from "i18next";

type DataContextProviderPropsType = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: DataContextProviderPropsType) => {
  const { data, isError, isLoading } = useQuery({
    queryFn: Get,
    queryKey: ["data"],
  });

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  if (isError) {
    return <>Error od context</>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const currentLanguage = i18n.language;
  

  // const categoryToRender:MainCategory2 = data.TMKData[0].MainCategories[0]; // FOOD TO SHARE KATEGORIJA
  const categoryToRender: MainCategory2 = data.TMKData.find((TMKItem: Tmkdaum) => TMKItem.Language === currentLanguage).MainCategories[1]

  console.log("Current Lang and Category",currentLanguage, categoryToRender)

  const allSubCategories = categoryToRender!.SubCategories;

  const getAllProducts = (subCategories: SubCategory2[]) => {
    const allProducts: Product[] = [];

    subCategories.forEach((subCat) =>
      subCat.Products.forEach((product) => allProducts.push(product))
    );

    return allProducts;
  };

  const allProducts = getAllProducts(allSubCategories);

  const theme:ThemeType = {
    bgColor: categoryToRender.BackgroundColor,
    textColor: categoryToRender.TextColor,
    activeTextColor: categoryToRender.TextColorActive
  };

  const returnValue = {
    data,
    isError,
    isLoading,
    allCategories: allSubCategories,
    allProducts,
    theme
  };

  return (
    <DataContext.Provider value={returnValue}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
