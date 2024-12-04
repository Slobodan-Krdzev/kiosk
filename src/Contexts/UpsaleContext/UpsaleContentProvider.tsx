import { useState } from "react";
import {
  UpsaleContext,
  UpsaleContextValueType,
  UpsaleData,
  UpsaleStepData,
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

  const addOption = (step: number, o: Option, quantity: number, maxSelection: number) => {

    const formatedSteps:UpsaleStepData[] = upsaleData.map((s) => {

      if (s.step === step) {
        return { step: s.step, stepData: [{option: [o], quantity}] };

        // if (maxSelection === 1) {
        //   return { step: s.step, stepData: [{option: o, quantity}] };
        // }
        // } else {
        //   return { step: s.step, options: [...s.options.option] };
        // }
      } else {
        return s;
      }
    });

    setUpsaleData(formatedSteps);
  };

  const removeOption = (step: number, option: Option) => {
    const filteredData = upsaleData.map((s) => {
      if (s.step === step) {
        const filteredOptions = s.options.filter((o) => o.Id !== option.Id);

        return { step: s.step, options: filteredOptions };
      } else {
        return s;
      }
    });

    setUpsaleData(filteredData);
  };

  const resetUpsale = () => {
    setUpsaleData([
      { step: 0, stepData: [] },
      { step: 1, stepData: [] },
      { step: 2, stepData: [] },
      { step: 3, stepData: [] },
      { step: 4, stepData: [] },
    ]);
  };

  console.log(upsaleData);

  const contextValue: UpsaleContextValueType = {
    upsaleData,
    addOption,
    removeOption,
    resetUpsale,
  };

  return (
    <UpsaleContext.Provider value={contextValue}>
      {children}
    </UpsaleContext.Provider>
  );
};

export default UpsaleContentProvider;
