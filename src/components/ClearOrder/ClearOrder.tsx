import { useAppDispatch } from '../../hooks/hook';
import { setClearOrder } from '../../redux/orderSlice';
import { VscTrash } from 'react-icons/vsc';
import styles from './ClearOrder.module.css';

export const ClearOrder = () => {
    const dispatch = useAppDispatch();
    const clearAllOrderHandle = () => {
        dispatch(setClearOrder());
    };
    return (
        <div className={styles.clearOrderDark}>
            <button onClick={clearAllOrderHandle} className={styles.basketPageClearOrderDark}>
                <span>
                    <VscTrash />
                </span>
                <span>Delete All</span>
            </button>
        </div>
    );
};
