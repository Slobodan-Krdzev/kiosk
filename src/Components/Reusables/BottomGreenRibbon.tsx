import { motion } from "framer-motion";

type BottomGreenRibbonPropsType = {
  bgColor?: string;
  animate?: boolean;
  children: React.ReactNode;
};

const BottomGreenRibbon = ({
  children,
  animate = false
}: BottomGreenRibbonPropsType) => {
  if (animate) {
    return (
      <motion.div
        initial={{ y: "10vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "10vh", opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bottomRibbon"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="bottomRibbon">
      {children}
    </div>
  );
};

export default BottomGreenRibbon;
