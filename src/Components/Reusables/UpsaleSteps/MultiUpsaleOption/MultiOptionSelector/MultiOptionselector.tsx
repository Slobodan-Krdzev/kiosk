import { useContext, useState } from "react";
import { DataContext } from "../../../../../Contexts/DataContext/Datacontext";
import { UpsaleContext } from "../../../../../Contexts/UpsaleContext/UpsaleContext";
import { Option } from "../../../../../Types/Types";
import CheckMark from "../../../SVG/CheckMark";
import Plus from "../../../SVG/Plus";
import styles from "./MultiOptionSelectorStyles.module.css";
import Trashcan from "../../../SVG/Trashcan";

type MultiOptionSelectorPropsType = {
  option: Option;
  maxSelection: number;
  upsaleStep: number;
};

const MultiOptionselector = ({
  option,
  maxSelection,
  upsaleStep,
}: MultiOptionSelectorPropsType) => {

  const [isSelected, setIsSelected] = useState(false)
  const { theme } = useContext(DataContext);
  const { upsaleData, addOption, removeOption } = useContext(UpsaleContext);
  const isOptionAlreadySelected = Boolean(
    upsaleData[upsaleStep].options.find((o) => o.Id === option.Id)
  );

  const [quantity, setQuantity] = useState(1)

  const dynamicStyles = {
    boxShadow: `20px 20px 60px 0px ${theme.activeTextColor}14`,
  };

  const selectedOptionsLength = upsaleData[upsaleStep].options.length


  // const handleIncreaseQuantity = (quantity: number, option: Option, step: number) => {

  //   // vrz baza na 


  // }

  return (
    <div
      role="button"
      className={styles.optionSelector}
      style={{
        ...dynamicStyles,
        border: isOptionAlreadySelected
          ? `1px solid ${theme.activeTextColor}`
          : "",
        backgroundColor: isOptionAlreadySelected
          ? `${theme.activeTextColor}40`
          : selectedOptionsLength === 0 ? 'white' : "#F1F1F1",

          // OVDEKA ZA TESTIRANJE MAXSELECTION PROMENI GO SO ZAKUCAN BROJ  
        pointerEvents: selectedOptionsLength >= maxSelection && !isOptionAlreadySelected ? "none" : "auto",
      }}>
      <img
        src={option.PictureUrl}
        alt={option.Name}
        className={styles.image}
        style={{
          opacity: isOptionAlreadySelected ? 1 : selectedOptionsLength === 0 ? 1 : 0.55,
        }}
      />

      <p
        className={`fontSF ${styles.optionName}`}
        style={{ textAlign: "left" }}
      >
        {option.Name}
      </p>
      <p
        className={`fontSF ${styles.optionPrice}`}
        style={{ textAlign: "left" }}
      >
        {option.Price}
      </p>

      <div className={`fontSF ${styles.optionBtn}`}
        style={{
          backgroundColor: theme.activeTextColor,
          width: option.MaxSelection > 1 && isOptionAlreadySelected ? '100%' : '',
          borderTopLeftRadius: option.MaxSelection > 1 && isOptionAlreadySelected ? 0 : '',
          padding: option.MaxSelection > 1 && isOptionAlreadySelected ? '2vw' : '2%',
          justifyContent: option.MaxSelection > 1 && isOptionAlreadySelected ? "space-between" : 'center'

        }}
      >

        {!isOptionAlreadySelected && <button className={styles.addBtn}
        
        style={{ backgroundColor: theme.activeTextColor }}
        onClick={() => {
          isSelected ? removeOption(upsaleStep, option) : addOption(upsaleStep, option, 2);
        
          setIsSelected(!isSelected)
        }}
      >
        {isOptionAlreadySelected ? <CheckMark /> : <Plus />}
      </button> }

      {isOptionAlreadySelected && option.MaxSelection > 1 && 
        <>
          <button className={styles.counterBtns} onClick={() => {


            setQuantity(q => q - 1)
          }}>
            {quantity === 1 ? <Trashcan /> : '-'}
          </button>
          <p>{quantity}</p>
          <button className={styles.counterBtns} onClick={() => {


            setQuantity(q => q + 1)
          }}
          
          onBlur={() => {

            alert(`On Blur ${option.Name, quantity}`)
          }}>
            <Plus />
          </button>
        </>
      }
      
      </div>  
      

      
    </div>
  );
};

export default MultiOptionselector;
