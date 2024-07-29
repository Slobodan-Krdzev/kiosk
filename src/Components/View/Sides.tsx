import { useContext, useState } from "react";
import BigerHeading from "../Reusables/BigerHeading";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { SidesType } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import SidesCard from "../Reusables/SidesCard";

const sides = [
  {
    id: 1,
    name: "Fries",
    price: 1.4,
    image: "/sides.png",
  },
  {
    id: 2,
    name: "Fries2",
    price: 1.4,
    image: "/sides.png",
  },
  {
    id: 3,
    name: "Fries3",
    price: 1.4,
    image: "/sides.png",
  },
  {
    id: 4,
    name: "Fries4",
    price: 1.4,
    image: "/sides.png",
  },
  {
    id: 5,
    name: "Fries5",
    price: 1.4,
    image: "/sides.png",
  },
  {
    id: 6,
    name: "Fries6",
    price: 1.4,
    image: "/sides.png",
  },
];

const Sides = () => {

  const {handleStepChange} = useContext(StepContext)
  const {setSides, singleMeal} = useContext(OrderContext)
  const [selectedSides, setSelectedSides] = useState<SidesType | undefined>()

  const handleSelectedSides = (side: {
    id: number,
    name: string,
    price: number,
    image: string,
  }) => {

    const formatedSides:SidesType = {
      id: side.id,
      type: side.name,
      price: side.price
    }

    setSelectedSides(formatedSides)
  }

  const handleRemoveExtra = () => setSelectedSides(undefined)

  console.log(selectedSides);
  

  return (
    <section className="fullScreen">
      <RedTopTexture>
        <div className="extrasWrapper">
          <img src={`/${singleMeal.image}`} alt="Image" />
          <p className="smallMessage">{singleMeal.meal?.name} {singleMeal.menuUpgrade && 'Menu'}</p>
        </div>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading text={"Choose your sides"} fontSize={40} />

        <div className="extrasWrapper">
          {sides.map((extra) => (
            <SidesCard
              key={extra.id}
              extra={extra}
              extraType={extra.name}
              text={extra.name}
              image={extra.image}
              price={extra.price}
              handleSelect={handleSelectedSides}
              handleRemove={handleRemoveExtra}
              selected={selectedSides}
            />
          ))}
        </div>
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button className="cancelBtn" 
          onClick={() => {
            handleStepChange("extras");
          }}>Cancel</button>
          <p>3/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("drinks");

              
              if(selectedSides) setSides(selectedSides)
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon>
    </section>
  )
}

export default Sides