import styles from "./BottomButtonHolderRibbonStyles.module.css"

interface BottomButtonHolderRibbonProps {
    children: React.ReactNode | JSX.Element;
    style?: object
}

const BottomButtonholderRibbon = ({children, style}: BottomButtonHolderRibbonProps) => {
  return (
    <div className={styles.bottomRibon} style={style}>
        {children}
    </div>
  )
}

export default BottomButtonholderRibbon