import { useContext, useState } from "react";
import UpgradeBtn from "./UpgradeBtn";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";

type UpgradeMenuWrapperPropsTypes = {
  setType: string;
  topTextNormal: string;
  topTextUpgrade: string;
};

const UpgradeMenuWrapper = ({
  setType,
  topTextNormal,
  topTextUpgrade,
}: UpgradeMenuWrapperPropsTypes) => {
  const [option, setOption] = useState<"normal" | "menu" | "">("");
  const { setMenuUpgrade, setNoMenu, setNoSupersize, setSupersizeUpgrade, singleMeal } =
    useContext(OrderContext);

  return (
    <div className="upgradeBtnsWrapper">
      <button
        style={{ border: option === "normal" ? "2px solid #CEDC00" : "" }}
        onClick={() => {
          if (option === "normal") {
            setOption("");
          } else {
            setOption("normal");

            if (setType === "menuUpgrade") {
              setNoMenu();
            } else if (setType === "supersize") {
              setNoSupersize();
            }
          }
        }}
      >
        <UpgradeBtn
          itemName={singleMeal.meal!.name}
          image={"/chillyBurger2.png"}
          toptext={topTextNormal}
          price={"Item Price"}
        />
      </button>
      <button
        style={{ border: option === "menu" ? "2px solid #CEDC00" : "" }}
        onClick={() => {
          if (option === "menu") {
            setOption("");
          } else {
            setOption("menu");

            if (setType === "menuUpgrade") {
              setMenuUpgrade();
            } else if (setType === "supersize") {
              setSupersizeUpgrade();
            }
          }
        }}
      >
        <UpgradeBtn
          itemName={singleMeal.meal!.name + " Menu"}
          image={"/chillyBuregerMenu.png"}
          toptext={topTextUpgrade}
          price={"+ 5.89"}
        />
      </button>
    </div>
  );
};

export default UpgradeMenuWrapper;
