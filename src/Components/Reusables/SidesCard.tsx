import { SidesType } from "../../Types/Types";

type SidesCardPropsType = {
    extraType?: string;
    text: string;
    image: string;
    price: number;
    selected: SidesType | undefined;
    extra: {
      id: number;
      name: string;
      price: number;
      image: string;
    };
    handleSelect: (extra: {
      id: number;
      name: string;
      price: number;
      image: string;
    }) => void;
    handleRemove: (extra: {
      id: number;
      name: string;
      price: number;
      image: string;
    }) => void;
  };

const SidesCard = ({
    text,
    image,
    price,
    handleSelect,
    extra,
    selected
  }: SidesCardPropsType) => {

    const selectedType = selected?.type;

  return (
    <div className="extraBtn">
      <img src={image} alt={text} />
      <p style={{ fontSize: "26px", fontWeight: 600, lineHeight: "39px" }}>
        {text}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "32px" }}>
        {price}
      </p>
      <button
        className="extraBtnButton"
        style={{
          backgroundColor: selectedType === extra.name ? "#CEDC00" : "inherit",
          borderColor: selectedType === extra.name ? "" : "#CEDC00",
        }}
        onClick={() => {
            handleSelect(extra)
        }}
      >
        <img src={selectedType === extra.name ? "/checkMark.png" : "/plus.png"} alt="Button" />
      </button>
    </div>
  )
}

export default SidesCard