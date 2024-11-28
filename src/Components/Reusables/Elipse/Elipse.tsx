
type ElipsePropsType = {
    color: string
}

const Elipse = ({color}: ElipsePropsType) => {
  return (
    <svg
      className="elipse"
      style={{width: '100%', height: '20vh'}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="400" cy="572" rx="866" ry="572" fill={color} />
    </svg>
  );
};

export default Elipse;
