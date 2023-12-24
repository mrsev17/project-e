import { useAppSelector } from '../../hooks/hook';
import { lastViewedProducts } from '../../redux/productsSlice';
import { selectMode } from '../../redux/modeSlice';

import { Product } from '../../redux/productsSlice';
import { FavoriteBtn } from '../FavoriteBtn';
import { SlBasket } from 'react-icons/sl';
import styles from './LastCheckdProducts.module.css';

export const LastCheckdProducts = () => {
    const getMode: boolean = useAppSelector(selectMode);
    const lastViewed = useAppSelector(lastViewedProducts);
    console.log('LAST VIEWED: ', lastViewed);
    return (
        <section className={styles.lastViewedDark}>
            {lastViewed.length !== 0 ? <h3>Last viewed products</h3> : ''}
            {/* <h3>Last viewed products</h3> */}
            <div className={styles.lastViewedContainer}>
                {lastViewed.map((item: Product, id: number) => {
                    return (
                        <div key={id} className={styles.lastViewedTile}>
                            <div className={styles.lastViewedTileContainer}>
                                <div className={styles.lastViewedTileUpper}>
                                    <div>
                                        <FavoriteBtn productName={item.productName} productIsFavorite={item.isFavorite} productId={item.id} />
                                    </div>
                                </div>
                                <div className={styles.lastViewedTileImage}>
                                    <img src={item.photos.photoOne} alt={item.productName} />
                                </div>
                                <div className={styles.lastViewedTileLink}>
                                    <span>{item.productName}</span>
                                </div>
                                <div className={styles.lastViewedTilePriceAndBuy}>
                                    <div className={styles.lastViewedTilePrice}>
                                        <span>{item.price}$</span>
                                    </div>
                                    <div className={styles.lastViewedTileBuy}>
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
