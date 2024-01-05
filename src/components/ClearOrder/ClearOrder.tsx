import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setClearOrder } from '../../redux/orderSlice';
import { VscTrash } from 'react-icons/vsc';
import styles from './ClearOrder.module.css';

export const ClearOrder = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.mode);
    const dispatch = useAppDispatch();
    const clearAllOrderHandle = () => {
        dispatch(setClearOrder());
    };
    return (
        <div className={getMode ? styles.clearOrderDark : styles.clearOrderLight}>
            <button onClick={clearAllOrderHandle} className={getMode ? styles.basketPageClearOrderDark : styles.basketPageClearOrderLight}>
                <span>
                    <VscTrash />
                </span>
                <span>Delete All</span>
            </button>
        </div>
    );
};
