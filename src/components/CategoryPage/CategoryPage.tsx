import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import { Product } from '../../redux/productsSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryList } from '../CategoryList';
import { Pagination } from '../Pagination';
import styles from './CategoryPage.module.css';

export const CategoryPage = () => {
    const location = useLocation();
    const { pathname } = location;
    const products: Product[] = useAppSelector(selectProducts);
    const getTargetCategoryItems = (name: string, data: Product[]) => {
        return data.filter((product) => product.category === name);
    };
    const targetData = getTargetCategoryItems(pathname.substring(1), products);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(10);

    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    const currentProducts: Product[] = targetData.slice(firstProductIndex, lastProductIndex);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.categoryPage}>
            <div className={styles.categoryPageContent}>
                <h2 className={styles.categoryTitle}>{pathname.substring(1)}</h2>
                <CategoryList targetData={currentProducts} />
            </div>
            <div className={styles.categoryPageBottom}>
                <Pagination totalItems={targetData.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    );
};
