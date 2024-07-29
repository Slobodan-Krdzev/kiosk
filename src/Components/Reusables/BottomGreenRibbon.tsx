

type BottomGreenRibbonPropsType = {

    children: React.ReactNode
}

const BottomGreenRibbon = ({children}: BottomGreenRibbonPropsType) => {
  return (
    <div className="greenRibbon">
        {children}
    </div>
  )
}

export default BottomGreenRibbon