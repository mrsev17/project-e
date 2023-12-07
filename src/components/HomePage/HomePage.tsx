import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hook';
import { selectMode } from '../../redux/modeSlice';
import { selectProducts } from '../../redux/productsSlice';
import { Product } from '../../redux/productsSlice';
import styles from './HomePage.module.css';

export const HomePage = () => {
    const getMode: boolean = useAppSelector(selectMode);
    const products: Product[] = useAppSelector(selectProducts);

    function getUniqueCategories(products: Product[]) {
        const categories = new Set();
        products.forEach((product) => {
            categories.add(product.category);
        });
        return Array.from(categories);
    }
    const categories = getUniqueCategories(products);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={styles.title}>Home Page</h1>
            <div className={styles.categoriesContainer}>
                <ul className={styles.listCategory}>
                    {categories.map((category, i) => (
                        <li className={getMode ? styles.productNameDark : styles.productName} key={i}>
                            <Link to={`/${category}`}>{`${category}`}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
