import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import { Product, selectProducts } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import styles from './CatalogPage.module.css';
import { useEffect } from 'react';

export const CatalogPage = () => {
    const products: Product[] = useAppSelector(selectProducts);
    const getMode: boolean = useAppSelector(selectMode);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={getMode ? styles.titleCatalogPageDark : styles.titleCatalogPageLight}>Catalog Page {products.length}</h1>
            <div className={styles.catalogList}>
                {products.map((product, i) => {
                    return <ProductTile key={i} product={product} />;
                })}
            </div>
        </div>
    );
};
