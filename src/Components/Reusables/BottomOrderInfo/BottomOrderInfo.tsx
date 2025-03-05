import { useContext } from "react";
import styles from "./BottomOrderInfoStyles.module.css";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import Chevron from "../SVG/Chevron";
import PricePreviewer from "../PricePreviewer/PricePreviewer";
import { t } from "i18next";

interface BottomOrderInfoPropsType {
  total: number;
  numberOfProductsInCart: number;
  nextText: string;
  clickHandler: () => void;
  width: string | number;
}

const BottomOrderInfo = ({
  clickHandler,
  width,
  total,
  numberOfProductsInCart,
  nextText,
}: BottomOrderInfoPropsType) => {
  const { theme } = useContext(DataContext);

  return (
    <div
      className={styles.bottomOrderInfoWrapper}
      style={{ backgroundColor: "#232421", flexBasis: width }}
      onClick={clickHandler}
    >
      <div
        className={styles.ordersLengthWrapper}
        style={{ backgroundColor: theme.activeTextColor }}
      >
        <p>{numberOfProductsInCart}</p>
      </div>
      <div className={styles.orderTotal}>
        <p style={{ fontSize: "3.2vw" }}>{t('total')}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "end",
            gap: "4%",
          }}
        >
          <PricePreviewer
            price={total}
            color={"white"}
            style={{ position: "relative" }}
            fontSizeRound={"6vw"}
            fontSizeDecimal={"3.4vw"}
          />
          {/* <p>{data.ThemeResponse.CurrencySettings.CurrencySymbol} </p>  */}
        </div>
      </div>
      <p className={styles.nextText}>
        {nextText} <Chevron color="white" />
      </p>
    </div>
  );
};

export default BottomOrderInfo;
