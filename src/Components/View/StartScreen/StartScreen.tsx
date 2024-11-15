import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
// import Logo from "../Reusables/Logo";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import Logo from "../../Reusables/Logo";
import styles from "./StartScreenStyles.module.css";

const StartScreen = () => {
  const { handleStepChange } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);

  return (
    <section
      className={`fullScreenTablet ${styles.startScreen}`}
      style={{
        backgroundImage: `url('${data.ThemeResponse.CoverImage.Url ?? ""}')`,
      }}
    >
      <div className={`overlay ${styles.startScreenOverlay}`}>
        <h1
          className="fontNoteworthy"
          style={{
            fontSize: "calc(60px / 1.33)",
            textAlign: "center",
            fontWeight: 700,
            lineHeight: "calc(90px / 1.33)",
          }}
        >
          Your Favourite Meals, <br /> Just a Tap Away
        </h1>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo width={70} source={data.ThemeResponse.LogoImage.Url} />
        </div>
        <BottomGreenRibbon bgColor={theme.activeTextColor}>
          <button
            className="fontSF"
            style={{
              lineHeight: "calc(34px / 1.33 )",
              fontSize: "calc( 28px / 1.33 )",
              fontWeight: 400,
              textTransform: "capitalize",
              backgroundColor: theme.activeTextColor,
              color: "#202020",
              minWidth: "100%",
              minHeight: "100%",
              cursor: "pointer",
              outline: "none",
              border: "none",
              borderRadius: "calc(70px / 1.33)",
            }}
            onClick={() => {
              handleStepChange("lang");

              document.documentElement.requestFullscreen();
            }}
          >
            Place Order
          </button>
        </BottomGreenRibbon>
      </div>
    </section>
  );
};

export default StartScreen;
