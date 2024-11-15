type BottomGreenRibbonPropsType = {
    bgColor?: string
    justify?: 'center' | 'space-between'
    children: React.ReactNode
}

const BottomGreenRibbon = ({children, bgColor= 'white', justify = 'center'}: BottomGreenRibbonPropsType) => {
  return (
    <div className="bottomRibbon" 
    // style={{
    //   width: '95%',
    //   margin: '0 auto',
    //   backgroundColor: bgColor,
    //   borderRadius: '70px',
    //   display: 'flex',
    //   justifyContent: justify,
    //   boxShadow: "0px 10px 20px 5px #0000000D"
    // }}
    >
        {children}
    </div>
  )
}

export default BottomGreenRibbon