import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
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
        <h1 className={` ${styles.title} fontNoteworthy`} >
          Your Favourite Meals, <br /> Just a Tap Away
        </h1>
        <div className={styles.logoWrapper}>
          <Logo width={70} source={data.ThemeResponse.LogoImage.Url} />
        </div>
        <BottomGreenRibbon bgColor={theme.activeTextColor}>
          <button
            className="fontSF bottomRibbonButton"
            style={{
              backgroundColor: theme.activeTextColor,
              color: theme.textColor
            }}
            onClick={() => {
              handleStepChange("lang");

              document.documentElement.requestFullscreen();
            }}
          >
            Start Updated
          </button>
        </BottomGreenRibbon>
      </div>
    </section>
  );
};

export default StartScreen;
