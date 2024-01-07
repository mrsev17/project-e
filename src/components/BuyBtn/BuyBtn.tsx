import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { SlBasket } from 'react-icons/sl';
import { Product } from '../../redux/productsSlice';
import { setProductInBasket } from '../../redux/orderSlice';
import { ImCheckmark } from 'react-icons/im';
import { toast } from 'react-toastify';
import styles from './BuyBtn.module.css';

interface BuyBtnProps {
    product: Product;
}

export const BuyBtn: React.FC<BuyBtnProps> = ({ product }) => {
    const notify = () => toast(`${product.productName} already in basket list`);
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const getBasket = useAppSelector((state) => state.checkout.orderList);
    const dispatch = useAppDispatch();
    const checkBasketForProduct = () => {
        return getBasket.some((productInBasket) => productInBasket.id === product.id);
    };
    const productBasketHandle = (product: Product) => {
        if (!checkBasketForProduct()) {
            dispatch(setProductInBasket(product));
        } else {
            notify();
        }
    };
    return (
        <div className={getMode ? styles.buyButtonDark : styles.buyButtonLight}>
            {product.inStock ? (
                <button onClick={() => productBasketHandle(product)} className={getMode ? styles.buyDark : styles.buyLight}>
                    <span>Buy</span>
                    <span>{checkBasketForProduct() ? <ImCheckmark /> : <SlBasket />}</span>
                </button>
            ) : (
                <button className={styles.outOfStock} disabled>
                    Out of order
                </button>
            )}
        </div>
    );
};
