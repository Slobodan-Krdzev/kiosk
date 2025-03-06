import { motion } from "framer-motion";
import styles from "./PricePreviewerStyles.module.css";

interface PricePreviewerProps {
  price: number;
  color: string;
  style?: object;
  fontSizeRound?: number | string;
  fontSizeDecimal?: number | string;

}

const PricePreviewer = ({ price, color, style, fontSizeDecimal = '2.5vw', fontSizeRound = '4.6vw' }: PricePreviewerProps) => {
  const [priceRound, priceDecimal] = [
    price.toString().split(".")[0],
    price.toString().split(".")[1],
  ];

  const formatedDecimal = () => {

    let formated = priceDecimal

    
    if(priceDecimal && priceDecimal.length <= 1){

      formated = `${priceDecimal}0`
      formated = formated.slice(0,2)
    }else if(!priceDecimal){

      formated = `00`
    }


    return formated
  }
  
  return (
    <motion.div
    
    className={styles.pricePreviewerWrapper} style={{color, ...style}}>
      <span style={{fontSize: fontSizeRound}} className={styles.round}>{priceRound}.</span>
      <span style={{fontSize: fontSizeDecimal}} className={styles.decimal}>
        {formatedDecimal()}
      </span>
    </motion.div>
  );
};

export default PricePreviewer;
