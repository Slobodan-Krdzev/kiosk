import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { Option } from "../../Types/Types";
import BigerHeading from "../Reusables/BigerHeading";
import ExtrasCard from "../Reusables/ExtrasCard";
import RedTopTexture from "../Reusables/RedTopTexture";


const Extras = () => {
  // const { handleStepChange } = useContext(StepContext);
  const {  singleMeal } = useContext(OrderContext);
  const { data, theme } = useContext(DataContext);
  const extrasOptions =
    data.TMKData[0].UpsaleColletions[0].UpsaleSteps[2].Options;
    const maxSelection = 2
    

  const [selectedExtras, setSelectedExtras] = useState<Option[]>([]);

  const handleSelectedExtras = (extra: Option) => {

    setSelectedExtras([...selectedExtras, extra]);
  };

  const handleRemoveExtra = (extra: Option) => {
    const filteredExtras = selectedExtras
      .slice()
      .filter((e) => e.Id !== extra.Id);

    setSelectedExtras(filteredExtras);
  };

  useEffect(() => {}, [selectedExtras])

  return (
    <section className="fullScreen">
      <RedTopTexture image="asd">
        <div className="extrasWrapper">
          <img src={singleMeal.product!.SmallPictureUrl} alt="Product Image" />
          <p className="smallMessage">
            {singleMeal.product!.Name} {singleMeal.menuUpgrade && "Menu"}
          </p>
        </div>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <BigerHeading
          text={data.TMKData[0].UpsaleColletions[0].UpsaleSteps[2].Name}
          fontSize={40}
        />

        <div className="extrasWrapper" style={{marginTop: '2rem'}}>
          {extrasOptions.map((extra: Option) => (
            <ExtrasCard
              key={extra.Id}
              extra={extra}
              theme={theme}
              handleSelect={handleSelectedExtras}
              handleRemove={handleRemoveExtra}
              maxSelection={maxSelection}
              currentSelectionLength={selectedExtras.length}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Extras;
