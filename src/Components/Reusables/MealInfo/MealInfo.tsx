import { t } from "i18next";
import { Product } from "../../../Types/Types";
import AlergenItem from "../AlergenItem/AlergenItem";
import Pregnancy from "../SVG/Pregnancy";
import Spicy from "../SVG/Spicy";
import Vegan from "../SVG/Vegan";
import Vegeterian from "../SVG/Vegeterian";
import styles from "./MealInfoStyles.module.css";
import AlergensListerMealInfo from "../AlergensListerMealInfo/AlergensListerMealInfo";
import DefaultButton from "../DefaultButton/DefaultButton";
import PricePreviewer from "../PricePreviewer/PricePreviewer";
import { useContext } from "react";
import { StepContext } from "../../../Contexts/StepContext/StepContext";

interface MealInfoProps {
  meal: Product;
  availability: boolean;
}

const MealInfo = ({ meal }: MealInfoProps) => {

  const {handleSetMealForInfo} = useContext(StepContext)

  return (
    <div className={styles.mealInfoWrapper}>
      <div className={styles.image}
        style={{backgroundImage: `url(${meal.SmallPictureUrl})`}}
      ></div>

      <div className={styles.titleQuantityWrapper}>
        <div className={styles.titlePriceWraper}>
          <p className={styles.mealName}>{meal.Name}</p>
          <PricePreviewer price={meal.Price} color={"black"} style={{position: 'relative'}}/>
        </div>
        <div className={styles.btns}>btns</div>
      </div>

      <p className={styles.desc}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{" "}"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <div className={styles.barsWrapper}>
        {true && (
          <AlergenItem bgColor="#BB6BD9" text={t("pregnancy")}>
            <Pregnancy />
          </AlergenItem>
        )}
        {true && (
          <AlergenItem bgColor="#219653" text={t("vegan")}>
            <Vegan />
          </AlergenItem>
        )}
        {true && (
          <AlergenItem bgColor="#FF9500" text={t("spicy")}>
            <Spicy />
          </AlergenItem>
        )}
        {true && (
          <AlergenItem bgColor="#235F0A" text={t("vegeterian")}>
            <Vegeterian />
          </AlergenItem>
        )}
      </div>

      <div className={styles.alergensWrapper}>
        <AlergensListerMealInfo product={meal} />
      </div>

      <div className={styles.btnsWrapper}>
        <DefaultButton clickHandler={() => {
          handleSetMealForInfo( {} as Product, false )
        }} style={{
            height: '6vh',
            minHeight: '100%',
            alignSelf: 'stretch',
            flexBasis: '50%',
            backgroundColor: 'white',
            color: 'black',
            textTransform: 'uppercase'
        }}>close</DefaultButton>
        <DefaultButton clickHandler={() => {}} style={{
            height: '6vh',
            minHeight: '100%',
            flexBasis: '50%',
            backgroundColor: 'black',
            color: 'white',
            textTransform: 'uppercase'
        }}>Add</DefaultButton>
      </div>
    </div>
  );
};

export default MealInfo;
