import styles from "./PricePreviewerStyles.module.css";

interface PricePreviewerProps {
  price: number;
  color: string;
  style?: object
}

const PricePreviewer = ({ price, color, style }: PricePreviewerProps) => {
  const [priceRound, priceDecimal] = [
    price.toString().split(".")[0],
    price.toString().split(".")[1],
  ];

  const formatedDecimal = () => {

    let formated = priceDecimal

    if(!priceDecimal){

      formated = '00'
    }else if(priceDecimal.length <= 1){

      formated = `${priceDecimal}0`
    }


    return formated
  }
  console.log(priceDecimal)

  return (
    <div className={styles.pricePreviewerWrapper} style={{color, ...style}}>
      <span className={styles.round}>{priceRound}.</span>
      <span className={styles.decimal}>
        {formatedDecimal()}
      </span>
    </div>
  );
};

export default PricePreviewer;
