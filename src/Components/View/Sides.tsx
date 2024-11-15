import { useContext, useState } from "react";
import { DataContext } from "../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { Option } from "../../Types/Types";
import BigerHeading from "../Reusables/BigerHeading";
import RedTopTexture from "../Reusables/RedTopTexture";
import SidesCard from "../Reusables/SidesCard";


const Sides = () => {
  // const { handleStepChange } = useContext(StepContext);
  const { singleMeal } = useContext(OrderContext);
  const { data, theme} = useContext(DataContext);
  const [selectedSides, setSelectedSides] = useState<Option[]>([]);

  const sidesOptions =data.TMKData[0].UpsaleColletions[0].UpsaleSteps[3].Options;
  const maxCount = 2

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

  console.log(maxCount,"maxcount", selectedSides.length);
  

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
              theme={theme}
              maxSelection={maxCount}
              currentSelectionCount={selectedSides?.length}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Sides;
