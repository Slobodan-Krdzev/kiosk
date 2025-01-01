import styles from "./SVGStyles.module.css";

type CheckMarkPropsType = {
  color: string
}

const CheckMark = ({color}: CheckMarkPropsType) => {
  return (
    <svg
  

      className={styles.checkmark}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L6 12L16 2"
        stroke={color}
        strokeWidth="2.22868"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckMark;
