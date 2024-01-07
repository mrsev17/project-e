import { useAppSelector } from '../../hooks/hook';
import styles from './SubscribeDiscounts.module.css';

export const SubscribeDiscounts: React.FC = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
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
