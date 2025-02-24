import React from "react";
import styles from "./TopFixedRibbonStyles.module.css";

interface TopFixedRibbonProps {
  children: React.ReactNode | JSX.Element;
  justifyContent?: "space-between" | "center" | "flex-end" | "flex-start";
}

const TopFixedRibbon = ({
  children,
  justifyContent = "space-between",
}: TopFixedRibbonProps) => {
  return (
    <div className={styles.topFixedRibbon} style={{ justifyContent }}>
      {children}
    </div>
  );
};

export default TopFixedRibbon;
