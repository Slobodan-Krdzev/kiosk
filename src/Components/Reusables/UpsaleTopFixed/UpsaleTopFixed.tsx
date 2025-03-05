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
  const { data } = useContext(DataContext);

  const topImage = data.TMKData[0].UpsaleColletions[0].UpsaleSteps[0].PictureUrl

  if (version === 0) {
    return (
      <div
        className={styles.topFixed}
        style={{ backgroundImage: `url(${topImage})` }}
      >
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
