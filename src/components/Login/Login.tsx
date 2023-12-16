import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormAuth } from '../FormAuth';
import { useAppDispatch } from '../../hooks/hook';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
    };
    const dispatch = useAppDispatch();
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
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
    return <FormAuth title='sign in' handleClick={handleLogin} />;
};
