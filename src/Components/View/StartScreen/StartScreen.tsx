import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
// import Logo from "../Reusables/Logo";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import Logo from "../../Reusables/Logo";
import styles from "./StartScreenStyles.module.css"

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
          style={{ fontSize: 60, textAlign: "center" }}
        >
          Your Favourite Meals, <br /> Just a Tap Away
        </h1>
        <Logo width={60} source={data.ThemeResponse.LogoImage.Url} />
        <BottomGreenRibbon bgColor={theme.activeTextColor}>
          <button
            className="fontSF"
            style={{
              lineHeight: "34px",
              fontSize: 28,
              fontWeight: 400,
              textTransform: "capitalize",
              backgroundColor: "inherit",
              color: '#202020',
              minWidth: "100%",
              minHeight: '100%',
              cursor: "pointer",
              padding: '4%',
              outline: 'none',
              border:'none',
              borderRadius: "70px"
            }}
            onClick={() => {
              handleStepChange("lang");
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
