import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { Product } from '../../redux/productsSlice';
import { useParams } from 'react-router-dom';
import { selectProducts } from '../../redux/productsSlice';
import styles from './ProductPage.module.css';
import { CarouselProduct } from '../CarouselProduct';
import { useEffect } from 'react';
import { BuyBtn } from '../BuyBtn';
import { FavoriteBtn } from '../FavoriteBtn';

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const getMode: boolean = useAppSelector(selectMode);
    const products: Product[] = useAppSelector(selectProducts);
    const getTargetProduct: Product = products.filter((product) => product.id === id)[0];
    const getPhotosOfProduct: string[] = Object.values(getTargetProduct.photos);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
                        <div className={styles.upperInfo}>
                            <h1 className={getMode ? styles.productPageTitleDark : styles.productPageTitleLight}>{getTargetProduct.productName}</h1>
                            <div className={getMode ? styles.accentLineDark : styles.accentLineLight}></div>
                            {/* <div className={getMode ? styles.priceInfoDark : styles.priceInfoLight}>
                                <span>{getTargetProduct.price}$</span>
                            </div> */}
                        </div>

                        <div className={styles.productMidInfo}>
                            <div className={getMode ? styles.priceInfoDark : styles.priceInfoLight}>
                                <span>{getTargetProduct.price}$</span>
                            </div>
                            <BuyBtn inStock={getTargetProduct.inStock} />
                            {/* <FavoriteBtn
                                productName={getTargetProduct.productName}
                                productIsFavorite={getTargetProduct.isFavorite}
                                productId={getTargetProduct.id}
                            /> */}
                        </div>

                        <div className={styles.bottomInfo}>
                            {/* <span className={getMode ? styles.idInfoDark : styles.idInfoLight}> ID: {getTargetProduct.id}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
