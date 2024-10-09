import { useQuery } from "@tanstack/react-query";
import Get from "../../Query/Get";
import { DataContext } from "./Datacontext";
import { MainCategory2, Product, SubCategory2, ThemeType } from "../../Types/Types";

type DataContextProviderPropsType = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: DataContextProviderPropsType) => {
  const { data, isError, isLoading } = useQuery({
    queryFn: Get,
    queryKey: ["data"],
  });

  if (isLoading) {
    return <>Loading od context</>;
  }

  if (isError) {
    return <>Error od context</>;
  }

  const categoryToRender:MainCategory2 = data.TMKData[0].MainCategories.find(
    (cat: MainCategory2) => cat.MainCategoryId === 40394
  ); // FOOD TO SHARE KATEGORIJA
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
