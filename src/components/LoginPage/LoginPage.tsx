import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './LoginPage.module.css';
import { Login } from '../Login/Login';

export const LoginPage = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={getMode ? styles.loginPageDark : styles.loginPageLight}>
            <h2>Login</h2>
            <Login />
            <p>
                Or <Link to='/register'>register</Link>
            </p>
        </div>
    );
};
