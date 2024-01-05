import { toast } from 'react-toastify';
import styles from './BasketSubmitOrder.module.css';
import { useAppSelector } from '../../hooks/hook';

interface BasketSubmitOrderProps {
    calculateItems: number;
    getBasketPrice: string;
}

export const BasketSubmitOrder: React.FC<BasketSubmitOrderProps> = ({ calculateItems, getBasketPrice }) => {
    const getMode = useAppSelector((state) => state.mode.mode);
    const notify = () => toast('Currently not available');
    return (
        <div className={styles.basketPageDarkSubmitOrder}>
            <div className={styles.basketPageDarkSubmitOrderContainer}>
                <button onClick={() => notify()} className={getMode ? styles.proceedToCheckoutBtn : styles.proceedToCheckoutBtnLight}>
                    Proceed to Checkout
                </button>
                <div className={getMode ? styles.basketPageDarkSubmitOrderInfo : styles.basketPageDarkSubmitOrderInfoLight}>
                    <h4>{`${calculateItems} items, full amount: `}</h4>
                    <h4>{getBasketPrice} $</h4>
                </div>
            </div>
        </div>
    );
};
