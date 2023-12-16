import { FaHeart } from 'react-icons/fa';
import { useAppSelector } from '../../hooks/hook';
import { selectProducts, Product } from '../../redux/productsSlice';
import Badge from '@mui/material/Badge';
import styles from './Favorites.module.css';
import { selectMode } from '../../redux/modeSlice';

export const Favorites = () => {
    const getProducts: Product[] = useAppSelector(selectProducts).filter((product) => product.isFavorite);
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <button>
            <Badge badgeContent={getProducts.length} color='primary'>
                <FaHeart className={getMode ? styles.favorites__dark : styles.favorites__light} />
            </Badge>
        </button>
    );
};
