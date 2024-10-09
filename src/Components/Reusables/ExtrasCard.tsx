import { useState } from "react";
import { Option, ThemeType } from "../../Types/Types";

type ExtrasCardPropsType = {
  extra: Option;
  theme: ThemeType
  handleSelect: (extra: Option) => void;
  handleRemove: (extra: Option) => void;
};

const ExtrasCard = ({
  
  extra,
  theme,
  handleSelect
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
        className="extraBtnButton"
        style={{
          backgroundColor: isSelected ? theme.activeTextColor : "inherit",
          borderColor: isSelected ? "" : theme.activeTextColor,
        }}
        onClick={() => {
          setIsSelected(!isSelected);

          if (isSelected) {
            handleSelect(extra);
          } else {
            handleSelect(extra);
          }
        }}
      >
        <img src={isSelected ? "/checkMark.png" : "/plus.png"} alt="Button" />
      </button>
    </div>
  );
};

export default ExtrasCard;
