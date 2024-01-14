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
    const checkWidth: boolean = window.innerWidth < 567;
    const getProductNameLength: number = productName.length;
    return (
        <div className={getMode ? styles.orderNameAndPriceDark : styles.orderNameAndPriceLight}>
            <Link onClick={() => window.scrollTo(0, 0)} to={`/products/${productCategory}/${productName.replace(/\s/g, '')}/${productId}`}>
                {getProductNameLength > 24 && checkWidth ? `${productName.slice(0, 24)}...` : productName}
            </Link>
            <span>{productPrice} $</span>
        </div>
    );
};
