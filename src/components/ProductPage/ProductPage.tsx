import { Product } from '../../redux/productsSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import styles from './ProductPage.module.css';
import { Carousel, IconButton } from '@material-tailwind/react';

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const products: Product[] = useAppSelector(selectProducts);
    const getTargetProduct: Product = products.filter((product) => product.id === id)[0];
    const getPhotosOfProduct: string[] = Object.values(getTargetProduct.photos);
    return (
        <div className={styles.productPageWrapperDark}>
            <div className={styles.productPageContainer}>
                <div className={styles.productPageMainDark}>
                    <div className={styles.productPageImages}>
                        <Carousel
                            className='rounded-xl'
                            prevArrow={({ handlePrev }) => (
                                <IconButton className='!absolute top-2/4 left-4 -translate-y-2/4 hidden'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={2}
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
                                    </svg>
                                </IconButton>
                            )}
                            nextArrow={({ handleNext }) => (
                                <IconButton className='!absolute top-2/4 !right-4 -translate-y-2/4 hidden'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={2}
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
                                    </svg>
                                </IconButton>
                            )}
                        >
                            {getPhotosOfProduct.map((photo, i) => {
                                return <img key={i} src={photo} alt={getTargetProduct.productName} className='h-full w-full object-cover' />;
                            })}
                        </Carousel>
                    </div>
                    <div className={styles.productPageInfo}>
                        <h1 className={styles.productPageTitleDark}>{getTargetProduct.productName}</h1>
                        {/* <span className={styles.productPageID}>ID: {getTargetProduct.id}</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
