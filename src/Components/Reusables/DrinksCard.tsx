import { useState } from "react";
import { DrinksType, Option, ThemeType } from "../../Types/Types";

type DrinksCardPropsType = {
  extra: Option;
  addDrink: (drink: Option) => void;
  removeDrink: (drink: Option) => void;
  addQuantity: (drink: DrinksType) => void;
  theme: ThemeType;
};

const DrinksCard = ({
  extra,
  addDrink,
  removeDrink,
  addQuantity,
  theme,
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
          style={{ backgroundColor: theme.activeTextColor, fontSize: 30 }}
          className="drinksBtnButton"
          onClick={() => {
            setIsSelected(!isSelected);
            addDrink(extra);
          }}
        >
          {isSelected ? <span>&#10003;</span> : <span>&#43;</span>}
        </button>
      )}

      {isSelected && (
        <div
          className="drinksCardQuantityWrapper"
          style={{ backgroundColor: theme.activeTextColor }}
        >
          <button
          style={{fontSize: 30}}
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
            &#8722;
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
