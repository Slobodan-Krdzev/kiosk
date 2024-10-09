import { useContext } from "react";
import BottomGreenRibbon from "../Reusables/BottomGreenRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
// import Logo from "../Reusables/Logo";
import { DataContext } from "../../Contexts/DataContext/Datacontext";

const StartScreen = () => {
  const { handleStepChange } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);

  return (
    <section
      className="startScreen"
      style={{
        backgroundImage: `url('${data.ThemeResponse.CoverImage.Url ?? ""}')`,
      }}
    >
      <div className="overlay">
        <div className="h1Wrapper">
          <h1 className="fontDancing">Enjoy Life <br /> Eat Healthy</h1>
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
          className="fontRaleway startBtn"
          style={{
            lineHeight: '34px',
            fontWeight: 600,
            textTransform: 'uppercase',
            backgroundColor: theme.bgColor,
            color: theme.textColor,
            minWidth: "100%",
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
