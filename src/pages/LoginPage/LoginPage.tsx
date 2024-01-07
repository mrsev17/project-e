import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import styles from './LoginPage.module.css';
import { Login } from '../../components';

export const LoginPage = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
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
