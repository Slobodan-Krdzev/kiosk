import {MainCategory2 } from "../../../Types/Types";

type CategoryCardPropsType = {
  category: MainCategory2;
  currentCategory: number;
  handleCategoryChange: (catID: number) => void;
};

const CategoryCard = ({
  category: {Name, PictureUrl, MainCategoryId},
  currentCategory,
  handleCategoryChange,
}: CategoryCardPropsType) => {
  return (
    <button
      className="categoryBtn"
      style={{
        backgroundColor: currentCategory === MainCategoryId ? "#CEDC00" : "#FFFFFF",
      }}
      onClick={() => {
        handleCategoryChange(MainCategoryId)
      }}
    >
      <img src={PictureUrl} alt={Name.toLowerCase()} style={{ width: "42.5px" }} />
      <p
        style={{
          fontSize: "16px",
          textTransform: "capitalize",
          fontWeight: 600,
          marginTop: "1rem",
          lineHeight: "20px",
        }}
      >
        {Name}
      </p>
    </button>
  );
};

export default CategoryCard;
