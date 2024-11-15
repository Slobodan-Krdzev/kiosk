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
    padding: "0.6% 1.6%",
    fontSize: "calc(16px / 1.33)",
    marginRight: "2%",
    borderRadius: 2,
    display: 'inline-flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '3px'
  };

  return (
    <span className="fontSF" style={styles}>
      <div>{children}</div>
      <span style={{ marginLeft: "2.3%", whiteSpace: 'nowrap' }}>{text}</span>
    </span>
  );
};

export default AlergenItem;
