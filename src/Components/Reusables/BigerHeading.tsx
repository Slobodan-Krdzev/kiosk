type BigerHeadingPropsType = {
  text: string;
  fontSize?: number;
  width?: number
};

const BigerHeading = ({ text, fontSize = 58, width = 100 }: BigerHeadingPropsType) => {
  return (
    <p
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: 600,
        lineHeight: "68.09px",
        textAlign: "center",
        width: `${width}%`,
        margin: '0 auto'
      }}
    >
      {text}
    </p>
  );
};

export default BigerHeading;
