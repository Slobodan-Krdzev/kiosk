import { useState } from "react";

type ExtrasCardPropsType = {
  extraType?: string;
  text: string;
  image: string;
  price: number;
  extra: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  handleSelect: (extra: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void;
  handleRemove: (extra: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void;
};

const ExtrasCard = ({
  text,
  image,
  price,
  handleSelect,
  extra,
}: ExtrasCardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="extraBtn">
      <img src={image} alt={text} />
      <p style={{ fontSize: "26px", fontWeight: 600, lineHeight: "39px" }}>
        {text}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "32px" }}>
        {price}
      </p>
      <button
        className="extraBtnButton"
        style={{
          backgroundColor: isSelected ? "#CEDC00" : "inherit",
          borderColor: isSelected ? "" : "#CEDC00",
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
