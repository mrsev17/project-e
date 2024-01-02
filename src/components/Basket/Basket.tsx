import { SlBasket } from 'react-icons/sl';
import { useAppSelector } from '../../hooks/hook';
import Badge from '@mui/material/Badge';
import styles from './Basket.module.css';

export const Basket = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.mode);
    const getBasketLength = useAppSelector((state) => state.checkout.orderList).length;
    return (
        <button>
            <Badge badgeContent={getBasketLength} color='primary'>
                <SlBasket className={getMode ? styles.basket__dark : styles.basket__light} />
            </Badge>
        </button>
    );
};
