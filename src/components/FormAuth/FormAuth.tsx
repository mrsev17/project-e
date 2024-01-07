import { useState } from 'react';
import { useAppSelector } from '../../hooks/hook';
import styles from './FormAuth.module.css';

interface FormAuthProps {
    title: string;
    handleClick: (email: string, password: string) => void;
}

export const FormAuth: React.FC<FormAuthProps> = ({ title, handleClick }) => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className={getMode ? styles.formAuth : styles.formAuthLight}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
            <button onClick={() => handleClick(email, password)}>{title}</button>
        </div>
    );
};
