import { useContext } from "react";
import Checkout from "./Components/View/Checkout";
import ChooseLang from "./Components/View/ChooseLang";
import Drinks from "./Components/View/Drinks";
import Extras from "./Components/View/Extras";
import Finish from "./Components/View/Finish";
import MenuUpgrade from "./Components/View/MenuUpgrade";
import Order from "./Components/View/Order";
import Payment from "./Components/View/Payment";
import Sides from "./Components/View/Sides";
import StartScreen from "./Components/View/StartScreen";
import SupersizeUpgrade from "./Components/View/SupersizeUpgrade";
import { StepContext } from "./Contexts/StepContext/StepContext";

function App() {
  const { step } = useContext(StepContext);

  return (
    <>
      {step === "start" && <StartScreen />}
      {step === "lang" && <ChooseLang />}
      {step === "order" && <Order />}
      {step === "menuUpgrade" && <MenuUpgrade />}
      {step === "supersize" && <SupersizeUpgrade />}
      {step === "extras" && <Extras />}
      {step === "sides" && <Sides />}
      {step === "drinks" && <Drinks />}
      {step === "checkout" && <Checkout />}
      {step === "payment" && <Payment />}
      {step === "finnish" && <Finish />}
    </>
  );
}

export default App;
