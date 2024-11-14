import { useState } from "react";
import { StepContext, StepType } from "./StepContext";
import { FinalInfoType, Product, SingleMealType } from "../../Types/Types";

type StepContextProviderPropsType = {
  children: JSX.Element;
};

const StepContextProvider = ({ children }: StepContextProviderPropsType) => {
  const [step, setStep] = useState<StepType>("start");
  const [orderNumber, setOrderNumber] = useState<number>()
  const [orderDetails, setOrderDetails] = useState<SingleMealType[]>([])
  const [mealForInfo, setMealForInfo] = useState<Product>({} as Product)

  const handleStepChange = (step: StepType) => {
    setStep(step);
  };

  const setFinalOrderDetails = (orders: SingleMealType[]) => {
    
   const orderNo =  +new Date().valueOf().toString().slice(-2)
   setOrderNumber(orderNo)
   setOrderDetails(orders)

    
   return orderNo
  }

  const handleSetMealForInfo = (meal:Product) => {

    setMealForInfo(meal)
  }
  
  const finalInfo:FinalInfoType = {
    orderNum: orderNumber,
    orderDet: orderDetails
  }


  const contextValue: {
    step: StepType;
    handleStepChange: (step: StepType) => void;
    setFinalOrderDetails: (orders:SingleMealType[]) => void,
    finalInfo: FinalInfoType,
    handleSetMealForInfo: (meal: Product) => void
    mealForInfo: Product
  } = { step, handleStepChange, setFinalOrderDetails, finalInfo,handleSetMealForInfo,
    mealForInfo };

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
};

export default StepContextProvider;
