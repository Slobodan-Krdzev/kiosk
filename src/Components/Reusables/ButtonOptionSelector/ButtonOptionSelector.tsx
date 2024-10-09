
import { Option, SingleMealType, ThemeType } from "../../../Types/Types";
import styles from "./ButtonOptionSelectorStyles.module.css";

type ButtonOptionSelectorPropsType = {
  option: Option;
  singleMeal: SingleMealType;
  handleOptionChange: (option:Option) => void;
  optionSelected: Option | undefined,
  theme:ThemeType
};

const ButtonOptionSelector = ({ option, singleMeal, handleOptionChange, optionSelected,theme }: ButtonOptionSelectorPropsType) => {

    
  return (
    <button className={styles.optionButton}
      style={{borderColor: optionSelected?.Name === option.Name ? theme.activeTextColor : ""}}  
        onClick={() => {
        handleOptionChange(option)
    }}>
      <div className={styles.optionBtnImageWrapper}>
        <p className="fontRaleway productNameHeading">{option.Finish ? 'No Menu Please!' : "Yes, I'll take the menu!"}</p>
        <img
          src={option.PictureUrl}
          alt={option.Name}
          className={styles.optionBtnImage}
        />
      </div>
      <p className="productPriceHeading fontRaleway" style={{marginBottom: '0.5rem', fontWeight: 700}}>{option.Price === 0 ? singleMeal.product!.Price : `+${option.Price}` }</p>
      <p className="fontRaleway optionNameHeading" >{option.Name}</p>
    </button>
  );
};

export default ButtonOptionSelector;
