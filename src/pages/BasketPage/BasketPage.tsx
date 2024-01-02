import { useEffect } from 'react';

export const BasketPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <h1>Basket Page</h1>
        </div>
    );
};
