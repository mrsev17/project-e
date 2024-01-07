import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { Product } from '../../redux/productsSlice';
import { getUniqueCategories } from '../../utils/functions';
import { useAuth } from '../../hooks/useAuth';
// import { removeUser } from '../../redux/userSlice';
import { FaLaptop } from 'react-icons/fa';
import { ImPowerCord } from 'react-icons/im';
import { FaGamepad } from 'react-icons/fa';
import { BiGame } from 'react-icons/bi';
import { SlScreenSmartphone } from 'react-icons/sl';
import { BsSmartwatch } from 'react-icons/bs';
import { IoMdTabletPortrait } from 'react-icons/io';
import { useAppDispatch } from '../../hooks/hook';
import styles from './HomePage.module.css';

export const HomePage = () => {
    const { isAuth, email } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const products: Product[] = useAppSelector((state) => state.products.products);
    const categories: unknown | string[] = getUniqueCategories(products);

    const handleRedirect = () => {
        navigate('/login');
    };
    //
    const iconsCategory = (category: string) => {
        if (category === 'Laptops') return <FaLaptop />;
        if (category === 'Powerbanks') return <ImPowerCord />;
        if (category === 'Game-Consoles') return <FaGamepad />;
        if (category === 'Games') return <BiGame />;
        if (category === 'Smartphones') return <SlScreenSmartphone />;
        if (category === 'Smartwatches') return <BsSmartwatch />;
        if (category === 'Tablets') return <IoMdTabletPortrait />;
    };
    //
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1 className={getMode ? styles.title : styles.titleLight}>Home Page</h1>
            {/* <div className={getMode ? styles.authActions : styles.authActionsLight}>
                {isAuth ? <h3 className={styles.welcome}>Welcome {email}</h3> : <h3 className={styles.registerOrLogin}>You need register or login</h3>}
                {isAuth ? <button onClick={() => dispatch(removeUser())}>Log out from {email}</button> : ''}
                {isAuth ? (
                    ''
                ) : (
                    <button className={getMode ? styles.redirect : styles.redirectLight} onClick={handleRedirect}>
                        Login or register
                    </button>
                )}
            </div> */}
            <div className={styles.categoriesContainer}>
                <ul className={getMode ? styles.listCategory : styles.listCategoryLight}>
                    {Array.isArray(categories) ? (
                        categories.map((category: string, i: number) => (
                            <li className={getMode ? styles.productNameDark : styles.productName} key={i}>
                                <Link to={`/${category}`}>
                                    <span>{category}</span>
                                    <span>{iconsCategory(category)}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className={getMode ? styles.productNameDark : styles.productName}>
                            <span>No categories available</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
