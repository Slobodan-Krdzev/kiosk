import X from "../SVG/X";
import styles from "./XButtonStyles.module.css";

interface XButtonProps {
  clickHandler: () => void;
  color?: string;
  borderColor?: string;
  bgColor?: string;
}

const XButton = ({
  clickHandler,
  color = "#878787",
  borderColor = "#D6D6D6",
  bgColor = "#FFFFFF",
}: XButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={styles.xButton}
      style={{
        color,
        backgroundColor: bgColor,
        border: `0.6px solid ${borderColor}`,
        fontSize: "2vw",
        fontWeight: 700,
      }}
    >
      <X color={color}/>
    </button>
  );
};

export default XButton;
