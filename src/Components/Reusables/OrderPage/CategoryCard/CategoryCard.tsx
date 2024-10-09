import { SubCategory2, ThemeType } from "../../../../Types/Types";
import styles from "./CategoryCardStyles.module.css";

type CategoryCardPropsType = {
  category: SubCategory2;
  currentCategory: number;
  handleCategoryChange: (catID: number) => void;
  theme: ThemeType;
};

const CategoryCard = ({
  category: { Name, SubCategoryId },
  currentCategory,
  handleCategoryChange,
  theme,
}: CategoryCardPropsType) => {
  return (
    <div
      className={styles.categoryCard}
      style={{
        backgroundColor:
          currentCategory === SubCategoryId ? theme.activeTextColor : "#FFFFFF",
        color: theme.textColor,
      }}
      onClick={() => {
        handleCategoryChange(SubCategoryId);
      }}
    >
      <img
        src={"/category.png"}
        alt={Name.toLowerCase()}
        style={{ width: "42.5px" }}
      />

      <p
        className="fontRaleway"
        style={{
          fontSize: 16,
          textTransform: "capitalize",
          fontWeight: 600,
          marginTop: "0.3rem",
          lineHeight: "20px",
          textAlign: "center",
        }}
      >
        {Name.length > 10 ? `${Name.substring(0, 8)}...` : Name}
      </p>
    </div>
  );
};

export default CategoryCard;
