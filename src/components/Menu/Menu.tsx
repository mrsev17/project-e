import { NavLink } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import { ModeToggle } from '../ModeToggle';
import styles from './Menu.module.css';

export const Menu = () => {
    return (
        <div className={styles.menu}>
            <nav className={styles.navigation}>
                <div className={styles.navigation__left}>
                    <FaReact />
                    <NavLink className={styles.link} to='.' end>
                        ReactShop
                    </NavLink>
                </div>
                <div className={styles.navigation__right}>
                    <NavLink className={styles.link} to='about'>
                        About Page
                    </NavLink>
                    <NavLink className={styles.link} to='contacts'>
                        Contacts Page
                    </NavLink>
                    <NavLink className={styles.link} to='counter'>
                        Counter Page
                    </NavLink>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
};
