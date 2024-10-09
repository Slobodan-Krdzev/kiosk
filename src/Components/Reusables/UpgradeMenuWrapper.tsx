import { useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { Option, ThemeType, UpsaleStep } from "../../Types/Types";
import ButtonOptionSelector from "./ButtonOptionSelector/ButtonOptionSelector";

type UpgradeMenuWrapperPropsTypes = {
  setType: string;
  topTextNormal: string;
  topTextUpgrade: string;
  data: UpsaleStep;
  theme: ThemeType;
  handleOptionChange: (option: Option) => void,
  selectedOption: Option | undefined
};

const UpgradeMenuWrapper = ({
  data,
  theme,
  handleOptionChange,
  selectedOption
}: UpgradeMenuWrapperPropsTypes) => {
  const {
    singleMeal

  } = useContext(OrderContext);

  
  return (
    <div className="upgradeBtnsWrapper">
      {data.Options.map((o) => (
        <ButtonOptionSelector
          key={o.Id}
          option={o}
          singleMeal={singleMeal}
          handleOptionChange={handleOptionChange}
          theme={theme}
          optionSelected={selectedOption}
        />
      ))}






      {
      /* <button
        style={{ border: option === "normal" ? `2px solid ${theme.activeTextColor}` : "" }}
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
          itemName={singleMeal.product!.Name}
          image={"/chillyBurger2.png"}
          toptext={topTextNormal}
          price={`${singleMeal.product!.Price} ${singleMeal.product!.PriceValue}`}
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
          itemName={singleMeal.product!.Name + " Menu"}
          image={"/chillyBuregerMenu.png"}
          toptext={topTextUpgrade}
          price={"+ 5.89"}
        /> 
       </button> */}
    </div>
  );
};

export default UpgradeMenuWrapper;
