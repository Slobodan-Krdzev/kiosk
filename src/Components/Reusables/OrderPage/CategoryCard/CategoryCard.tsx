import { motion } from "framer-motion";
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
    <motion.div
      animate={{
        scale: currentCategory === SubCategoryId ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      className={styles.categoryCard}
      style={{
        backgroundColor:
          currentCategory === SubCategoryId
            ? `${theme.activeTextColor}90`
            : "#FFFFFF",
        border:
          currentCategory === SubCategoryId
            ? `1px solid ${theme.activeTextColor}`
            : "",
      }}
      onClick={() => {
        handleCategoryChange(SubCategoryId);
      }}
    >
      <img
        src={"/category.png"}
        alt={Name.toLowerCase()}
        style={{ width: "32.5px", height: "22.5px" }}
      />


      <motion.p
        animate={{
          x: currentCategory === SubCategoryId ? ["20%", "-20%"] : 0,
        }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
        key={
          currentCategory === SubCategoryId
            ? "movingTextActive"
            : "movingTextInactive"
        }
        className={`fontSF`}
        style={{
          fontSize: 20,
          textTransform: "capitalize",
          fontWeight: 400,
          marginTop: "0.3rem",
          lineHeight: "25px",
          textAlign: "center",
        }}
      >
        {currentCategory === SubCategoryId
          ? Name
          : Name.length > 8
          ? `${Name.substring(0, 5)}...`
          : Name}
      </motion.p>
    </motion.div>
  );
};

export default CategoryCard;
