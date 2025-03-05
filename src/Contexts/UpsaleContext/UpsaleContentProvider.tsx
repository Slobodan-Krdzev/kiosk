import { useState } from "react";
import { Option } from "../../Types/Types";
import {
  UpsaleContext,
  UpsaleContextValueType,
  UpsaleData,
} from "./UpsaleContext";

type UpsaleContentProviderPropsType = {
  children: JSX.Element;
};

const UpsaleContentProvider = ({
  children,
}: UpsaleContentProviderPropsType) => {
  const [upsaleData, setUpsaleData] = useState<UpsaleData>([
    { step: 0, stepData: [] },
    { step: 1, stepData: [] },
    { step: 2, stepData: [] },
    { step: 3, stepData: [] },
    { step: 4, stepData: [] },
  ]);

  const addNewOption = (step: number, option: Option, maxSelection: number, quantity: number) => {

   
    const formatedSteps: UpsaleData = upsaleData.map(s => {
      if (s.step === step) {

        
        if (maxSelection > 1) {
          // proverka dali vekje postoi opcijata vo stepData
        
          const existingOption = s.stepData.find(item => item.option === option);
  
          if (existingOption) {

            // ako postoi go vrakjame option menuvame quantity ako ne postoi dodadi
            return {
              step: s.step,
              stepData: s.stepData.map(item =>
                item.option === option
                  ? { ...item, quantity }
                  : item
              )
            };
          } else {

            return {
              step: s.step,
              stepData: [...s.stepData, { option, quantity }]
            };
          }
        } else {

          return {
            step: s.step,
            stepData: [{ option, quantity }]
          };
        }
      } else {
        
        return s;
      }
    });
  
    // Update the state with the new formatted steps
    setUpsaleData(formatedSteps);
  };

  const removeAnOption = (step:number, option: Option) => {

    const filteredData = upsaleData.map(s => {

      if(s.step === step){

        const filteredOptions = s.stepData.filter(o => o.option.Id !== option.Id)


        return {step: s.step, stepData: filteredOptions}
      }else{
        return s
      }
    })

    setUpsaleData(filteredData)

  }

  const resetUpsale = () => {
    setUpsaleData([
      { step: 0, stepData: [] },
      { step: 1, stepData: [] },
      { step: 2, stepData: [] },
      { step: 3, stepData: [] },
      { step: 4, stepData: [] },
    ]);
  };

  const contextValue: UpsaleContextValueType = {
    upsaleData,
    resetUpsale,
    addNewOption,
    removeAnOption
  };

  return (
    <UpsaleContext.Provider value={contextValue}>
      {children}
    </UpsaleContext.Provider>
  );
};

export default UpsaleContentProvider;
