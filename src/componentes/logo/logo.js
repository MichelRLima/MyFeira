
import React from "react";
import styles from './logo.module.css'
import { BsCart3 } from 'react-icons/bs'
function Logo() {
    return (
        <div className={styles.titulo}>
            <BsCart3 className={styles.icon} />
            <h1>MyFeira</h1>
        </div>
    );
}

export default Logo;