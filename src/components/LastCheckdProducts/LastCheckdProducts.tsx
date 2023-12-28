import { useAppSelector } from '../../hooks/hook';
import { lastViewedProducts } from '../../redux/productsSlice';
import { selectMode } from '../../redux/modeSlice';
import { Link } from 'react-router-dom';
import { Product } from '../../redux/productsSlice';
import { FavoriteBtn } from '../FavoriteBtn';
import { SlBasket } from 'react-icons/sl';
import styles from './LastCheckdProducts.module.css';

export const LastCheckdProducts = () => {
    const getMode: boolean = useAppSelector(selectMode);
    const lastViewed = useAppSelector(lastViewedProducts);
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    return (
        <section className={getMode ? styles.lastViewedDark : styles.lastViewedLight}>
            {lastViewed.length !== 0 ? <h3>Last viewed products</h3> : ''}
            {/* <h3>Last viewed products</h3> */}
            <div className={styles.lastViewedContainer}>
                {lastViewed.map((item: Product, id: number) => {
                    return (
                        <div key={id} className={getMode ? styles.lastViewedTileDark : styles.lastViewedTileLight}>
                            <div className={styles.lastViewedTileContainer}>
                                <div className={styles.lastViewedTileUpper}>
                                    <div>
                                        <FavoriteBtn productName={item.productName} productIsFavorite={item.isFavorite} productId={item.id} />
                                    </div>
                                </div>
                                <div className={styles.lastViewedTileImage}>
                                    <img src={item.photos.photoOne} alt={item.productName} />
                                </div>
                                <div className={getMode ? styles.lastViewedTileLinkDark : styles.lastViewedTileLinkLight}>
                                    <Link
                                        onClick={() => window.scrollTo(0, 0)}
                                        to={`/products/${item.category}/${item.productName.replace(/\s/g, '')}/${item.id}`}
                                    >
                                        {item.productName}
                                    </Link>
                                </div>
                                <div className={getMode ? styles.lastViewedTilePriceAndBuyDark : styles.lastViewedTilePriceAndBuyLight}>
                                    <div className={getMode ? styles.lastViewedTilePriceDark : styles.lastViewedTilePriceLight}>
                                        <span>{item.price}$</span>
                                    </div>
                                    <div className={getMode ? styles.lastViewedTileBuyDark : styles.lastViewedTileBuyLight}>
                                        <button>
                                            <SlBasket className={getMode ? styles.basket__dark : styles.basket__light} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
