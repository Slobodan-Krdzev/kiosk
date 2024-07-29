
type UpgradeBottomRibbonPropsType = {
    children: JSX.Element
}

const UpgradeBottomRibbon = ({children}: UpgradeBottomRibbonPropsType) => {
  return (
    <div className="upgradeBottomRibbon">
        {children}
    </div>
  )
}

export default UpgradeBottomRibbon