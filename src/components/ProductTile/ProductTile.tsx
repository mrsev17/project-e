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
    // const checkWidth = window.innerWidth < 567;
    const getProductNameLength = product.productName.length;
    return (
        <div className={getMode ? styles.productTile : styles.productTileDark}>
            <div className={styles.productTileContainer}>
                <div className={styles.productTilePictureWrapper}>
                    <img className={styles.mainPicture} src={product.photos.photoOne} alt={product.productName} />
                </div>
                <div className={getMode ? styles.productNameDark : styles.productName}>
                    <Link to={`/products/${product.category}/${product.productName.replace(/\s/g, '')}/${product.id}`}>
                        {getProductNameLength > 20 ? `${product.productName.slice(0, 20)}...` : product.productName}
                    </Link>
                </div>
                <div className={getMode ? styles.productPriceDark : styles.productPrice}>
                    <span>{product.price}$</span>
                </div>

                <div className={styles.productActionLine}></div>
                <div className={getMode ? styles.actionsWrapper : styles.actionsWrapperLight}>
                    <BuyBtn product={product} />
                    <FavoriteBtn productName={product.productName} productIsFavorite={product.isFavorite} productId={product.id} />
                </div>
            </div>
        </div>
    );
};
