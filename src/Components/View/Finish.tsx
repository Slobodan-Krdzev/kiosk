import { useContext } from 'react';
import { StepContext } from '../../Contexts/StepContext/StepContext';

const Finish = () => {

  const {finalInfo} = useContext(StepContext)

  console.log('====================================');
  console.log('FINNISHED ORDER', "Order Number: ", finalInfo.orderNum, "Order: ", finalInfo.orderDet);
  console.log('====================================');
    

  return (
    <section className="fullScreen">

      <div style={{height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src="/check.png" alt="Check Mark" />

      </div>

      <p style={{textAlign: 'center', fontSize: '60px', fontWeight: '700', marginBottom: '1rem'}}>Order Succesfull!</p>
      <p style={{textAlign: 'center', fontSize: '32px', fontWeight: '500'}}>You can pick up your order at the counter.</p>

      <div className='orderNoWrapper'>
        <p className='orderNoTitle'>Your Order Number</p>
        <p className='orderNO'>{finalInfo.orderNum}</p>
      </div>

      <div className='elipse'>

      </div>
    </section>
  )
}

export default Finish