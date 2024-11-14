import { Option, ThemeType } from "../../Types/Types";

type SidesCardPropsType = {
    selected: Option[] | undefined;
    extra: Option;
    handleSelect: (extra: Option) => void;
    handleRemove: (extra: Option) => void;
    theme:ThemeType;
    maxSelection: number;
    currentSelectionCount: number
  };

const SidesCard = ({
    handleSelect,
    handleRemove,
    extra,
    selected,
    theme,
    maxSelection,
    currentSelectionCount
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
        disabled={currentSelectionCount >= maxSelection && !sideIsSelected}
        className="extraBtnButton"
        style={{
          backgroundColor: sideIsSelected ? theme.activeTextColor : "inherit",
          borderColor: sideIsSelected ? "" : theme.activeTextColor,
        }}
        onClick={() => {

          if(sideIsSelected) {
            handleRemove(extra)
          }else {
            handleSelect(extra)
          }

        }}
      >
        {currentSelectionCount >= maxSelection ? <span style={{fontSize:16}}>max</span>: sideIsSelected ?  <span>&#10003;</span> : <span>&#43;</span> }
      </button>
    </div>
  )
}

export default SidesCard