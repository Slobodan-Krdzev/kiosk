import { useContext, useEffect, useState } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import styles from "./CounterStyles.module.css"
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { UpsaleContext } from "../../../Contexts/UpsaleContext/UpsaleContext";

type CounterPropsType = {
  start: number;
  onTimerFinnish?: () => void
};

const Counter = ({ start, onTimerFinnish }: CounterPropsType) => {
  const { handleStepChange } = useContext(StepContext);
  const {cancelOrder} = useContext(OrderContext)
  const {resetUpsale} = useContext(UpsaleContext)
  const [count, setCount] = useState(start);

  useEffect(() => {

    const interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if(count < 1){
        handleStepChange('start')

        if(onTimerFinnish)
        onTimerFinnish()
        cancelOrder()
        resetUpsale()
    }

    return () => clearInterval(interval);
  });

  return <h2 className={`fontSFRounded ${styles.counter}`}> {count} </h2>;
};

export default Counter;
