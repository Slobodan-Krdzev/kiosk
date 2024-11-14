import { useState } from "react";
import { Option, ThemeType } from "../../Types/Types";

type ExtrasCardPropsType = {
  extra: Option;
  theme: ThemeType
  handleSelect: (extra: Option) => void;
  handleRemove: (extra: Option) => void;
  maxSelection: number;
  currentSelectionLength: number
};

const ExtrasCard = ({
  extra,
  theme,
  handleSelect,
  handleRemove,
  maxSelection,
  currentSelectionLength
}: ExtrasCardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="extraBtn">
      <img src={extra.PictureUrl} alt={extra.Name} />
      <p style={{ fontSize: "26px", fontWeight: 600, lineHeight: "39px" }}>
        {extra.Name}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "32px" }}>
        {extra.Price}
      </p>
      <button
        disabled={currentSelectionLength >= maxSelection && !isSelected}
        className="extraBtnButton"
        style={{
          backgroundColor: isSelected ? theme.activeTextColor : "inherit",
          borderColor: isSelected ? "" : theme.activeTextColor,
        }}
        onClick={() => {
          setIsSelected(!isSelected);

          if (isSelected) {
            handleRemove(extra);

          } else {
            handleSelect(extra);

          }
        }}
      > 
        {currentSelectionLength >= maxSelection ? <span style={{fontSize:16}}>max</span>: isSelected ?  <span>&#10003;</span> : <span>&#43;</span> }
        
      </button>
    </div>
  );
};

export default ExtrasCard;
