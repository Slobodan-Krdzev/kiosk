import styles from "./DefaultButtonStyles.module.css";

interface DefaultButtonProps {
  children: React.ReactNode | JSX.Element;
  clickHandler: () => void;
  style?: object;
  dissabled?: boolean;
}

const DefaultButton = ({
  children,
  clickHandler,
  style,
  dissabled,
}: DefaultButtonProps) => {
  return (
    <button
      disabled={dissabled}
      className={styles.btn}
      onClick={clickHandler}
      style={style}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
