const Chevron = ({
  color,
  orientation = "toRight",
}: {
  color: string;
  orientation?: "toLeft" | "toRight" | "toTop" | 'toBottom';
}) => {

  const rotate = () => {

    let rotation = 0


    switch (orientation) {
      case 'toLeft':
          rotation = 180
        break;
        case 'toTop':
        rotation = -90
      break;
      case 'toBottom':
      rotation = 90
    break;
      default:
        rotation = 0
        break;
    }

    return rotation
  }

  return (
    <svg
      style={{
        transform:`rotate(${rotate()}deg)`
          
      }}
      width="17px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M9 6L15 12L9 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default Chevron;
