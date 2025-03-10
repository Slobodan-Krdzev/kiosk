import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import DineInOutBtn from "../../Reusables/DineInOutBtn/DineInOutBtn";
import DineIn from "../../Reusables/SVG/DineIn";
import Takeaway from "../../Reusables/SVG/Takeaway"; 
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";
import styles from "./ChooseLangStyles.module.css";

const ChooseLang = () => {
  const { handleStepChange, handleSetTakeawayOption } = useContext(StepContext);
  const { data, theme } = useContext(DataContext);
  const [option, setOption] = useState<"Takeaway" | "Dine In" | undefined>(
    undefined
  );

  const { t } = useTranslation();

  const dineInClickHandler = () => {
    setOption("Dine In");
    handleSetTakeawayOption("Dine In");
    handleStepChange('order')
  };

  const dineOutClickHandler = () => {
    handleSetTakeawayOption("Takeaway");
    setOption("Takeaway");
    handleStepChange('order')

    // if (option === "Take Away") {
    //   handleStepChange("order");
    // } else {
    //   setOption("Take Away");
    // }
  };

  return (
    <ViewFullScreenAnimated
      framerKey={"menuTypeChooser"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('${data.ThemeResponse.CoverImage.Url ?? ""}')`,
      }}
    >
      <div className={styles.langViewMenuOptionsWrapper}>
        <DineInOutBtn
          clickHandler={dineOutClickHandler}
          selectedOption={option}
          option={"Takeaway"}
          themeColor={theme.activeTextColor}
        >
          <>
            <Takeaway color={theme.activeTextColor} size="large"/>

            <p className={styles.menuOptionsText}>
              {t("takeaway")}
            </p>
          </>
        </DineInOutBtn>

        <DineInOutBtn
          clickHandler={dineInClickHandler}
          selectedOption={option}
          option={"Dine In"}
          themeColor={theme.activeTextColor}
        >
          <>
            <DineIn color={theme.activeTextColor} size="large"/>

            <p className={styles.menuOptionsText}>
              {t("dine_in").substring(0, 15)}
            </p>
          </>
        </DineInOutBtn>
      </div>
    </ViewFullScreenAnimated>
  );
};

export default ChooseLang;
