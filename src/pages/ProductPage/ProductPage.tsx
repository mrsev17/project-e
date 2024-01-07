import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setViewedProduct, Product } from '../../redux/productsSlice';
import { CarouselProduct, BuyBtn } from '../../components';
import styles from './ProductPage.module.css';

interface extendProps extends Product {
    [key: string]: any;
}

export const ProductPage: React.FC = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const products: Product[] = useAppSelector((state) => state.products.products);
    const dispatch = useAppDispatch();
    const entriesForFilters: string[] = ['photos', 'productName', 'category', 'inStock', 'id', 'isFavorite', 'price', 'description'];
    const { id } = useParams();
    const getTargetProduct: extendProps = products.filter((product) => product.id === id)[0];
    const getPhotosOfProduct: string[] = Object.values(getTargetProduct.photos);
    const renderCharacteristics = () => {
        const characteristics = [];
        for (const key in getTargetProduct) {
            if (!entriesForFilters.includes(key)) {
                characteristics.push(
                    <div key={key} className={styles.characteristic}>
                        <div className={styles.spec}>
                            <span>{key}:</span>
                        </div>
                        <div className={styles.value}>
                            <span>{key !== 'storage' ? `${getTargetProduct[key]}` : `${getTargetProduct[key]}GB`}</span>
                        </div>
                    </div>
                );
            }
        }
        return characteristics;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setViewedProduct(getTargetProduct));
    }, [getTargetProduct, dispatch]);
    return (
        <div className={getMode ? styles.productPageWrapperDark : styles.productPageWrapperLight}>
            <div className={styles.productPageContainer}>
                <div className={styles.productPageMainDark}>
                    <div className={getMode ? styles.productPageImages : styles.productPageImagesLight}>
                        <CarouselProduct photos={getPhotosOfProduct} productName={getTargetProduct.productName} />
                    </div>
                    <div className={styles.productPageInfo}>
                        <div className={styles.upperInfo}>
                            <h1 className={getMode ? styles.productPageTitleDark : styles.productPageTitleLight}>{getTargetProduct.productName}</h1>
                            <div className={getMode ? styles.accentLineDark : styles.accentLineLight}></div>
                        </div>

                        <div className={styles.productMidInfo}>
                            <div className={getMode ? styles.priceInfoDark : styles.priceInfoLight}>
                                <span>{getTargetProduct.price}$</span>
                            </div>
                            <BuyBtn product={getTargetProduct} />
                        </div>

                        <div className={styles.bottomInfo}>
                            <div className={getMode ? styles.specsDark : styles.specsLight}>{renderCharacteristics()}</div>
                        </div>
                    </div>
                </div>
                <div className={getMode ? styles.descriptionDark : styles.descriptionLight}>
                    <h3>{getTargetProduct.productName}</h3>
                    <p>{getTargetProduct.description}</p>
                </div>
            </div>
        </div>
    );
};
