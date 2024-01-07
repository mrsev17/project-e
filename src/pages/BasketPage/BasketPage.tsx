import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { OrderSlice } from '../../redux/orderSlice';
import styles from './BasketPage.module.css';

import { BasketSubmitOrder, ClearOrder, DeliveryDate, ItemInBasket } from '../../components';

export const BasketPage: React.FC = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const getBasket = useAppSelector((state) => state.checkout.orderList);
    const getBasketPrice = useAppSelector((state) => state.checkout.finalPrice).toFixed(2);
    const calculateItems = getBasket.reduce((acc: number, item: OrderSlice) => {
        return acc + item.quantInOrder;
    }, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={getMode ? styles.basketPageDark : styles.basketPageLight}>
            <h1 className={getMode ? styles.basketPageDarkTitle : styles.basketPageLightTitle}>{`Order list`}</h1>
            <div className={styles.basketPageDarkContent}>
                <div className={styles.basketPageDarkOrderContent}>
                    <ClearOrder />
                    <DeliveryDate getBasketLenght={getBasket.length} />
                    <ul className={styles.basketPageDarkOrderList}>
                        {getBasket.map((item, i) => {
                            return (
                                <ItemInBasket
                                    key={i}
                                    photoOne={item.photos.photoOne}
                                    productName={item.productName}
                                    productCategory={item.category}
                                    productId={item.id}
                                    productPrice={item.price}
                                    productIsFavorite={item.isFavorite}
                                    quantInOrder={item.quantInOrder}
                                />
                            );
                        })}
                    </ul>
                </div>
                <BasketSubmitOrder calculateItems={calculateItems} getBasketPrice={getBasketPrice} />
            </div>
        </section>
    );
};
