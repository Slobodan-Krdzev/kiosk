import { motion } from "framer-motion";

interface ViewFullScreenAnimatedPropsType {
  children: React.ReactNode | JSX.Element;
  framerKey: string;
  backgroundColor?: string;
  style?: object;
}

const ViewFullScreenAnimated = ({
  children,
  framerKey,
  backgroundColor = "#fafafa",
  style,
}: ViewFullScreenAnimatedPropsType) => {
  return (
    <motion.section
      key={framerKey}
      style={{
        height: "100vh",
        backgroundColor,
        backgroundSize: "cover",

        ...style,
      }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
        delay: 0.15,
      }}
    >
      {children}
    </motion.section>
  );
};

export default ViewFullScreenAnimated;
