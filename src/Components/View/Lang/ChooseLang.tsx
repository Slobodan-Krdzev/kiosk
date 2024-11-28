import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import { OrderContext } from "../../../Contexts/OrderContext/OrderContext";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import BottomGreenRibbon from "../../Reusables/BottomGreenRibbon";
import Logo from "../../Reusables/Logo";
import styles from "./ChooseLangStyles.module.css";

const ChooseLang = () => {
  const { handleStepChange, handleSetTakeway } = useContext(StepContext);
  const { setTakeaway } = useContext(OrderContext);
  const { data, theme } = useContext(DataContext);
  const [option, setOption] = useState<"Take Away" | "Dine In" | undefined>(
    undefined
  );

  return (
    <motion.section
      key={"lang"}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fullScreenTablet"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className={styles.logoWrapper}>
        <Logo source={data.ThemeResponse.LogoImage.Url} width={80} />
      </div>
      <div style={{ width: "95%", margin: "0.6rem auto" }}>
        <p className={`${styles.restName} fontSF`}>
          Welkome to <br /> {data.ThemeResponse.RestaurantName}!
        </p>
      </div>

      <div className={styles.langViewMenuOptionsWrapper}>
        <motion.button
          animate={{
            scale: option == "Take Away" ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className={`fontSF ${styles.langMenuBtn}`}
          disabled={option === "Dine In"}
          style={{
            backgroundColor:
              option === "Take Away"
                ? `${theme.activeTextColor}40`
                : option === "Dine In"
                ? "#F1F1F1"
                : "",
            border:
              option === "Take Away"
                ? `1px solid ${theme.activeTextColor}`
                : "",
          }}
          onClick={() => {
            handleSetTakeway()
            if (option === "Take Away") {
              handleStepChange("order");
            } else {
              setOption("Take Away");
            }
          }}
        >
          <svg
            width="117"
            height="117"
            viewBox="0 0 174 177"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.4735 150.975C36.1235 161.527 52.2125 161.527 84.405 161.527H89.595C121.787 161.527 137.884 161.527 146.534 150.975M27.4735 150.975C18.8235 140.416 21.7934 124.394 27.7258 92.3356C31.9427 69.5517 34.0475 58.1524 42.056 51.4194M146.534 150.975C155.184 140.416 152.214 124.394 146.281 92.3356C142.064 69.5517 139.952 58.1524 131.944 51.4194M131.944 51.4194C123.943 44.6864 112.489 44.6864 89.6022 44.6864H84.3978C61.5113 44.6864 50.0645 44.6864 42.056 51.4194"
              fill={theme.activeTextColor}
            />
            <path
              d="M27.4735 150.975C36.1235 161.527 52.2125 161.527 84.405 161.527H89.595C121.787 161.527 137.884 161.527 146.534 150.975C155.184 140.416 152.214 124.394 146.281 92.3356C142.064 69.5517 139.952 58.1524 131.944 51.4194C123.943 44.6864 112.489 44.6864 89.6022 44.6864H84.3977C61.5113 44.6864 50.0645 44.6864 42.056 51.4194C34.0475 58.1524 31.9427 69.5517 27.7258 92.3356C21.7934 124.394 18.8235 140.416 27.4735 150.975Z"
              stroke={theme.activeTextColor}
              strokeWidth="18.0383"
            />
            <path
              d="M65.375 44.6868V37.3843C65.375 31.574 67.6533 26.0017 71.7088 21.8932C75.7643 17.7847 81.2647 15.4766 87 15.4766C92.7353 15.4766 98.2357 17.7847 102.291 21.8932C106.347 26.0017 108.625 31.574 108.625 37.3843V44.6868"
              fill={theme.activeTextColor}
            />
            <path
              d="M65.375 44.6868V37.3843C65.375 31.574 67.6533 26.0017 71.7088 21.8932C75.7643 17.7847 81.2647 15.4766 87 15.4766C92.7353 15.4766 98.2357 17.7847 102.291 21.8932C106.347 26.0017 108.625 31.574 108.625 37.3843V44.6868"
              stroke={theme.activeTextColor}
              strokeWidth="18.0383"
              strokeLinecap="round"
            />
            <path
              d="M59.5829 57.2039C59.5829 57.2039 56.1074 81.85 56.1074 85.3709C56.1074 88.8918 63.9272 95.9335 63.9272 95.9335L63.0583 142.916C63.0583 146.803 66.1723 148.747 70.0092 148.747C73.8461 148.747 76.9601 146.803 76.9601 142.916L76.0912 95.9335C76.0912 95.9335 83.911 88.7439 83.911 85.3709C83.911 81.9979 80.4355 57.2039 80.4355 57.2039H76.9601V80.0896C76.9601 80.5565 76.777 81.0042 76.4511 81.3344C76.1252 81.6645 75.6832 81.85 75.2224 81.85C74.7615 81.85 74.3195 81.6645 73.9936 81.3344C73.6677 81.0042 73.4847 80.5565 73.4847 80.0896C73.4847 79.7621 72.2891 57.2039 72.2891 57.2039H67.7293C67.7293 57.2039 66.5338 79.7621 66.5338 80.0896C66.5338 80.5565 66.3507 81.0042 66.0248 81.3344C65.6989 81.6645 65.2569 81.85 64.796 81.85C64.3352 81.85 63.8932 81.6645 63.5673 81.3344C63.2414 81.0042 63.0583 80.5565 63.0583 80.0896V57.2039H59.5829ZM96.8362 57.4257C94.7891 57.9221 94.3373 60.1438 94.3373 62.5908V142.913C94.3373 146.8 97.4513 148.743 101.288 148.743C105.125 148.743 108.131 146.796 108.131 142.913C108.131 125.002 104.656 115.453 104.656 106.493C104.656 102.451 111.715 97.2468 111.715 78.4348C111.715 66.9285 101.65 57.4222 97.8128 57.4222C97.4513 57.4222 97.1281 57.3553 96.8362 57.4257Z"
              fill={theme.activeTextColor}
            />
          </svg>

          <p className={`fontSF ${styles.menuOptionsText}`}>Take Away</p>
        </motion.button>

        {/* DINE IN OPCIJA   */}
        <motion.button
          animate={{
            scale: option == "Dine In" ? 1.1 : 1,
          }}
          transition={{
            type: "tween",
            stiffness: 200,
            damping: 10,
          }}
          className={`fontSF ${styles.langMenuBtn}`}
          disabled={option === "Take Away"}
          style={{
            backgroundColor:
              option === "Dine In"
                ? `${theme.activeTextColor}40`
                : option === "Take Away"
                ? "#F1F1F1"
                : "",
            border:
              option === "Dine In" ? `1px solid ${theme.activeTextColor}` : "",
          }}
          onClick={() => {
            setOption("Dine In");
            setTakeaway();
          }}
        >
          <svg
            width="117"
            height="117"
            viewBox="0 0 100 157"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.84879 0.8139C6.84879 0.8139 0.932129 42.5971 0.932129 48.5661C0.932129 54.5351 14.2446 66.4731 14.2446 66.4731L12.7655 146.124C12.7655 152.714 18.0668 156.008 24.5988 156.008C31.1308 156.008 36.4321 152.714 36.4321 146.124L34.9529 66.4731C34.9529 66.4731 48.2654 54.2844 48.2654 48.5661C48.2654 42.8478 42.3488 0.8139 42.3488 0.8139H36.4321V39.6125C36.4321 40.4041 36.1204 41.1632 35.5656 41.7229C35.0108 42.2826 34.2584 42.5971 33.4738 42.5971C32.6892 42.5971 31.9367 42.2826 31.3819 41.7229C30.8271 41.1632 30.5154 40.4041 30.5154 39.6125C30.5154 39.0574 28.4801 0.8139 28.4801 0.8139H20.7174C20.7174 0.8139 18.6821 39.0574 18.6821 39.6125C18.6821 40.4041 18.3704 41.1632 17.8156 41.7229C17.2608 42.2826 16.5084 42.5971 15.7238 42.5971C14.9392 42.5971 14.1867 42.2826 13.6319 41.7229C13.0771 41.1632 12.7655 40.4041 12.7655 39.6125V0.8139H6.84879ZM70.2695 1.18995C66.7846 2.03158 66.0154 5.79803 66.0154 9.9465V146.118C66.0154 152.708 71.3167 156.003 77.8487 156.003C84.3807 156.003 89.4986 152.702 89.4986 146.118C89.4986 115.753 83.582 99.5654 83.582 84.3742C83.582 77.5218 95.5987 68.6996 95.5987 36.8071C95.5987 17.3003 78.4641 1.18398 71.9321 1.18398C71.3167 1.18398 70.7665 1.0646 70.2695 1.18398V1.18995Z"
              fill={theme.activeTextColor}
            />
          </svg>

          <p className={`fontSF ${styles.menuOptionsText}`}>Dine In</p>
        </motion.button>
      </div>

      <div className={styles.langSelectWrapper}>
        
        <img src="/netherlands.png" alt="Dutch" width={43.6} height={43.6}/>
        <img src="/English.png" alt="Dutch" width={43.6} height={43.6} style={{margin: '0 10px'}}/>
        <img src="/German.png" alt="Dutch" width={43.6} height={43.6}/>

      </div>

      <BottomGreenRibbon>
        <button
          disabled={option === undefined}
          className="fontSF"
          style={{
            lineHeight: "34px",
            fontSize: 20,
            fontWeight: 400,
            textTransform: "capitalize",
            backgroundColor:
              option === undefined
                ? `${theme.activeTextColor}40`
                : theme.activeTextColor,
            color: option === undefined ? `#20202085` : "#202020",
            minWidth: "100%",
            minHeight: "80%",
            cursor: "pointer",
            padding: "4%",
            outline: "none",
            border: "none",
            borderRadius: "70px",
          }}
          onClick={() => {
            handleStepChange("order");
          }}
        >
          Place Order
        </button>
      </BottomGreenRibbon>
    </motion.section>
  );
};

export default ChooseLang;
