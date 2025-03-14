import { useContext } from "react";
import ViewFullScreenAnimated from "../../Reusables/ViewFullScreenAnimated/ViewFullScreenAnimated";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import styles from "./OutOfServiceStyles.module.css";
import { t } from "i18next";

const OutOfServiceScreen = () => {
  const {  data } = useContext(DataContext);

  return (
    <ViewFullScreenAnimated
      framerKey={"outOFService"}
      style={{
        backgroundImage: `url('${data.ThemeResponse.CoverImage.Url ?? ""}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.outOfServiceBanner}>
          <h1>{t("outOfOrder.title")}</h1>
        </div>
        <h2 className={styles.subtitle}>{t("outOfOrder.subtitle")}</h2>
      </div>
    </ViewFullScreenAnimated>
  );
};

export default OutOfServiceScreen;
