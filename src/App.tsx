import Checkout from "./Components/View/Checkout/Checkout";
import Finish from "./Components/View/Finish/Finish";
import Order from "./Components/View/Order/Order";
import Payment from "./Components/View/Payment/Payment";
import StartScreen from "./Components/View/StartScreen/StartScreen";

import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import Counter from "./Components/Reusables/Counter/Counter";
import Confirmation from "./Components/View/Confirmation/Confirmation";
import ChooseLang from "./Components/View/Lang/ChooseLang";
import PaymentError from "./Components/View/PaymentError/PaymentError";
import Upsale from "./Components/View/Upsale/Upsale";
import { DataContext } from "./Contexts/DataContext/Datacontext";
import { StepContext } from "./Contexts/StepContext/StepContext";
import OutOfServiceScreen from "./Components/View/OutOfService/OutOfServiceScreen";

function App() {
  const { step,  isTestMode } = useContext(StepContext);
  const { data,  } = useContext(DataContext);
  const [isCounterVisible, setIsCounterVisible] = useState(false)
  const inactivityTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivityPeriod = 1000000; 

  console.log('Test Mode', isTestMode)
  console.log(data);

  const handleInactivity = () => {
    setIsCounterVisible(true); 
  };

  const handleCounterComplete = () => {
    setIsCounterVisible(false); 
  };

  const resetInactivityTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current); 
    }

    if (step !== "start") {
      inactivityTimeout.current = setTimeout(handleInactivity, inactivityPeriod);
    }

  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];

    if (step !== "start") {
      events.forEach((event) => {
        window.addEventListener(event, resetInactivityTimer);
      });

      resetInactivityTimer();
    }

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, [step])
 

  return (
    <>
      {isCounterVisible && step !== 'start' && (
        <div className={`countOverlay`} onClick={() => {
          resetInactivityTimer()
          setIsCounterVisible(false)
        }}>
          
            <Counter start={5} onTimerFinnish={handleCounterComplete}/>
          
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === "start" && <StartScreen />}
        {step === "lang" && <ChooseLang />}
        {step === "order" && <Order />} 
        {step === "menuUpgrade" && <Upsale />}
        {step === "checkout" && <Checkout />}
        {step === "payment" && <Payment />}
        {step === "finnish" && <Finish />}
        {step === "paymentErr" && <PaymentError />}
        {step === "confirmation" && <Confirmation />}
        {step === "outOfService" && <OutOfServiceScreen />}

      </AnimatePresence>
    </>
  );
}

export default App;
