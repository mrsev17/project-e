import { useAppDispatch } from '../../hooks/hook';
import { setProductPlusOne, setProductMinusOne, setRemoveItemFromOrder } from '../../redux/orderSlice';
import styles from './BasketSelectQuantity.module.css';

interface BasketSelectQuantityProps {
    productId: string;
    quantInOrder: number;
}

export const BasketSelectQuantity: React.FC<BasketSelectQuantityProps> = ({ productId, quantInOrder }) => {
    const dispatch = useAppDispatch();
    const plusItemToOrder = (id: string): void => {
        dispatch(setProductPlusOne(id));
    };
    const minusItemFromOrder = (id: string, itemQuantity: number): void => {
        if (itemQuantity !== 1) {
            dispatch(setProductMinusOne(id));
        } else {
            dispatch(setRemoveItemFromOrder(id));
        }
    };
    return (
        <div className={styles.selectQuantityDark}>
            <div className={styles.wrapperQuantityControl}>
                <button onClick={() => plusItemToOrder(productId)} className={styles.quantityControlPlus}>
                    +
                </button>
                <span>{quantInOrder}</span>
                <button onClick={() => minusItemFromOrder(productId, quantInOrder)} className={styles.quantityControlMinus}>
                    -
                </button>
            </div>
        </div>
    );
};
