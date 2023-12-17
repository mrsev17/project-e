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
            <h1 className={getMode ? styles.title : styles.titleLight}>Home Page</h1>
            <div className={getMode ? styles.authActions : styles.authActionsLight}>
                {isAuth ? <h3 className={styles.welcome}>Welcome {email}</h3> : <h3 className={styles.registerOrLogin}>You need register or login</h3>}
                {isAuth ? <button onClick={() => dispatch(removeUser())}>Log out from {email}</button> : ''}
                {isAuth ? (
                    ''
                ) : (
                    <button className={getMode ? styles.redirect : styles.redirectLight} onClick={handleRedirect}>
                        Login or register
                    </button>
                )}
            </div>

            <div className={styles.categoriesContainer}>
                <ul className={getMode ? styles.listCategory : styles.listCategoryLight}>
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
