import { MealType, ThemeType } from "../../../Types/Types";

type SpecialPromoPropsType = {
  item: MealType;
  theme:ThemeType
};

const SpecialPromo = ({ item, theme }: SpecialPromoPropsType) => {
  return (
    <div className="specialOfferDiv">
      <div style={{ padding: "2rem" }}>
        <p
          style={{
            fontSize: "2.3rem",
            marginBottom: "0.5rem",
            fontWeight: 400,
          }}
        >
          Monthly Special
        </p>
        <p style={{ fontSize: "1.4rem" }}>{item.name}</p>
      </div>
      <img
        src={`/${item.img}`}
        alt={item.name}
        style={{ width: "264px", height: "201px" }}
      />

      <p style={{ position: "absolute", bottom: "15%", paddingLeft: "2rem" }}>
        Now: {item.price}
      </p>
      <button style={{fontSize: 33, backgroundColor: theme.activeTextColor, color: theme.textColor}}>
        {/* <img src="/plus.png" alt="Add" /> */}
        &#43;
      </button>
    </div>
  );
};

export default SpecialPromo;
