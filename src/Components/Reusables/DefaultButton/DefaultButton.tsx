import styles from "./DefaultButtonStyles.module.css";

interface DefaultButtonProps {
  children: React.ReactNode | JSX.Element;
  clickHandler: () => void;
  style?: object;
}

const DefaultButton = ({
  children,
  clickHandler,
  style,
}: DefaultButtonProps) => {
  return (
    <button className={styles.btn} onClick={clickHandler} style={style}>
      {children}
    </button>
  );
};

export default DefaultButton;
