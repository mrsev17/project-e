import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import { Product } from '../../redux/productsSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryList } from '../CategoryList';
import { Pagination } from '../Pagination';
import { selectTitleFilter } from '../../redux/filterSlice';
import styles from './CategoryPage.module.css';

export const CategoryPage = () => {
    const location = useLocation();
    const { pathname } = location;
    const products: Product[] = useAppSelector(selectProducts);
    const titleFilter: string = useAppSelector(selectTitleFilter);

    const filteredProducts: Product[] = products.filter((product: Product): boolean => {
        const matchesTitle: boolean = product.productName.toLowerCase().includes(titleFilter.toLowerCase());
        return matchesTitle;
    });

    const getTargetCategoryItems = (name: string, data: Product[]) => {
        return data.filter((product) => product.category === name);
    };
    const targetData = getTargetCategoryItems(pathname.substring(1), products);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(9);

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
                <div className={styles.categoryWrapperContent}>
                    <CategoryList targetData={currentProducts} />
                    <div className={styles.filter}>
                        <h3>{pathname.substring(1)}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.categoryPageBottom}>
                <Pagination totalItems={targetData.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    );
};
