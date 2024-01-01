import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { Product, selectProducts } from '../../redux/productsSlice';
import { selectTitleFilter } from '../../redux/filterSlice';
import { Pagination, CatalogList } from '../../components';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(12);
    const products: Product[] = useAppSelector(selectProducts);
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const filteredProducts: Product[] = products.filter((product: Product): boolean => {
        const matchesTitle: boolean = product.productName.toLowerCase().includes(titleFilter.toLowerCase());
        return matchesTitle;
    });
    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    const currentProducts: Product[] = filteredProducts.slice(firstProductIndex, lastProductIndex);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.catalogListWrapper}>
            <CatalogList currentProducts={currentProducts} setCurrentPage={setCurrentPage} />
            <Pagination totalItems={filteredProducts.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
};
