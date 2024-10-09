import { useContext, useState } from "react";
import BigerHeading from "../Reusables/BigerHeading";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { Option } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import SidesCard from "../Reusables/SidesCard";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

// const sides = [
//   {
//     id: 1,
//     name: "Fries",
//     price: 1.4,
//     image: "/sides.png",
//   },
//   {
//     id: 2,
//     name: "Fries2",
//     price: 1.4,
//     image: "/sides.png",
//   },
//   {
//     id: 3,
//     name: "Fries3",
//     price: 1.4,
//     image: "/sides.png",
//   },
//   {
//     id: 4,
//     name: "Fries4",
//     price: 1.4,
//     image: "/sides.png",
//   },
//   {
//     id: 5,
//     name: "Fries5",
//     price: 1.4,
//     image: "/sides.png",
//   },
//   {
//     id: 6,
//     name: "Fries6",
//     price: 1.4,
//     image: "/sides.png",
//   },
// ];

const Sides = () => {
  const { handleStepChange } = useContext(StepContext);
  const { setSides, singleMeal } = useContext(OrderContext);
  const { data} = useContext(DataContext);
  const [selectedSides, setSelectedSides] = useState<Option[] | undefined>();

  const sidesOptions =data.TMKData[0].UpsaleColletions[0].UpsaleSteps[3].Options;

  const handleSelectedSides = (side: Option) => {
    if (!selectedSides) {
      setSelectedSides([side]);
    } else {
      setSelectedSides([...selectedSides, side]);
    }
  };

  const handleRemoveExtra = (side: Option) => {
    
    const filteresSides = selectedSides?.filter(s => s.Id !== side.Id)

    setSelectedSides(filteresSides)
  }

  return (
    <section className="fullScreen">
      <RedTopTexture image="">
        <div className="extrasWrapper">
          <img src={`/${singleMeal.image}`} alt="Image" />
          <p className="smallMessage">
            {singleMeal.product!.Name} {singleMeal.menuUpgrade && "Menu"}
          </p>
        </div>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading text={"Choose your sides"} fontSize={40} />

        <div className="extrasWrapper">
          {sidesOptions.map((extra) => (
            <SidesCard
              key={extra.Id}
              extra={extra}
              handleSelect={handleSelectedSides}
              handleRemove={handleRemoveExtra}
              selected={selectedSides!}
            />
          ))}
        </div>
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button
            className="cancelBtn"
            onClick={() => {
              handleStepChange("extras");
            }}
          >
            Cancel
          </button>
          <p>3/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("drinks");

              if (selectedSides) setSides(selectedSides);
            }}
          >
            Next
          </button>
        </div>
      </UpgradeBottomRibbon>
    </section>
  );
};

export default Sides;
