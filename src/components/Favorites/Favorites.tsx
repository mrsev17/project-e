import { useAppSelector } from '../../hooks/hook';
import { Product } from '../../redux/productsSlice';
import { FaHeart } from 'react-icons/fa';
import Badge from '@mui/material/Badge';
import styles from './Favorites.module.css';

export const Favorites: React.FC = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const getProducts: Product[] = useAppSelector((state) => state.products.products).filter((product) => product.isFavorite);
    return (
        <button>
            <Badge badgeContent={getProducts.length} color='primary'>
                <FaHeart className={getMode ? styles.favorites__dark : styles.favorites__light} />
            </Badge>
        </button>
    );
};
