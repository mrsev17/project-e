import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { Product, selectProducts } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import { useEffect } from 'react';
import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
    const getProducts: Product[] = useAppSelector(selectProducts);
    const getMode: boolean = useAppSelector(selectMode);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={getMode ? styles.favoriteTitleDark : styles.favoriteTitleLight}>Wish List</h1>
            <div className={styles.favoriteList}>
                {getProducts
                    .filter((product) => product.isFavorite)
                    .map((product, i) => (
                        <ProductTile key={i} product={product} />
                    ))}
            </div>
        </div>
    );
};
