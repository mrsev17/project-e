import { SlBasket } from 'react-icons/sl';
import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import Badge from '@mui/material/Badge';
import styles from './Basket.module.css';

export const Basket = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <button>
            <Badge badgeContent={3} color='primary'>
                <SlBasket className={getMode ? styles.basket__dark : styles.basket__light} />
            </Badge>
        </button>
    );
};
