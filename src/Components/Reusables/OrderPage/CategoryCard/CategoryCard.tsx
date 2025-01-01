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
      // animate={{
      //   scale: currentCategory === SubCategoryId ? 1.05 : 1,
      // }}
      // transition={{
      //   type: "spring",
      //   stiffness: 200,
      //   damping: 10,
      // }}
      className={styles.categoryCard}
      // style={{
      //   backgroundColor:
      //     currentCategory === SubCategoryId
      //       ? `${theme.activeTextColor}90`
      //       : "#FFFFFF",
      //   border:
      //     currentCategory === SubCategoryId
      //       ? `1px solid ${theme.activeTextColor}`
      //       : "",
      // }}
      onClick={() => {
        handleCategoryChange(SubCategoryId);
      }}
    >
      <img
        src={"/category.png"}
        alt={Name.toLowerCase()}
        className={styles.image}
      />

      <p className={`fontSF ${styles.categoryCardText}`} style={{color: theme.textColor}}>
        {Name.length > 15 ? `${Name.substring(0, 5)}...` : Name}
      </p>
    </motion.div>
  );
};

export default CategoryCard;
