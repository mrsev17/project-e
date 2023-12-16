import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { Login } from '../Login/Login';

export const LoginPage = () => {
    return (
        <div className={styles.loginPageDark}>
            <h2>Login</h2>
            <Login />
            <p>
                Or <Link to='/register'>register</Link>
            </p>
        </div>
    );
};
