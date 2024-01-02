import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { Link } from 'react-router-dom';
import { FavoriteBtn } from '../FavoriteBtn';
import { SlBasket } from 'react-icons/sl';
import { ImCheckmark } from 'react-icons/im';
import styles from './LastViewedTile.module.css';
import { Product } from '../../redux/productsSlice';
import { setProductInBasket } from '../../redux/orderSlice';
import { toast } from 'react-toastify';

interface LastViewedTileProps {
    product: Product;
}

export const LastViewedTile: React.FC<LastViewedTileProps> = ({ product }) => {
    const getMode: boolean = useAppSelector(selectMode);
    const notify = () => toast(`${product.productName} already in basket list`);
    const dispatch = useAppDispatch();
    const getBasket = useAppSelector((state) => state.checkout.orderList);
    console.log(getBasket);
    const checkBasketForProduct = () => {
        return getBasket.some((productInBasket) => productInBasket.id === product.id);
    };
    const productBasketHandle = (product: Product) => {
        console.log('test');
        if (!checkBasketForProduct()) {
            dispatch(setProductInBasket(product));
        } else {
            notify();
        }
    };

    return (
        <div className={getMode ? styles.lastViewedTileDark : styles.lastViewedTileLight}>
            <div className={styles.lastViewedTileContainer}>
                <div className={styles.lastViewedTileUpper}>
                    <div>
                        <FavoriteBtn productName={product.productName} productIsFavorite={product.isFavorite} productId={product.id} />
                    </div>
                </div>
                <div className={styles.lastViewedTileImage}>
                    <img src={product.photos.photoOne} alt={product.productName} />
                </div>
                <div className={getMode ? styles.lastViewedTileLinkDark : styles.lastViewedTileLinkLight}>
                    <Link onClick={() => window.scrollTo(0, 0)} to={`/products/${product.category}/${product.productName.replace(/\s/g, '')}/${product.id}`}>
                        {product.productName}
                    </Link>
                </div>
                <div className={getMode ? styles.lastViewedTilePriceAndBuyDark : styles.lastViewedTilePriceAndBuyLight}>
                    {product.inStock ? (
                        <>
                            <div className={getMode ? styles.lastViewedTilePriceDark : styles.lastViewedTilePriceLight}>
                                <span>{product.price}$</span>
                            </div>
                            <div className={getMode ? styles.lastViewedTileBuyDark : styles.lastViewedTileBuyLight}>
                                <button onClick={() => productBasketHandle(product)}>
                                    {checkBasketForProduct() ? (
                                        <ImCheckmark className={getMode ? styles.basket__dark : styles.basket__light} />
                                    ) : (
                                        <SlBasket className={getMode ? styles.basket__dark : styles.basket__light} />
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <span className={styles.outOfStockDark}>Out of stock</span>
                    )}
                </div>
            </div>
        </div>
    );
};
