import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { Product } from '../../redux/productsSlice';
import { Pagination, CatalogList } from '../../components';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(12);
    const products: Product[] = useAppSelector((state) => state.products.products);
    const titleFilter: string = useAppSelector((state) => state.filter.title);
    const filteredProducts: Product[] = products.filter((product: Product): boolean => {
        const matchesTitle: boolean = product.productName.toLowerCase().includes(titleFilter.toLowerCase());
        return matchesTitle;
    });
    const sortByName = filteredProducts.sort((productA, productB) => {
        if (productA.productName < productB.productName) return -1;
        if (productA.productName > productB.productName) return 1;
        return 0;
    });
    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;

    const currentProducts: Product[] = sortByName.slice(firstProductIndex, lastProductIndex);
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
