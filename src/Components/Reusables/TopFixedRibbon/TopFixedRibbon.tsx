import React from "react";
import styles from "./TopFixedRibbonStyles.module.css";

interface TopFixedRibbonProps {
  children: React.ReactNode | JSX.Element;
  justifyContent?: "space-between" | "center" | "flex-end" | "flex-start";
  style?: object
}

const TopFixedRibbon = ({
  children,
  justifyContent = "space-between",
  style
}: TopFixedRibbonProps) => {
  return (
    <div className={styles.topFixedRibbon} style={{ justifyContent, ...style }}>
      {children}
    </div>
  );
};

export default TopFixedRibbon;
