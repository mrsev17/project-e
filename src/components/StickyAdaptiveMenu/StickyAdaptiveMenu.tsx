import { NavLink } from 'react-router-dom';
import { Favorites, Basket, ModeToggle } from '../../components';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { GrSearch } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import styles from './StickyAdaptiveMenu.module.css';

export const StickyAdaptiveMenu = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={getMode ? styles.adaptiveMenu : styles.adaptiveMenuLight}>
            <div>
                <NavLink className={getMode ? styles.adaptiveMenuUser : styles.adaptiveMenuUserLight} to='/'>
                    <BiCategory />
                </NavLink>
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
