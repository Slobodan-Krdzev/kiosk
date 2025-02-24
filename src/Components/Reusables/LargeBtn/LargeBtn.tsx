import React from 'react'
import styles from "./LargeBtnStyles.module.css"

interface LargeBtnProps {
    children: React.ReactNode | JSX.Element
    clickHandler: () => void,
    width: number | string,
    borderColor: string
}

const LargeBtn = ({children, clickHandler, width, borderColor = '#fffff'}: LargeBtnProps) => {
  return (
    <button 
        onClick={clickHandler}
        className={styles.largeBtn}
        style={{width, borderColor}}
        >
        {children}
    </button>
  )
}

export default LargeBtn