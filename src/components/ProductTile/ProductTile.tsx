import { Product } from '../../redux/productsSlice';
import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './ProductTile.module.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface ProductTileProps {
    product: Product;
}

// export interface Product {
//     productName: string;
//     category: string;
//     company: string;
//     storage: string;
//     ram: string;
//     color: string;
//     id: string;
//     price: number;
//     inStock: boolean;
//     favorite: boolean;
//     photos: {
//         photoOne: string;
//         photoTwo: string;
//         photoThree: string;
//         photoFour: string;
//         photoFive: string;
//     };
// }

export const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
    const getMode = useAppSelector(selectMode);
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
                    <div className={getMode ? styles.buyButton : styles.buyButtonDark}>
                        {product.inStock ? (
                            <button className={getMode ? styles.buy : styles.buyDark}>Buy</button>
                        ) : (
                            <button className={styles.outOfStock} disabled>
                                Out of order
                            </button>
                        )}
                    </div>
                    <div className={getMode ? styles.favorite : styles.favoriteDark}>
                        <GoHeart />
                    </div>
                </div>
            </div>
        </div>
    );
};
