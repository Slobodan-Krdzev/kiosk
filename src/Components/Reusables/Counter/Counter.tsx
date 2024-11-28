import { useContext, useEffect, useState } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import styles from "./CounterStyles.module.css"

type CounterPropsType = {
  start: number;
};

const Counter = ({ start }: CounterPropsType) => {
  const { handleStepChange } = useContext(StepContext);
  const [count, setCount] = useState(start);

  useEffect(() => {

    const interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if(count < 1){
        handleStepChange('start')
    }

    return () => clearInterval(interval);
  });

  return <h2 className={`fontSFRounded ${styles.counter}`}> {count} </h2>;
};

export default Counter;
