import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import { Product, selectProducts } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';

import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
    const getProducts: Product[] = useAppSelector(selectProducts);
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div>
            <h1 className={getMode ? styles.favoriteTitleDark : styles.favoriteTitleLight}>Favorites Page</h1>
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
