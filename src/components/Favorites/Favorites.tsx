// import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import Badge from '@mui/material/Badge';
import styles from './Favorites.module.css';

export const Favorites = () => {
    const getMode = useAppSelector(selectMode);
    return (
        <button>
            <Badge badgeContent={7} color='primary'>
                <FaHeart className={getMode ? styles.favorites__dark : styles.favorites__light} />
            </Badge>
        </button>
    );
};
