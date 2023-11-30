import { toast } from 'react-toastify';
import { Product, setIsFavoriteProduct } from '../../redux/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './ProductTile.module.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface ProductTileProps {
    product: Product;
}

export const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
    const notify = () => toast(`${product.productName} ${product.isFavorite ? 'removed from' : 'added to'} favorite list`);
    const dispatch = useAppDispatch();
    const getMode: boolean = useAppSelector(selectMode);
    const favoriteHandle = (id: string) => {
        dispatch(setIsFavoriteProduct(id));
        notify();
    };
    return (
        <div className={getMode ? styles.productTile : styles.productTileDark}>
            <div className={styles.productTileContainer}>
                <div className={styles.productTilePictureWrapper}>
                    <img className={styles.mainPicture} src={product.photos.photoOne} alt={product.productName} />
                </div>
                <div className={getMode ? styles.productName : styles.productNameDark}>
                    <span>{product.productName}</span>
                </div>
                <div className={getMode ? styles.productPrice : styles.productPriceDark}>
                    <span>{product.price}$</span>
                </div>
                <div className={styles.productActionLine}></div>
                <div className={styles.actionsWrapper}>
                    <div className={getMode ? styles.buyButtonDark : styles.buyButtonLight}>
                        {product.inStock ? (
                            <button className={getMode ? styles.buyDark : styles.buyLight}>Buy</button>
                        ) : (
                            <button className={styles.outOfStock} disabled>
                                Out of order
                            </button>
                        )}
                    </div>
                    <span onClick={() => favoriteHandle(product.id)}>
                        <div className={getMode ? styles.favoriteDark : styles.favoriteLight}>{product.isFavorite ? <GoHeartFill /> : <GoHeart />}</div>
                    </span>
                </div>
            </div>
        </div>
    );
};
