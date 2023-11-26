import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, FavoritesPage, BasketPage, CatalogPage } from './components';
import MainLayout from './layouts/MainLayout';
import './App.css';
import { useAppDispatch } from './hook';
import { setInitialData } from './redux/productsSlice';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // Check if data is already in localStorage
        const storedData = localStorage.getItem('e-app');

        if (storedData) {
            // If data is in localStorage, set it in state
            return;
        } else {
            // If data is not in localStorage, fetch it and store it
            dispatch(setInitialData());
        }
    }, []);
    return (
        <BrowserRouter>
            <div className='app'>
                <header>
                    <Routes>
                        <Route path='/' element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path='catalog' element={<CatalogPage />} />
                            {/* <Route path='contacts' element={<ContactsPage />} /> */}
                            <Route path='favorites' element={<FavoritesPage />} />
                            <Route path='basket' element={<BasketPage />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </header>
            </div>
        </BrowserRouter>
    );
};

export default App;
