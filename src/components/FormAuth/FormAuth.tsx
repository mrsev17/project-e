import { useState } from 'react';
import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './FormAuth.module.css';

interface FormAuthProps {
    title: string;
    handleClick: (email: string, password: string) => void;
}

export const FormAuth: React.FC<FormAuthProps> = ({ title, handleClick }) => {
    const getMode: boolean = useAppSelector(selectMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={getMode ? styles.formAuth : styles.formAuthLight}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
            <button onClick={() => handleClick(email, password)}>{title}</button>
        </div>
    );
};
