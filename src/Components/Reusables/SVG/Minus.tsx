import { motion } from "framer-motion";

type MinusPropsType = {
  color: string;
};

const Minus = ({ color }: MinusPropsType) => {
  return (
    <motion.svg
    key={'MinusKey'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      width="16"
      height="6"
      viewBox="0 0 24 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5575 3.66341H1.96566C1.53265 3.66341 1.11738 3.48782 0.811201 3.17526C0.505019 2.86269 0.333008 2.43877 0.333008 1.99674C0.333008 1.55472 0.505019 1.13079 0.811201 0.818234C1.11738 0.505673 1.53265 0.330078 1.96566 0.330078H21.5575C21.9905 0.330078 22.4058 0.505673 22.712 0.818234C23.0181 1.13079 23.1902 1.55472 23.1902 1.99674C23.1902 2.43877 23.0181 2.86269 22.712 3.17526C22.4058 3.48782 21.9905 3.66341 21.5575 3.66341Z"
        fill={color}
      />
    </motion.svg>
  );
};

export default Minus;
