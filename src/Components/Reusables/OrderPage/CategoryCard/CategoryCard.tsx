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
        style={{ width: "24.4px", height: "24.4px" }}
      />


      {/* <motion.p
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
      </motion.p> */}
      <p className={`fontSF`}
        style={{
          fontSize: 'calc(20px / 1.33)',
          textTransform: "capitalize",
          fontWeight: 400,
          marginTop: "calc(0.3rem / 1.33)",
          lineHeight: "calc(25px / 1.33)",
          textAlign: "center",
        }}>{Name.length > 15 ? `${Name.substring(0, 5)}...` : Name}</p>
    </motion.div>
  );
};

export default CategoryCard;
