type BigerHeadingPropsType = {
  text: string;
  fontSize?: number;
  width?: number
};

const BigerHeading = ({ text, fontSize = 58, width = 100 }: BigerHeadingPropsType) => {
  return (
    <p
    className="fontRaleway"
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: 600,
        textAlign: "center",
        width: `${width}%`,
        // margin: '0 auto'
      }}
    >
      {text}
    </p>
  );
};

export default BigerHeading;
