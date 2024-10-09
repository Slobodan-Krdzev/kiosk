import { useContext, useState } from "react";
import BigerHeading from "../Reusables/BigerHeading";
import ExtrasCard from "../Reusables/ExtrasCard";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeBottomRibbon from "../Reusables/UpgradeBottomRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { Option } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

// const extras = [
//   {
//     id: 1,
//     name: "Ketchup",
//     price: 1.4,
//     image: "/extras.png",
//   },
//   {
//     id: 2,
//     name: "Mayo",
//     price: 1.4,
//     image: "/extras.png",
//   },
//   {
//     id: 3,
//     name: "Mustard",
//     price: 1.4,
//     image: "/extras.png",
//   },
//   {
//     id: 4,
//     name: "Pesto",
//     price: 2.4,
//     image: "/extras.png",
//   },
//   {
//     id: 5,
//     name: "BBQ Sauce",
//     price: 2.4,
//     image: "/extras.png",
//   },
//   {
//     id: 6,
//     name: "Tsatziki",
//     price: 3.4,
//     image: "/extras.png",
//   },
// ];

const Extras = () => {
  const { handleStepChange } = useContext(StepContext);
  const { setExtras, singleMeal } = useContext(OrderContext);
  const { data, theme } = useContext(DataContext);
  const extrasOptions =
    data.TMKData[0].UpsaleColletions[0].UpsaleSteps[2].Options;

  const [selectedExtras, setSelectedExtras] = useState<Option[]>([]);

  const handleSelectedExtras = (extra: Option) => {
    // const formatedExtra: ExtraType = {
    //   id: extra.id,
    //   type: extra.name,
    //   price: extra.price,
    // };

    setSelectedExtras([...selectedExtras, extra]);
  };

  const handleRemoveExtra = (extra: Option) => {
    const filteredExtras = selectedExtras
      .slice()
      .filter((e) => e.Id !== extra.Id);

    setSelectedExtras(filteredExtras);
  };

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

        <div className="extrasWrapper">
          {extrasOptions.map((extra: Option) => (
            <ExtrasCard
              key={extra.Id}
              extra={extra}
              theme={theme}
              handleSelect={handleSelectedExtras}
              handleRemove={handleRemoveExtra}
            />
          ))}
        </div>
      </div>

      <UpgradeBottomRibbon>
        <div>
          <button
            className="cancelBtn"
            onClick={() => {
              handleStepChange("supersize");
            }}
          >
            Cancel
          </button>
          <p>2/5</p>
          <button
            className="cancelBtn nextBtn"
            onClick={() => {
              handleStepChange("sides");
              setExtras(selectedExtras);
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
