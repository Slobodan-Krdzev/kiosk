import { motion } from "framer-motion";

const Check = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="18"
      viewBox="0 0 24 18"
      fill="none"
    >
      <path
        d="M8.52913 17.4993L0.454132 9.42428L2.47288 7.40553L8.52913 13.4618L21.527 0.463867L23.5458 2.48262L8.52913 17.4993Z"
        fill="#458800"
      />
    </motion.svg>
  );
};

export default Check;
