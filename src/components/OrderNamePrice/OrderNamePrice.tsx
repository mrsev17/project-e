import { useAppSelector } from '../../hooks/hook';
import { Link } from 'react-router-dom';
import styles from './OrderNamePrice.module.css';

interface OrderNamePriceProps {
    productCategory: string;
    productName: string;
    productId: string;
    productPrice: number;
}

export const OrderNamePrice: React.FC<OrderNamePriceProps> = ({ productCategory, productName, productId, productPrice }) => {
    const getMode = useAppSelector((state) => state.mode.modeState);
    return (
        <div className={getMode ? styles.orderNameAndPriceDark : styles.orderNameAndPriceLight}>
            <Link onClick={() => window.scrollTo(0, 0)} to={`/products/${productCategory}/${productName.replace(/\s/g, '')}/${productId}`}>
                {productName}
            </Link>
            <span>{productPrice} $</span>
        </div>
    );
};
