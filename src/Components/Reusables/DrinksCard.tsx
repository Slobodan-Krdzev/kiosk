import { useState } from "react";

type DrinksCardPropsType = {
  text: string;
  image: string;
  price: number;
  extra: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  addDrink: (drink: {
    id: number;
    name: string;
    price: number;
    quntity: number;
    totalPrice: number;
  }) => void;
  removeDrink: (id: number) => void;
  addQuantity: (drink: {
    id: number;
    name: string;
    price: number;
    quntity: number;
    totalPrice: number;
  }) => void;
};

const DrinksCard = ({
  text,
  image,
  price,
  extra,
  addDrink,
  removeDrink,
  addQuantity,
}: DrinksCardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="extraBtn">
      <img src={image} alt={text} />
      <p style={{ fontSize: "26px", fontWeight: 600, lineHeight: "39px" }}>
        {text}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "32px" }}>
        {price}
      </p>

      {!isSelected && (
        <button
          className="drinksBtnButton"
          onClick={() => {
            setIsSelected(!isSelected);
            addDrink({
              id: extra.id,
              name: extra.name,
              price: extra.price,
              quntity: quantity,
              totalPrice: extra.price * quantity,
            });
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
                removeDrink(extra.id);
              } else if (quantity === 0) {
                removeDrink(extra.id);
              } else {
                setQuantity(quantity - 1);
                addQuantity({
                  id: extra.id,
                  name: extra.name,
                  price: extra.price,
                  quntity: quantity - 1,
                  totalPrice: (quantity - 1) * extra.price,
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
                id: extra.id,
                name: extra.name,
                price: extra.price,
                quntity: quantity + 1,
                totalPrice: (quantity + 1) * extra.price,
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
