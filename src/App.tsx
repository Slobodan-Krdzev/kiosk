import Checkout from "./Components/View/Checkout/Checkout";
import Drinks from "./Components/View/Drinks";
import Extras from "./Components/View/Extras";
import Finish from "./Components/View/Finish/Finish";
import MenuUpgrade from "./Components/View/MenuUpgrade";
import Order from "./Components/View/Order/Order";
import Payment from "./Components/View/Payment/Payment";
import Sides from "./Components/View/Sides";
import StartScreen from "./Components/View/StartScreen";
import SupersizeUpgrade from "./Components/View/SupersizeUpgrade";

import { useContext } from "react";
import { DataContext } from "./Contexts/DataContext/Datacontext";
import { StepContext } from "./Contexts/StepContext/StepContext";
import ChooseLang from "./Components/View/Lang/ChooseLang";

function App() {
  const { step } = useContext(StepContext);
  const { data } = useContext(DataContext);

  const upsaleColections = data.TMKData[0].UpsaleColletions

  // if (isLoading) return <h1 style={{ color: "black" }}>Is Loading</h1>;

  // if (isError) return <h1 style={{ color: "black" }}>IS Error</h1>;

  console.log(data);

  return (
    <section className="appWrapper">
      {step === "start" && <StartScreen />}
      {step === "lang" && <ChooseLang />}
      {step === "order" && <Order />}
      {(step === "menuUpgrade" && upsaleColections) && <MenuUpgrade />}
      {(step === "supersize" && upsaleColections) && <SupersizeUpgrade />}
      {(step === "extras" && upsaleColections) && <Extras />}
      {(step === "sides" && upsaleColections) && <Sides />}
      {(step === "drinks" && upsaleColections) && <Drinks />}
      {step === "checkout" && <Checkout />}
      {step === "payment" && <Payment />}
      {step === "finnish" && <Finish />}
    </section>
  );
}

export default App;
