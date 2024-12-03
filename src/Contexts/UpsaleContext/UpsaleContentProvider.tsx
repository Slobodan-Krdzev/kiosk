import { useState } from "react";
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
    { step: 0, options: [] },
    { step: 1, options: [] },
    { step: 2, options: [] },
    { step: 3, options: [] },
    { step: 4, options: [] },
  ]);

  const addOption = (step: number, option: Option, maxSelection: number) => {
    const formatedSteps = upsaleData.map((s) => {
      if (s.step === step) {
        if (maxSelection === 1) {
          return { step: s.step, options: [option] };
        } else {
          return { step: s.step, options: [...s.options, option] };
        }
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
      { step: 0, options: [] },
      { step: 1, options: [] },
      { step: 2, options: [] },
      { step: 3, options: [] },
      { step: 4, options: [] },
    ]);
  };

  console.log(upsaleData);

  const contextValue: UpsaleContextValueType = {
    upsaleData,
    addOption,
    removeOption,
    resetUpsale
  };

  return (
    <UpsaleContext.Provider value={contextValue}>
      {children}
    </UpsaleContext.Provider>
  );
};

export default UpsaleContentProvider;
