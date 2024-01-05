import { useAppDispatch } from '../../hooks/hook';
import { setRemoveItemFromOrder } from '../../redux/orderSlice';
import { VscTrash } from 'react-icons/vsc';
import styles from './RemoveFromOrder.module.css';

interface RemoveFromOrderProps {
    productId: string;
}

export const RemoveFromOrder: React.FC<RemoveFromOrderProps> = ({ productId }) => {
    const dispatch = useAppDispatch();
    const removeItemHandle = (id: string) => {
        dispatch(setRemoveItemFromOrder(id));
    };
    return (
        <div className={styles.removeDark}>
            <button onClick={() => removeItemHandle(productId)}>
                <span>
                    <VscTrash />
                </span>
                <span>Remove</span>
            </button>
        </div>
    );
};
