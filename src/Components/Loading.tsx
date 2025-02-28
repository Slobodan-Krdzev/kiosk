import { AnimatePresence, motion } from "framer-motion";

const Loading = () => {
  return (
    <AnimatePresence mode="wait">
      <section
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          exit={{ opacity: 0, transition: { duration: 1.3 } }}
        >
          <motion.h1
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            exit={{ opacity: 0, transition: { duration: 1.3 } }}
            className="fontSF"
            style={{ textAlign: "center", color: "black", width: "40%" }}
          >
            guestit.nl
          </motion.h1>
          <img
            src="/tabletmenukaart_logo.png"
            alt="telekartMenuLogo"
            style={{ width: "100%" }}
          />
        </motion.div>
      </section>
    </AnimatePresence>
  );
};

export default Loading;
