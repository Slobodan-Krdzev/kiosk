import React from "react";
import { DataContext } from "./Datacontext";
import { useQuery } from "@tanstack/react-query";
import Get from "../../Query/Get";

type DataContextProviderPropsType = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: DataContextProviderPropsType) => {
  const { data, isError, isLoading } = useQuery({
    queryFn: Get,
    queryKey: ["data"],
  });


  const returnValue = {
    data,
    isError,
    isLoading,

  };

  return (
    <DataContext.Provider value={returnValue}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
