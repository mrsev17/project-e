import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { SlBasket } from 'react-icons/sl';
import styles from './BuyBtn.module.css';

interface BuyBtnProps {
    inStock: boolean;
}

export const BuyBtn: React.FC<BuyBtnProps> = ({ inStock }) => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={getMode ? styles.buyButtonDark : styles.buyButtonLight}>
            {inStock ? (
                <button className={getMode ? styles.buyDark : styles.buyLight}>
                    <span>Buy</span>
                    <span>
                        <SlBasket />
                    </span>
                </button>
            ) : (
                <button className={styles.outOfStock} disabled>
                    Out of order
                </button>
            )}
        </div>
    );
};
