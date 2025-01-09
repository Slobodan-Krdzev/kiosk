import Checkout from "./Components/View/Checkout/Checkout";
import Finish from "./Components/View/Finish/Finish";
import Order from "./Components/View/Order/Order";
import Payment from "./Components/View/Payment/Payment";
import StartScreen from "./Components/View/StartScreen/StartScreen";

import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import ChooseLang from "./Components/View/Lang/ChooseLang";
import MealInfo from "./Components/View/MealInfo/MealInfo";
import Preview from "./Components/View/Preview/Preview";
import { DataContext } from "./Contexts/DataContext/Datacontext";
import { StepContext } from "./Contexts/StepContext/StepContext";
import Upsale from "./Components/View/Upsale/Upsale";
import Counter from "./Components/Reusables/Counter/Counter";

function App() {
  const { step, mealForInfo, handleStepChange } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  const [isCounterVisible, setIsCounterVisible] = useState(false)
  const inactivityTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivityPeriod = 1000000; 

  console.log(data);

  const handleInactivity = () => {
    console.log("User inactive: Showing counter");
    setIsCounterVisible(true); 
  };

  const handleCounterComplete = () => {
    handleStepChange("start"); 
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
    <section className="appWrapper">
      {isCounterVisible && step !== 'start' && (
        <div className={`countOverlay`} onClick={() => {
          console.log('Clicked')
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
        {step === "mealInfo" && <MealInfo meal={mealForInfo.product} availability={mealForInfo.availability} theme={theme} />}
        {step === "menuUpgrade" && <Upsale />}
        {step === "checkout" && <Checkout />}
        {step === "preview" && <Preview />}
        {step === "payment" && <Payment />}
        {step === "finnish" && <Finish />}
      </AnimatePresence>
    </section>
  );
}

export default App;
