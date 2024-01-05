import { toast } from 'react-toastify';
import { setIsFavoriteProduct } from '../../redux/productsSlice';
import { setIsFavoriteProductBasket } from '../../redux/orderSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './FavoriteBtn.module.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface FavoriteBtnProps {
    productName: string;
    productIsFavorite: boolean | undefined;
    productId: string;
}

export const FavoriteBtn: React.FC<FavoriteBtnProps> = ({ productName, productIsFavorite, productId }) => {
    const notify = () => toast(`${productName} ${productIsFavorite ? 'removed from' : 'added to'} wish list`);
    const dispatch = useAppDispatch();
    const getMode: boolean = useAppSelector(selectMode);
    const favoriteHandle = (id: string) => {
        dispatch(setIsFavoriteProduct(id));
        dispatch(setIsFavoriteProductBasket(id));
        notify();
    };
    return (
        <span onClick={() => favoriteHandle(productId)}>
            <div className={getMode ? styles.favoriteDark : styles.favoriteLight}>{productIsFavorite ? <GoHeartFill /> : <GoHeart />}</div>
        </span>
    );
};
