import { Option } from "../../Types/Types";

type SidesCardPropsType = {
    selected: Option[] | undefined;
    extra: Option;
    handleSelect: (extra: Option) => void;
    handleRemove: (extra: Option) => void;
  };

const SidesCard = ({
    handleSelect,
    handleRemove,
    extra,
    selected
  }: SidesCardPropsType) => {

  const sideIsSelected = (selected && selected.find(side => extra.Id === side.Id)) 

  return (
    <div className="extraBtn">
      <img src={extra.PictureUrl} alt={extra.Name} />
      <p style={{ fontSize: "26px", fontWeight: 600, lineHeight: "39px" }}>
        {extra.Name}
      </p>
      <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "32px" }}>
        {extra.Price}
      </p>
      <button
        className="extraBtnButton"
        style={{
          backgroundColor: sideIsSelected ? "#CEDC00" : "inherit",
          borderColor: sideIsSelected ? "" : "#CEDC00",
        }}
        onClick={() => {

          if(sideIsSelected) {
            handleRemove(extra)
          }else {
            handleSelect(extra)
          }

        }}
      >
        <img src={sideIsSelected ? "/checkMark.png" : "/plus.png"} alt="Button" />
      </button>
    </div>
  )
}

export default SidesCard