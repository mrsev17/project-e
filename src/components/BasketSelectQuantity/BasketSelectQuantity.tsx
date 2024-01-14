import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setProductPlusOne, setProductMinusOne, setRemoveItemFromOrder } from '../../redux/orderSlice';
import { PiPlusBold, PiMinus } from 'react-icons/pi';
import styles from './BasketSelectQuantity.module.css';

interface BasketSelectQuantityProps {
    productId: string;
    quantInOrder: number;
}

export const BasketSelectQuantity: React.FC<BasketSelectQuantityProps> = ({ productId, quantInOrder }) => {
    const getMode = useAppSelector((state) => state.mode.modeState);
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
        <div className={getMode ? styles.selectQuantityDark : styles.selectQuantityLight}>
            <div className={getMode ? styles.wrapperQuantityControl : styles.wrapperQuantityControlLight}>
                <button onClick={() => plusItemToOrder(productId)} className={getMode ? styles.quantityControlPlus : styles.quantityControlPlusLight}>
                    <PiPlusBold />
                </button>
                <span>{quantInOrder}</span>
                <button
                    onClick={() => minusItemFromOrder(productId, quantInOrder)}
                    className={getMode ? styles.quantityControlMinus : styles.quantityControlMinusLight}
                >
                    <PiMinus />
                </button>
            </div>
        </div>
    );
};
