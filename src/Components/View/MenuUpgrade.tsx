import { useContext, useState } from "react";
import { DataContext } from "../../Contexts/DataContext/Datacontext";
import { Option } from "../../Types/Types";
import RedTopTexture from "../Reusables/RedTopTexture";
import UpgradeMenuWrapper from "../Reusables/UpgradeMenuWrapper";

const MenuUpgrade = () => {
  // const { handleStepChange } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  // const { setMenuUpgrade, placeMealInOrders, singleMeal} = useContext(OrderContext);

  const [option, setOption] = useState<Option | undefined>(undefined);
  const handleOptionChange = (option: Option) => {
    setOption(option);
  };

  // const totalUpsaleSteps = data.TMKData[0].UpsaleColletions[0].NumberOfSteps;
  // const upsaleStep = data.TMKData[0].UpsaleColletions[0].UpsaleSteps[0];

  return (
    <section className="fullScreen">
      <RedTopTexture
        image={data.TMKData[0].UpsaleColletions[0].UpsaleSteps[0].PictureUrl}
      >
        <>
          <p className="message">
            {data.TMKData[0].UpsaleColletions[0].UpsaleSteps[0].Name}
          </p>
        </>
      </RedTopTexture>

      <div style={{ paddingTop: "2rem" }}>
        <p className="pageTitleHeading fontRaleway" style={{textAlign: 'center'}}>Do you want to make it a menu?</p>
        

        <UpgradeMenuWrapper
          setType="menuUpgrade"
          topTextNormal="No, only the meal."
          topTextUpgrade="Yes, make it a menu."
          data={data.TMKData[0].UpsaleColletions[0].UpsaleSteps[0]}
          theme={theme}
          handleOptionChange={handleOptionChange}
          selectedOption={option}
        />
      </div>

    </section>
  );
};

export default MenuUpgrade;
