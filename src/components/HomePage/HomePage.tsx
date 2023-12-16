import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { selectProducts, Product } from '../../redux/productsSlice';
import { getUniqueCategories } from '../../utils/functions';
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from '../../redux/userSlice';
import { useAppDispatch } from '../../hooks/hook';
import styles from './HomePage.module.css';

export const HomePage = () => {
    const { isAuth, email } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getMode: boolean = useAppSelector(selectMode);
    const products: Product[] = useAppSelector(selectProducts);
    const categories = getUniqueCategories(products);

    const handleRedirect = () => {
        navigate('/login');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={styles.title}>Home Page</h1>
            {isAuth ? <h3>Welcome {email}</h3> : 'You need register or login'}
            {isAuth ? <button onClick={() => dispatch(removeUser())}>Log out from {email}</button> : ''}
            <button className={styles.redirect} onClick={handleRedirect}>
                TEST PATH
            </button>

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
