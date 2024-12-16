import { useContext } from "react";
import styles from "./SingleAlergenItemStyles.module.css";
import { DataContext } from "../../../../Contexts/DataContext/Datacontext";
import { AllergenType } from "../../../../Types/Types";

type SingleAlergenItemPropsType = {
  alergen: {
    AllergenTypeId: number;
    AllergenType: number;
    IsActive: boolean;
  };
};

const SingleAlergenItem = ({ alergen }: SingleAlergenItemPropsType) => {
  const { theme } = useContext(DataContext);

  return (
    <div className={styles.singleAlergenItem}>
      <img
        src={`/allergens/0${alergen.AllergenTypeId}.png`}
        alt={AllergenType[alergen.AllergenType]}
        className={`${styles.alergenImage}`}
        style={{backgroundColor: theme.activeTextColor}}
      />

      <p className={`fontSF`}>{AllergenType[alergen.AllergenType].substring(0,8)}</p>
    </div>
  );
};

export default SingleAlergenItem;
