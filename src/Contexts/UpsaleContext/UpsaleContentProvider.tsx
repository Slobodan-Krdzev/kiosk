import { useEffect, useState } from "react";
import {
  UpsaleContext,
  UpsaleContextValueType,
  UpsaleData,
} from "./UpsaleContext";
import { Option } from "../../Types/Types";

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

  useEffect(() => console.log('upsale data', upsaleData),[upsaleData])

  const addNewOption = (step: number, option: Option, maxSelection: number, quantity: number) => {

    console.log(maxSelection)

    const formatedSteps: UpsaleData = upsaleData.map(s => {
      if (s.step === step) {

        console.log('Ist Step')

        if (maxSelection > 1) {
          // proverka dali vekje postoi opcijata vo stepData
        console.log('maxSelection > 1')

          const existingOption = s.stepData.find(item => item.option === option);
  
          if (existingOption) {

            console.log('postoi opcijata')
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
