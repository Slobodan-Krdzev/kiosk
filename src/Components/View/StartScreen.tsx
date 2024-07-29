import { useContext } from "react";
import BottomGreenRibbon from "../Reusables/BottomGreenRibbon";
import { StepContext } from "../../Contexts/StepContext/StepContext";
import Logo from "../Reusables/Logo";

const StartScreen = () => {
  const { handleStepChange } = useContext(StepContext);

  return (
    <section className="startScreen">
      <div className="overlay">
        <div className="h1Wrapper">
          <h1 className="text-5xl">
            Enjoy Life, <br /> eat healthy
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

            <Logo />
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
            minHeight: "200px",
            border: "none",
          }}
          onClick={() => {
            handleStepChange("lang");
          }}
        >
          TIK OM TE STARTEN
        </button>
      </BottomGreenRibbon>
    </section>
  );
};

export default StartScreen;
