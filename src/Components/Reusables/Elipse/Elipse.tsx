
type ElipsePropsType = {
    color: string
}

const Elipse = ({color}: ElipsePropsType) => {
  return (
    <svg
      className="elipse"
      width="760"
      height="180"
      viewBox="0 0 1100 312"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="400" cy="572" rx="866" ry="572" fill={color} />
    </svg>
  );
};

export default Elipse;
