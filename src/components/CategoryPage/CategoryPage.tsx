import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import { Product } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './CategoryPage.module.css';

export const CategoryPage = () => {
    const location = useLocation();
    const { pathname } = location;
    const products: Product[] = useAppSelector(selectProducts);
    const getTargetCategoryItems = (name: string, data: Product[]) => {
        return data.filter((product) => product.category === name);
    };
    const targetData = getTargetCategoryItems(pathname.substring(1), products);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.catalogListCategory}>
            {targetData.map((product, i) => {
                return <ProductTile key={i} product={product} />;
            })}
        </div>
    );
};
