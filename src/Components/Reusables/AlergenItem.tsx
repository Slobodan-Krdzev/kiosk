
type AlergenItemPropsType = {
  children: JSX.Element;
  bgColor: string;
  textColor?: string;
  text: string;
};

const AlergenItem = ({
  children,
  bgColor,
  textColor = "white",
  text,
}: AlergenItemPropsType) => {

  const styles = {
    backgroundColor: bgColor,
    color: textColor,
    padding: "1.3%",
    fontSize: 16,
    marginRight: '2%',
    borderRadius: 2
  };

  return (
    <span className="fontSF" style={styles}>
      {children}
     <span style={{marginLeft: '1.3%'}}>{text}</span> 
    </span>
  );
};

export default AlergenItem;
