import { useAppDispatch } from '../../hooks/hook';
import { setUser } from '../../redux/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormAuth } from '../FormAuth';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
    };
    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(
                    setUser({
                        email: user.email || '',
                        id: user.uid || '',
                        token: user.refreshToken || '',
                    })
                );
                handleRedirect();
            })
            .catch(console.error);
    };
    return <FormAuth title='register' handleClick={handleRegister} />;
};
