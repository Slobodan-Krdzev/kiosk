import { useContext, useState } from "react";
import BigerHeading from "../Reusables/BigerHeading";
import ExtrasCard from "../Reusables/ExtrasCard";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { ExtraType } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";

const extras = [
  {
    id: 1,
    name: "Ketchup",
    price: 1.4,
    image: "/extras.png",
  },
  {
    id: 2,
    name: "Mayo",
    price: 1.4,
    image: "/extras.png",
  },
  {
    id: 3,
    name: "Mustard",
    price: 1.4,
    image: "/extras.png",
  },
  {
    id: 4,
    name: "Pesto",
    price: 2.4,
    image: "/extras.png",
  },
  {
    id: 5,
    name: "BBQ Sauce",
    price: 2.4,
    image: "/extras.png",
  },
  {
    id: 6,
    name: "Tsatziki",
    price: 3.4,
    image: "/extras.png",
  },
];

const Extras = () => {

  const {handleStepChange} = useContext(StepContext)
  const {setExtras, singleMeal} = useContext(OrderContext)
  const [selectedExtras, setSelectedExtras] = useState<ExtraType[]>([])

  const handleSelectedExtras = (extra: {
    id: number,
    name: string,
    price: number,
    image: string,
  }) => {

    const formatedExtra:ExtraType = {
      id: extra.id,
      type: extra.name,
      price: extra.price
    }

    setSelectedExtras([...selectedExtras, formatedExtra])
  }

  const handleRemoveExtra = (extra: {
    id: number,
    name: string,
    price: number,
    image: string,
  }) => {
    
    const filteredExtras = selectedExtras.slice().filter(e => e.id !== extra.id)

    setSelectedExtras(filteredExtras)
  }

  return (
    <section className="fullScreen">
      <RedTopTexture>
        <div className="extrasWrapper">
          <img src={`/${singleMeal.image}`} alt="Image" />
          <p className="smallMessage">{singleMeal.meal?.name} {singleMeal.menuUpgrade && "Menu"}</p>
        </div>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading text={"Choose your extras"} fontSize={40} />

        <div className="extrasWrapper">
          {extras.map((extra) => (
            <ExtrasCard
              key={extra.id}
              extra={extra}
              extraType={extra.name}
              text={extra.name}
              image={extra.image}
              price={extra.price}
              handleSelect={handleSelectedExtras}
              handleRemove={handleRemoveExtra}
            />
          ))}
        </div>
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button className="cancelBtn" 
          onClick={() => {
            handleStepChange("supersize");
          }}>Cancel</button>
          <p>2/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("sides");
              setExtras(selectedExtras)
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon>
    </section>
  );
};

export default Extras;
