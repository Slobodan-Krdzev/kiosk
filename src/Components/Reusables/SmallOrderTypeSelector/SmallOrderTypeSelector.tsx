import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react";
import styles from "./SmallOrderTypeSelectorStyles.module.css";
import { StepContext } from "../../../Contexts/StepContext/StepContext";
import Chevron from "../SVG/Chevron";
import Takeaway from "../SVG/Takeaway";
import { DataContext } from "../../../Contexts/DataContext/Datacontext";
import DineIn from "../SVG/DineIn";
import { t } from "i18next";

const SmallOrderTypeSelector = () => {
  const { finalInfo, handleSetTakeawayOption } = useContext(StepContext);
  const { theme } = useContext(DataContext);


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = ['Takeaway', 'Dine In']
  const onOptionClick = (option: 'Dine In' | 'Takeaway') => {

    handleSetTakeawayOption(option)
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          fontSize: "1.2vw",
          fontWeight: 700,
          display: "flex",
        }}
      >

        {finalInfo.orderType === 'Takeaway' ? <Takeaway color={theme.activeTextColor} size="small"/> : <DineIn color={theme.activeTextColor} size="small"/>}
         
        
        <div className={styles.spanWrapper}>
          <span className={styles.orderType}>{t('order_type')}</span>
          <span className={styles.value}>{finalInfo.orderType}</span>
        </div>
        <div>
            <Chevron color="black" orientation={isOpen ? 'toTop': 'toBottom'}/>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={styles.dropdownMenu}
          >
            <ul className={styles.dropdownList}>
                {options.map((op )=> <li key={op} onClick={() => {
                    onOptionClick(op as "Dine In" | "Takeaway")
                }}>{op}</li>)}
             
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmallOrderTypeSelector;
