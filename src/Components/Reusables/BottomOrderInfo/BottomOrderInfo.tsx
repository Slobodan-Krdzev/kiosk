import { useContext } from "react"
import styles from "./BottomOrderInfoStyles.module.css"
import { DataContext } from "../../../Contexts/DataContext/Datacontext"
import Chevron from "../SVG/Chevron"

interface BottomOrderInfoPropsType {
    total: number,
    numberOfProductsInCart: number,
    nextText: string,
    clickHandler: () => void,
    width: string | number
}

const BottomOrderInfo = ({clickHandler, width, total,  numberOfProductsInCart, nextText}: BottomOrderInfoPropsType) => {

    const {theme, data} = useContext(DataContext)

  return (
    <div className={styles.bottomOrderInfoWrapper} 
    style={{backgroundColor: '#232421', flexBasis: width}}
    onClick={clickHandler}>
        <div className={styles.ordersLengthWrapper}
        style={{backgroundColor: theme.textColor}}>
            <p>{numberOfProductsInCart}</p>
        </div>
        <div className={styles.orderTotal}> 
            <p style={{fontSize: '2.2vw'}}>Total</p>
            <p>{data.ThemeResponse.CurrencySettings.CurrencySymbol} {total}</p>
        </div>
        <p className={styles.nextText}>{nextText} <Chevron color="white"/></p>
    </div>
  )
}

export default BottomOrderInfo