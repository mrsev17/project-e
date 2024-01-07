import { useAppSelector } from '../../hooks/hook';
import { ModeToggle, Basket, Favorites, Logo } from '../../components';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';

export const Menu: React.FC = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
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
