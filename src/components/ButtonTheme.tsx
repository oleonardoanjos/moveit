import { useContext } from 'react'
import { HiMoon } from 'react-icons/hi'
import { CgSun } from 'react-icons/cg'

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ButtonTheme.module.css';

export function ButtonTheme() {
    const { themeName, handleChangeTheme } = useContext(ChallengesContext);
    const icon = themeName === "light" ? <HiMoon size={30} /> : <CgSun size={30} />;
    
    return (
        <span
            className={styles.buttonTheme}
            onClick={handleChangeTheme}>
            {icon}
        </span>
    )
}
