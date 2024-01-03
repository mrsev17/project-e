import { useEffect } from 'react';
import { setClearOrder, setProductPlusOne, setProductMinusOne, setRemoveItemFromOrder } from '../../redux/orderSlice';
import { useAppDispatch } from '../../hooks/hook';
import { useAppSelector } from '../../hooks/hook';
import { Link } from 'react-router-dom';
import { OrderProduct } from '../../components/OrderProduct';
import { VscTrash } from 'react-icons/vsc';
import styles from './BasketPage.module.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { Product } from '../../redux/productsSlice';
import { OrderSlice } from '../../redux/orderSlice';
import { toast } from 'react-toastify';

export const BasketPage = () => {
    const notify = () => toast('Currently not available');
    const dispatch = useAppDispatch();
    const getBasket = useAppSelector((state) => state.checkout.orderList);
    const getBasketPrice = useAppSelector((state) => state.checkout.finalPrice).toFixed(2);

    const getDateAfterThreeDays = () => {
        const today = new Date();
        const afterThreeDays = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
        const day: number = afterThreeDays.getDate();
        const month: number = afterThreeDays.getMonth() + 1;
        const year: number = afterThreeDays.getFullYear();
        const formattedDate: string = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
        return formattedDate;
    };

    const clearAllOrderHandle = () => {
        dispatch(setClearOrder());
    };

    const plusItemToOrder = (id: string) => {
        dispatch(setProductPlusOne(id));
    };

    const minusItemFromOrder = (id: string, itemQuantity: number) => {
        if (itemQuantity !== 1) {
            dispatch(setProductMinusOne(id));
        } else {
            dispatch(setRemoveItemFromOrder(id));
        }
    };

    console.log(getBasket);
    const calculateItems = getBasket.reduce((acc: number, item: OrderSlice) => {
        return acc + item.quantInOrder;
    }, 0);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={styles.basketPageDark}>
            <h1 className={styles.basketPageDarkTitle}>{`Order list`}</h1>

            <div className={styles.basketPageDarkContent}>
                <div className={styles.basketPageDarkOrderContent}>
                    <div className={styles.clearOrderDark}>
                        <button onClick={clearAllOrderHandle} className={styles.basketPageClearOrderDark}>
                            <span>
                                <VscTrash />
                            </span>
                            <span>Delete All</span>
                        </button>
                    </div>

                    <div className={styles.deliveryDateDark}>
                        <span>{getBasket.length ? `Delivery date ${getDateAfterThreeDays()}` : 'Order list is empty'}</span>
                    </div>

                    <ul className={styles.basketPageDarkOrderList}>
                        {getBasket.map((item, i) => {
                            return (
                                <li key={i} className={styles.orderItemWrapper}>
                                    <div className={styles.orderItemImage}>
                                        <img src={item.photos.photoOne} alt={item.productName} />
                                    </div>
                                    <div className={styles.orderItemActionsDark}>
                                        <div className={styles.orderNameAndPriceDark}>
                                            <Link
                                                onClick={() => window.scrollTo(0, 0)}
                                                to={`/products/${item.category}/${item.productName.replace(/\s/g, '')}/${item.id}`}
                                            >
                                                {item.productName}
                                            </Link>
                                            <span>{item.price} $</span>
                                        </div>
                                        <div className={styles.orderBuyRemoveQuantityDark}>
                                            <div className={styles.toFavoriteDark}>
                                                <button>
                                                    <span>
                                                        <GoHeart />
                                                    </span>
                                                    <span>To favorites</span>
                                                </button>
                                            </div>
                                            <div className={styles.removeDark}>
                                                <button onClick={() => dispatch(setRemoveItemFromOrder(item.id))}>
                                                    <span>
                                                        <VscTrash />
                                                    </span>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <div className={styles.selectQuantityDark}>
                                                <div className={styles.wrapperQuantityControl}>
                                                    <button onClick={() => plusItemToOrder(item.id)} className={styles.quantityControlPlus}>
                                                        +
                                                    </button>
                                                    <span>{item.quantInOrder}</span>
                                                    <button
                                                        onClick={() => minusItemFromOrder(item.id, item.quantInOrder)}
                                                        className={styles.quantityControlMinus}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={styles.basketPageDarkSubmitOrder}>
                    <div className={styles.basketPageDarkSubmitOrderContainer}>
                        <button onClick={() => notify()} className={styles.proceedToCheckoutBtn}>
                            Proceed to Checkout
                        </button>
                        <div className={styles.basketPageDarkSubmitOrderInfo}>
                            <h4>{`${calculateItems} items, full amount: `}</h4>
                            <h4>{getBasketPrice} $</h4>
                        </div>
                        <div className={styles.basketPageDarkSubmitOrderDiscount}></div>
                        <div className={styles.basketPageDarkSubmitOrderFullPrice}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
