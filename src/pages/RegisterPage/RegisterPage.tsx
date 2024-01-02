import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './RegisterPage.module.css';
import { SignUp } from '../../components';

export const RegisterPage = () => {
    const getMode: boolean = useAppSelector(selectMode);
    return (
        <div className={getMode ? styles.registerPageDark : styles.registerPageLight}>
            <h2>Register </h2>
            <SignUp />
            <p>
                Already have account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};
