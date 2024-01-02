import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { Product, selectProducts } from '../../redux/productsSlice';
import { ProductTile } from '../../components';
import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
    const getProducts: Product[] = useAppSelector(selectProducts);
    const getWishList = getProducts.filter((product) => product.isFavorite);
    const getMode: boolean = useAppSelector(selectMode);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={getMode ? styles.favoriteTitleDark : styles.favoriteTitleLight}>Wish List</h1>
            {!getWishList.length ? (
                <h2 className={getMode ? styles.titleEmptyListDark : styles.titleEmptyListLight}>The list of favorite products is empty</h2>
            ) : (
                <></>
            )}
            <div className={styles.favoriteList}>
                {getWishList.length !== 0 ? getWishList.map((product, i) => <ProductTile key={i} product={product} />) : ''}
            </div>
        </div>
    );
};
