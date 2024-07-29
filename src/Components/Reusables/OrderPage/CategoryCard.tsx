type CategoryCardPropsType = {
  text: string;
  currentCategory: string;
  handleCategoryChange: (cat: string) => void;
};

const CategoryCard = ({
  text,
  currentCategory,
  handleCategoryChange,
}: CategoryCardPropsType) => {
  return (
    <button
      className="categoryBtn"
      style={{
        backgroundColor: currentCategory === text ? "#CEDC00" : "#FFFFFF",
      }}
      onClick={() => {
        handleCategoryChange(text)
      }}
    >
      <img src={`/category.png`} alt={text} style={{ width: "42.5px" }} />
      <p
        style={{
          fontSize: "22px",
          textTransform: "capitalize",
          fontWeight: 600,
          marginTop: "1rem",
          lineHeight: "28px",
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default CategoryCard;
