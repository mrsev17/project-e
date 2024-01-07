import { useAppSelector } from '../../hooks/hook';
import styles from './DeliveryDate.module.css';

interface DeliveryDateProps {
    getBasketLenght: number;
}

export const DeliveryDate: React.FC<DeliveryDateProps> = ({ getBasketLenght }) => {
    const getMode = useAppSelector((state) => state.mode.modeState);
    const getDateAfterThreeDays = () => {
        const today = new Date();
        const afterThreeDays = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
        const day: number = afterThreeDays.getDate();
        const month: number = afterThreeDays.getMonth() + 1;
        const year: number = afterThreeDays.getFullYear();
        const formattedDate: string = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
        return formattedDate;
    };
    return (
        <div className={getMode ? styles.deliveryDateDark : styles.deliveryDateLight}>
            <span>{getBasketLenght ? `Delivery date ${getDateAfterThreeDays()}` : 'Order list is empty'}</span>
        </div>
    );
};
