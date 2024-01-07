import { Product } from '../../redux/productsSlice';
import { useAppSelector } from '../../hooks/hook';
import { Link } from 'react-router-dom';
import { FavoriteBtn } from '../FavoriteBtn';
import { BuyBtn } from '../BuyBtn';
import styles from './ProductTile.module.css';

interface ProductTileProps {
    product: Product;
}

export const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    return (
        <div className={getMode ? styles.productTile : styles.productTileDark}>
            <div className={styles.productTileContainer}>
                <div className={styles.productTilePictureWrapper}>
                    <img className={styles.mainPicture} src={product.photos.photoOne} alt={product.productName} />
                </div>
                <div className={getMode ? styles.productName : styles.productNameDark}>
                    <Link to={`/products/${product.category}/${product.productName.replace(/\s/g, '')}/${product.id}`}>{product.productName}</Link>
                </div>
                <div className={getMode ? styles.productPrice : styles.productPriceDark}>
                    <span>{product.price}$</span>
                </div>
                <div className={styles.productActionLine}></div>
                <div className={styles.actionsWrapper}>
                    <BuyBtn product={product} />
                    <FavoriteBtn productName={product.productName} productIsFavorite={product.isFavorite} productId={product.id} />
                </div>
            </div>
        </div>
    );
};
