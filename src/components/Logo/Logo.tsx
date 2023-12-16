import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { FaReact } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from './Logo.module.css';

export const Logo = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={styles.logoWrapper}>
            <FaReact className={getMode ? styles.logo__dark : styles.logo__light} />
            <NavLink className={getMode ? styles.link__dark : styles.link__light} to='/' end>
                rShop
            </NavLink>
        </div>
    );
};
