import { SingleMealType } from "../../Types/Types";

type OrderInfoCardPropsType = {
  order: SingleMealType;
};

const OrderInfoCard = ({ order }: OrderInfoCardPropsType) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: '1rem'
      }}
    >
      <div style={{ flexBasis: "40%" }}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "23.48px",
            marginBottom: "0.3rem",
          }}
        >
          {order.meal?.name}{" "}
          {order.quantity > 1 ? `x ${order.quantity}` : "x 1"}
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "18.78px",
            color: "#AEAAAE",
          }}
        >
          Plus {order.sides?.type} {`(${order.sides?.price} $)`}
        </p>
      </div>

      <p
        style={{
          flexBasis: "20%",
          textAlign: "right",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "18.84px",
        }}
      >
        {order.totalPrice} $
      </p>
    </div>
  );
};

export default OrderInfoCard;
