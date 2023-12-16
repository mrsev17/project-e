import { useAppSelector } from './hook';

export function useAuth() {
    const { email, token, id } = useAppSelector((state: any) => state.user);
    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}
