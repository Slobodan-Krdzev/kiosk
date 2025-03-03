import { useContext } from "react";
import XButton from "../XButton/XButton";
import styles from "./UpsaleTopFixedStyles.module.css";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";

interface UpsaleTopFixedProps {
  version: 0 | 1;
  image: string;
  productName: string;
  xButtonClickHandler?: () => void;
}

const UpsaleTopFixed = ({
  version,
  image,
  productName,
  xButtonClickHandler,
}: UpsaleTopFixedProps) => {
  const { theme } = useContext(DataContext);

  if (version === 0) {
    return (
      <div
        className={styles.topFixed}
        style={{ backgroundColor: theme.activeTextColor }}
      >
        <h1
          className={styles.topText}
          style={{ backgroundColor: theme.activeTextColor }}
        >
          <b style={{ fontWeight: 800 }}>30%</b> off extras
        </h1>
        <XButton
          clickHandler={() => {
            if (xButtonClickHandler) xButtonClickHandler();
          }}
          style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            width: '40px',
            asspectRatio: '1/1'
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.topFixed} ${styles.topContentImage}`}>
      <div className={styles.overlay}>
        <img className={styles.overlayImage} src={image} alt={productName} />
      </div>
    </div>
  );
};

export default UpsaleTopFixed;
