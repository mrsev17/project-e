import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import { Product } from '../../redux/productsSlice';
import { useParams } from 'react-router-dom';
import { selectProducts } from '../../redux/productsSlice';
import styles from './ProductPage.module.css';
import { CarouselProduct } from '../CarouselProduct';

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const getMode: boolean = useAppSelector(selectMode);
    const products: Product[] = useAppSelector(selectProducts);
    const getTargetProduct: Product = products.filter((product) => product.id === id)[0];
    const getPhotosOfProduct: string[] = Object.values(getTargetProduct.photos);
    return (
        <div className={getMode ? styles.productPageWrapperDark : styles.productPageWrapperLight}>
            <div className={styles.productPageContainer}>
                <div className={styles.productPageMainDark}>
                    <div className={getMode ? styles.productPageImages : styles.productPageImagesLight}>
                        <div>
                            <CarouselProduct photos={getPhotosOfProduct} productName={getTargetProduct.productName} />
                        </div>
                    </div>
                    <div className={styles.productPageInfo}>
                        <h1 className={getMode ? styles.productPageTitleDark : styles.productPageTitleLight}>{getTargetProduct.productName}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
