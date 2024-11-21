import styles from "./AlergenItemStyles.module.css"

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
  
  const dynamicStyles = {
    backgroundColor: bgColor,
    color: textColor
  };

  return (
    <span className={`${styles.alergenItem} fontSF`} style={dynamicStyles}>
      <div>{children}</div>
      <span style={{ marginLeft: "2.3%", whiteSpace: 'nowrap' }}>{text}</span>
    </span>
  );
};

export default AlergenItem;
