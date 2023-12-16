import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { SignUp } from '../SignUp';

export const RegisterPage = () => {
    return (
        <div className={styles.registerPageDark}>
            <h2>Register </h2>
            <SignUp />
            <p>
                Already have account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};
