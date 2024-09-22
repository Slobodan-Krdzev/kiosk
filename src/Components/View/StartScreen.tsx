import { useContext } from "react";
import BottomGreenRibbon from "../Reusables/BottomGreenRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
// import Logo from "../Reusables/Logo";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

const StartScreen = () => {
  const { handleStepChange } = useContext(StepContext);
  const { data } = useContext(DataContext);


  return (
    <section className="startScreen" style={{backgroundImage: `url('${data.ThemeResponse.CoverImage.Url}')`}}>
      <div className="overlay">
        <div className="h1Wrapper">
          <h1 className="text-5xl">
            {data.ThemeResponse.RestaurantName}
          </h1>
        </div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            
          }}
        >

            {/* <Logo source={data.ThemeResponse.LogoImage.Url}/> */}
        </div>
      </div>
      <BottomGreenRibbon>
        <button
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            fontFamily: "sans-serif",
            backgroundColor: "inherit",
            minWidth: "100%",
            minHeight: "150px",
            border: "none",
          }}
          onClick={() => {
            handleStepChange("lang");
          }}
        >
          Start Order
        </button>
      </BottomGreenRibbon>
    </section>
  );
};

export default StartScreen;
