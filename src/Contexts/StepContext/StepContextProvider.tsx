import { useState } from "react";
import { StepContext, StepType } from "./StepContext";
import { FinalInfoType, Product, SingleMealType } from "../../Types/Types";

type StepContextProviderPropsType = {
  children: JSX.Element;
};

const StepContextProvider = ({ children }: StepContextProviderPropsType) => {
  const [step, setStep] = useState<StepType>("start");
  const [orderNumber, setOrderNumber] = useState<number>()
  const [isTakeway, setIsTakeway] = useState<boolean>(false)

  const [orderDetails, setOrderDetails] = useState<SingleMealType[]>([])
  const [orderNote, setOrderNote] = useState<string>('')

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

  const handleOrderNote = (note: string) => {

    setOrderNote(note)
  }

  const handleSetTakeway = () => {

    setIsTakeway(true)
  }
  
  const finalInfo:FinalInfoType = {
    orderNum: orderNumber,
    orderDet: orderDetails,
    orderNote: orderNote,
    orderType: isTakeway ? 'Takeway' : 'Dine In'
  }


  const contextValue: {
    step: StepType;
    handleStepChange: (step: StepType) => void;
    setFinalOrderDetails: (orders:SingleMealType[]) => void,
    finalInfo: FinalInfoType,
    handleSetMealForInfo: (meal: Product) => void
    mealForInfo: Product,
    handleOrderNote: (note: string) => void,
    handleSetTakeway: () => void
    
  } = { step, handleSetTakeway, handleOrderNote, handleStepChange, setFinalOrderDetails, finalInfo,handleSetMealForInfo,
    mealForInfo };

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
};

export default StepContextProvider;
