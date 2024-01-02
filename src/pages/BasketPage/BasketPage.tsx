import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { Link } from 'react-router-dom';
import { OrderProduct } from '../../components/OrderProduct';
import { VscTrash } from 'react-icons/vsc';
import styles from './BasketPage.module.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';

export const BasketPage = () => {
    const getBasket = useAppSelector((state) => state.checkout.orderList);

    const getDateAfterThreeDays = () => {
        const today = new Date();
        const afterThreeDays = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
        const day: number = afterThreeDays.getDate();
        const month: number = afterThreeDays.getMonth() + 1;
        const year: number = afterThreeDays.getFullYear();
        const formattedDate: string = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
        return formattedDate;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={styles.basketPageDark}>
            <h1 className={styles.basketPageDarkTitle}>{`Order: ${getBasket.length} items`}</h1>
            <div className={styles.basketPageDarkContent}>
                <div className={styles.basketPageDarkOrderContent}>
                    <div className={styles.clearOrderDark}>
                        <button className={styles.basketPageClearOrderDark}>
                            <span>
                                <VscTrash />
                            </span>
                            <span>Delete All</span>
                        </button>
                    </div>
                    <div className={styles.deliveryDateDark}>
                        <span>{getBasket.length ? `Delivery date ${getDateAfterThreeDays()}` : ''}</span>
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
                                                <button>
                                                    <span>
                                                        <VscTrash />
                                                    </span>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <div className={styles.selectQuantityDark}>
                                                <div className={styles.wrapperQuantityControl}>
                                                    <button className={styles.quantityControlPlus}>+</button>
                                                    <span>{item.quantInOrder}</span>
                                                    <button className={styles.quantityControlMinus}>-</button>
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
                    <div className={styles.basketPageDarkClearOrder}></div>
                    <div className={styles.basketPageDarkDeliveryDate}></div>
                </div>
            </div>
        </section>
    );
};
