import { NavLink } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import { ModeToggle } from '../ModeToggle';
import styles from './Menu.module.css';
import { Basket } from '../Basket';
import { Favorites } from '../Favorites';
import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';

export const Menu = () => {
    const getMode = useAppSelector(selectMode);
    return (
        <header className={getMode ? styles.menu : styles.menuLight}>
            <nav className={styles.navigation}>
                <div className={styles.navigation__left}>
                    <FaReact className={getMode ? styles.logo__dark : styles.logo__light} />
                    <NavLink className={getMode ? styles.link__dark : styles.link__light} to='/' end>
                        rShop
                    </NavLink>
                </div>
                <div className={styles.navigation__right}>
                    <NavLink className={getMode ? styles.link__dark : styles.link__light} to='products'>
                        Products
                    </NavLink>
                    <ModeToggle />
                    <NavLink className={styles.link} to='favorites'>
                        <Favorites />
                    </NavLink>
                    <NavLink className={styles.link} to='basket'>
                        <Basket />
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};
