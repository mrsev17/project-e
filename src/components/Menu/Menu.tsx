import { NavLink } from 'react-router-dom';
import { ModeToggle } from '../ModeToggle';
import styles from './Menu.module.css';
import { Basket } from '../Basket';
import { Favorites } from '../Favorites';
import { Logo } from '../Logo';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';

export const Menu = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <header className={getMode ? styles.menu : styles.menuLight}>
            <nav className={styles.navigation}>
                <div className={styles.navigation__left}>
                    <Logo />
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
