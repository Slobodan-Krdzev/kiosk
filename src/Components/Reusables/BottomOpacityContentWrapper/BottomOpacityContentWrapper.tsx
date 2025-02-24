import React from "react";

interface BottomOpacityContentWrapperProps {
  children: React.ReactNode | JSX.Element;
  style: object;
}

const BottomOpacityContentWrapper = ({
  children,
  style,
}: BottomOpacityContentWrapperProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "end",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BottomOpacityContentWrapper;
