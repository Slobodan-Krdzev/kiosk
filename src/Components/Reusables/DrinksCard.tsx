import { useState } from "react";
import { DrinksType, Option } from "../../Types/Types";

type DrinksCardPropsType = {
  extra: Option;
  addDrink: (drink: Option) => void;
  removeDrink: (drink: Option) => void;
  addQuantity: (drink: DrinksType) => void;
};

const DrinksCard = ({
  extra,
  addDrink,
  removeDrink,
  addQuantity,
}: DrinksCardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="extraBtn">
      <img src={extra.PictureUrl} alt={extra.Name} />
      <p style={{ fontSize: "26px", fontWeight: 600, lineHeight: "39px" }}>
        {extra.Name}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "32px" }}>
        {extra.Price}
      </p>

      {!isSelected && (
        <button
          className="drinksBtnButton"
          onClick={() => {
            setIsSelected(!isSelected);
            addDrink(extra);
          }}
        >
          <img src={isSelected ? "/checkMark.png" : "/plus.png"} alt="Button" />
        </button>
      )}

      {isSelected && (
        <div className="drinksCardQuantityWrapper">
          <button
            onClick={() => {
              if (quantity === 1) {
                setQuantity(1);
                setIsSelected(false);
                removeDrink(extra);
              } else if (quantity === 0) {
                removeDrink(extra);
              } else {
                setQuantity(quantity - 1);
                addQuantity({
                  drink: extra,
                  quantity: quantity - 1,
                  total: (quantity - 1) * extra.Price,
                });
              }
            }}
          >
            <img src="/minus.png" alt="Add" className="minusIcon" />
          </button>
          <p className="quantityCounter">{quantity}</p>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
              addQuantity({
                drink: extra,
                quantity: quantity + 1,
                total: (quantity + 1) * extra.Price,
              });

              console.log(quantity + 1);
            }}
          >
            <img src="/plus.png" alt="Add" className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DrinksCard;
