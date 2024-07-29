import { useContext, useState } from "react";
import { SingleMealType } from "../../Types/Types";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";

type CheckoutCardPropsType = {
  order: SingleMealType
}

const CheckoutCard = ({order}:CheckoutCardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const {setSingleMealQuantity} = useContext(OrderContext)

  return (
    <div className="checkoutCard">
      <img src={`/${order.image}`} alt="Item" />
      <div>
        <p className="checkoutCardTitle">{order.meal?.name}</p>
        {order.extras.length > 0 && <p className="checkoutCardDetailsParagraph">Extras x {order.extras.length}</p>}
        {order.drinks.length > 0 && <p className="checkoutCardDetailsParagraph">Drinks x {order.drinks.length}</p>}
        {order.sides && <p className="checkoutCardDetailsParagraph">Sides {order.sides?.type} x 1</p>}
        
      </div>
      <p className="checkoutCardPrice">{order.totalPrice.toFixed(2)}</p>

      {!isSelected && (
        <button
          className="checkoutCardBtn"
          onClick={() => {
            setIsSelected(true);
          }}
        >
          <img src="/plus.png" alt="Add" />
        </button>
      )}

      {isSelected && (
        <div className="checkoutCardQuantityWrapper">
          <button
            onClick={() => {
              if (quantity === 1) {

                    setQuantity(1)
                    setIsSelected(false)

              } else {
                setQuantity((quantity) => quantity - 1);
                setSingleMealQuantity(order, "minus")
              }
            }}
          >
            <img src="/minus.png" alt="Add" className="minusIcon" />
          </button>
          <p className="quantityCounter">{quantity}</p>
          <button
            onClick={() => {
              setQuantity((quantity) => quantity + 1);
              setSingleMealQuantity(order, "plus")
            }}
          >
            <img src="/plus.png" alt="Add" className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutCard;
