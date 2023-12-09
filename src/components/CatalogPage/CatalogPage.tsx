import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import { Product, selectProducts } from '../../redux/productsSlice';
import { Pagination } from '../Pagination';
import { CatalogList } from '../CatalogList';
import { useEffect, useState } from 'react';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
    const products: Product[] = useAppSelector(selectProducts);
    const getMode: boolean = useAppSelector(selectMode);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(12);

    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    const currentProducts: Product[] = products.slice(firstProductIndex, lastProductIndex);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={getMode ? styles.titleCatalogPageDark : styles.titleCatalogPageLight}>Catalog Page {products.length}</h1>
            <CatalogList currentProducts={currentProducts} />
            <Pagination totalItems={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
};
