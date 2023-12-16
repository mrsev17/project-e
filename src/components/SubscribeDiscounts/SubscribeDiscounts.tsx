import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './SubscribeDiscounts.module.css';

export const SubscribeDiscounts = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={getMode ? styles.subscribeDiscounts : styles.subscribeDiscountsLight}>
            <div className={getMode ? styles.wrapperSubs : styles.wrapperSubsLight}>
                <span>Subscribe to discounts!</span>
                <span>Don't worry, we don't spam</span>
            </div>
            <input type='text' placeholder='email@email.com' />
            <button>SEND</button>
        </div>
    );
};
