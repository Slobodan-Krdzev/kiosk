import Checkout from "./Components/View/Checkout/Checkout";
import Finish from "./Components/View/Finish/Finish";
import Order from "./Components/View/Order/Order";
import Payment from "./Components/View/Payment/Payment";
import StartScreen from "./Components/View/StartScreen/StartScreen";

import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import ChooseLang from "./Components/View/Lang/ChooseLang";
import MealInfo from "./Components/View/MealInfo/MealInfo";
import Preview from "./Components/View/Preview/Preview";
import { DataContext } from "./Contexts/DataContext/Datacontext";
import { StepContext } from "./Contexts/StepContext/StepContext";
import Upsale from "./Components/View/Upsale/Upsale";

function App() {
  const { step, mealForInfo } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  
  console.log(data);

  return (
    <section className="appWrapper">
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
