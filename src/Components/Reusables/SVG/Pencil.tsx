type PencilPropsType = {
    color: string
}

const Pencil = ({color = 'black'}: PencilPropsType) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M13 0L16 3L9 10H6V7L13 0Z" fill={color}></path>{" "}
        <path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill={color}></path>{" "}
      </g>
    </svg>
  );
};

export default Pencil;
