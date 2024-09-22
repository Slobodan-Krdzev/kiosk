import { useContext } from "react";
import BigerHeading from "../Reusables/BigerHeading";
import BottomGreenRibbon from "../Reusables/BottomGreenRibbon";
import Logo from "../Reusables/Logo";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

const ChooseLang = () => {
  const { handleStepChange } = useContext(StepContext);
  const {setTakeaway} = useContext(OrderContext)
  const { data } = useContext(DataContext);


  return (
    <section className="fullScreen">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem",
        }}
      >
        <Logo source={data.ThemeResponse.LogoImage.Url}/>
      </div>
      <div style={{ marginBottom: "4rem" }}>
        <BigerHeading text="Welkom bij Eazie wilt u uw bestelling" width={60} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
          margin: "0 auto",
          gap: "18px",
        }}
      >
        <button
          className="langMenuBtn"
          onClick={() => {
            handleStepChange("order");
          }}
        >
          <div style={{ padding: "2rem" }}>
            <img
              src="/fork.png"
              alt="Fork Vector"
              style={{ width: "94.67px" }}
            />
          </div>
          <BigerHeading text="Hier Opeten" width={100} fontSize={40} />
        </button>

        <button
          className="langMenuBtn"
          onClick={() => {
            handleStepChange("order");
            setTakeaway()
          }}
        >
          <div style={{ padding: "2rem" }}>
            <img
              src="takeaway.png"
              alt="Takeaway Vector"
              style={{ width: "173px" }}
            />
          </div>
          <BigerHeading text="Meenemen" width={100} fontSize={40} />
        </button>
      </div>

      <div style={{ width: "70%", margin: "4rem auto" }}>lang</div>
      <BottomGreenRibbon>
        <></>
      </BottomGreenRibbon>
    </section>
  );
};

export default ChooseLang;
