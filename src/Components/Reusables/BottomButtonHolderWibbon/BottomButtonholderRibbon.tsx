import styles from "./BottomButtonHolderRibbonStyles.module.css"

interface BottomButtonHolderRibbonProps {
    children: React.ReactNode | JSX.Element
}

const BottomButtonholderRibbon = ({children}: BottomButtonHolderRibbonProps) => {
  return (
    <div className={styles.bottomRibon}>
        {children}
    </div>
  )
}

export default BottomButtonholderRibbon