import { useState } from "react";
import { StepContext, StepType } from "./StepContext";
import { FinalInfoType, SingleMealType } from "../../Types/Types";

type StepContextProviderPropsType = {
  children: JSX.Element;
};

const StepContextProvider = ({ children }: StepContextProviderPropsType) => {
  const [step, setStep] = useState<StepType>("start");
  const [orderNumber, setOrderNumber] = useState<number>()
  const [orderDetails, setOrderDetails] = useState<SingleMealType[]>([])


  const handleStepChange = (step: StepType) => {
    setStep(step);
  };

  const setFinalOrderDetails = (orders: SingleMealType[]) => {
    
   const orderNo =  +new Date().valueOf().toString().slice(-2)
   setOrderNumber(orderNo)
   setOrderDetails(orders)

    
   return orderNo
  }
  
  const finalInfo:FinalInfoType = {
    orderNum: orderNumber,
    orderDet: orderDetails
  }


  const contextValue: {
    step: StepType;
    handleStepChange: (step: StepType) => void;
    setFinalOrderDetails: (orders:SingleMealType[]) => void,
    finalInfo: FinalInfoType
  } = { step, handleStepChange, setFinalOrderDetails, finalInfo };

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
};

export default StepContextProvider;
