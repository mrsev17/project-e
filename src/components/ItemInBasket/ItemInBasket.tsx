import { useAppSelector } from '../../hooks/hook';
import { BasketSelectQuantity, OrderNamePrice, RemoveFromOrder, FavoriteBtn } from '../../components';
import styles from './ItemInBasket.module.css';

interface ItemInBasketProps {
    photoOne: string;
    productName: string;
    productCategory: string;
    productId: string;
    productPrice: number;
    productIsFavorite: boolean;
    quantInOrder: number;
}

export const ItemInBasket: React.FC<ItemInBasketProps> = ({
    photoOne,
    productName,
    productCategory,
    productId,
    productPrice,
    productIsFavorite,
    quantInOrder,
}) => {
    const getMode = useAppSelector((state) => state.mode.modeState);
    return (
        <li className={getMode ? styles.orderItemWrapper : styles.orderItemWrapperLight}>
            <div className={getMode ? styles.orderItemImage : styles.orderItemImageLight}>
                <img src={photoOne} alt={productName} />
            </div>
            <div className={styles.orderItemActionsDark}>
                <OrderNamePrice productCategory={productCategory} productName={productName} productId={productId} productPrice={productPrice} />
                <div className={styles.orderBuyRemoveQuantityDark}>
                    <div className={styles.toFavoriteDark}>
                        <FavoriteBtn productId={productId} productName={productName} productIsFavorite={productIsFavorite} />
                    </div>
                    <RemoveFromOrder productId={productId} />
                    <BasketSelectQuantity productId={productId} quantInOrder={quantInOrder} />
                </div>
            </div>
        </li>
    );
};
