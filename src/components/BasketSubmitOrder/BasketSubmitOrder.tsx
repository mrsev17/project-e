import { toast } from 'react-toastify';
import styles from './BasketSubmitOrder.module.css';

interface BasketSubmitOrderProps {
    calculateItems: number;
    getBasketPrice: string;
}

export const BasketSubmitOrder: React.FC<BasketSubmitOrderProps> = ({ calculateItems, getBasketPrice }) => {
    const notify = () => toast('Currently not available');
    return (
        <div className={styles.basketPageDarkSubmitOrder}>
            <div className={styles.basketPageDarkSubmitOrderContainer}>
                <button onClick={() => notify()} className={styles.proceedToCheckoutBtn}>
                    Proceed to Checkout
                </button>
                <div className={styles.basketPageDarkSubmitOrderInfo}>
                    <h4>{`${calculateItems} items, full amount: `}</h4>
                    <h4>{getBasketPrice} $</h4>
                </div>
            </div>
        </div>
    );
};
