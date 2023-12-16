import { NavLink } from 'react-router-dom';
import { Favorites, Basket, ModeToggle } from '../../components';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { GrSearch } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import styles from './StickyAdaptiveMenu.module.css';

export const StickyAdaptiveMenu = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={getMode ? styles.adaptiveMenu : styles.adaptiveMenuLight}>
            <div className={getMode ? styles.adaptiveMenuUser : styles.adaptiveMenuUserLight}>
                <FaUser />
            </div>
            <div className='sticky-menu-item'>
                <NavLink to='favorites'>
                    <Favorites />
                </NavLink>
            </div>
            <div className={getMode ? styles.adaptiveMenuSearch : styles.adaptiveMenuSearchLight}>
                <NavLink to='products'>
                    <GrSearch />
                </NavLink>
            </div>
            <div className='sticky-menu-item'>
                <NavLink to='basket'>
                    <Basket />
                </NavLink>
            </div>
            <div className='sticky-menu-item'>
                <ModeToggle />
            </div>
        </div>
    );
};
