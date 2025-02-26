import { useContext } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomOpacityContentWrapper from "../../Reusables/BottomOpacityContentWrapper/BottomOpacityContentWrapper";
import LanguageSelector from "../../Reusables/LanguageSelectors/LanguageSelector";
import LargeBtn from "../../Reusables/LargeBtn/LargeBtn";
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";

const StartScreen = () => {
  const { handleStepChange } = useContext(StepContext);
  const { data } = useContext(DataContext);

  return (
    <ViewFullScreenAnimated
      framerKey={"startScreen"}
      style={{
        backgroundImage: `url('${data.ThemeResponse.CoverImage.Url ?? ""}')`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <BottomOpacityContentWrapper
        style={{
          background: `linear-gradient(180.09deg, rgba(20, 20, 20, 0) 0.07%, rgba(0, 0, 0, 0.71) 99.93%)`,
          height: "33.333vh",
          gap: "3vh",
          padding: "8vw 5vw",
        }}
      >
        <LanguageSelector />
        <LargeBtn
          borderColor="white"
          width={"100%"}
          clickHandler={() => {
            handleStepChange("lang")
            document.documentElement.requestFullscreen();
          }}
        >
          Start Ordering
        </LargeBtn>
      </BottomOpacityContentWrapper>
    </ViewFullScreenAnimated>
  );
};

export default StartScreen;
