import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setViewedProduct } from '../../redux/productsSlice';
import { selectMode } from '../../redux/modeSlice';
import { Link } from 'react-router-dom';
import { FavoriteBtn } from '../FavoriteBtn';
import { SlBasket } from 'react-icons/sl';
import styles from './LastViewedTile.module.css';

interface LastViewedTileProps {
    productName: string;
    isFavorite: boolean;
    id: string;
    itemPhotoOne: string;
    itemCategory: string;
    itemPrice: number;
}

export const LastViewedTile: React.FC<LastViewedTileProps> = ({ productName, isFavorite, id, itemPhotoOne, itemCategory, itemPrice }) => {
    const getMode: boolean = useAppSelector(selectMode);
    // const dispatch = useAppDispatch();
    // const goToProductHandle = () => {
    //     window.scrollTo(0, 0);
    //     dispatch(setViewedProduct(getTargetProduct));
    // };
    return (
        <div className={getMode ? styles.lastViewedTileDark : styles.lastViewedTileLight}>
            <div className={styles.lastViewedTileContainer}>
                <div className={styles.lastViewedTileUpper}>
                    <div>
                        <FavoriteBtn productName={productName} productIsFavorite={isFavorite} productId={id} />
                    </div>
                </div>
                <div className={styles.lastViewedTileImage}>
                    <img src={itemPhotoOne} alt={productName} />
                </div>
                <div className={getMode ? styles.lastViewedTileLinkDark : styles.lastViewedTileLinkLight}>
                    <Link onClick={() => window.scrollTo(0, 0)} to={`/products/${itemCategory}/${productName.replace(/\s/g, '')}/${id}`}>
                        {productName}
                    </Link>
                </div>
                <div className={getMode ? styles.lastViewedTilePriceAndBuyDark : styles.lastViewedTilePriceAndBuyLight}>
                    <div className={getMode ? styles.lastViewedTilePriceDark : styles.lastViewedTilePriceLight}>
                        <span>{itemPrice}$</span>
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
};
