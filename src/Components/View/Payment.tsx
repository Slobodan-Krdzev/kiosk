import { useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext/OrderContext";
import OrderInfoCard from "../Reusables/OrderInfoCard";
import { StepContext } from "../../Contexts/StepContext/StepContext";

const Payment = () => {
  const { orders, getOrderTotal } = useContext(OrderContext);
  const {handleStepChange, setFinalOrderDetails} = useContext(StepContext)

  return (
    <section className="fullScreen">
      <p
        style={{
          fontSize: "48px",
          fontWeight: 700,
          lineHeight: "56.35px",
          letterSpacing: "0.01em",
          textAlign: "center",
          padding: "3rem",
        }}
      >
        PAYMENT
      </p>

      <div className="paymentInfoWrapper">
        <div className="paymentOrdersWrapper">
          {orders.map((order) => (
            <OrderInfoCard key={order.id} order={order} />
          ))}
        </div>

        <div className="totalWrapper">
          <p
            style={{
              padding: "0.5rem 0",
              fontSize: "26px",
              fontWeight: 600,
              lineHeight: "28.18px",
            }}
          >
            Total:
          </p>
          <p style={{
              padding: "0.5rem 0",
              fontSize: "28px",
              fontWeight: 600,
              lineHeight: "28.18px",
            }}>
            {getOrderTotal()} $
          </p>
        </div>
      </div>

      <div style={{display: 'flex' , flexDirection: 'column', justifyContent: 'center'}}>
        <p style={{
          fontSize: "42px",
          fontWeight: 700,
          lineHeight: "49.31px",
          letterSpacing: "0.01em",
          textAlign: 'center',
          padding: '3rem 0'  
        }}>Please scan your QR code</p>

        
        <button className="qrCode" 
        onClick={() => {
          handleStepChange('finnish')

          setFinalOrderDetails(orders)

          console.log({
            orderNO: +new Date().valueOf().toFixed(2),
            orders,
            total: getOrderTotal()
          })
        }}>
            QR
        </button>

      </div>

      <div className="elipse">

      </div>
    </section>
  );
};

export default Payment;
