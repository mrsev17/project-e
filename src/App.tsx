import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, FavoritesPage, BasketPage, CatalogPage } from './components';
import MainLayout from './layouts/MainLayout';
import './App.css';
import { useAppDispatch, useAppSelector } from './hook';
import { setInitialData } from './redux/productsSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectMode } from './redux/modeSlice';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const getMode = useAppSelector(selectMode);
    useEffect(() => {
        const storedData = localStorage.getItem('persist:e-app');
        if (storedData) {
            return;
        } else {
            dispatch(setInitialData());
        }
    }, [dispatch]);
    return (
        <BrowserRouter>
            <div className='app'>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path='catalog' element={<CatalogPage />} />
                        <Route path='favorites' element={<FavoritesPage />} />
                        <Route path='basket' element={<BasketPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme={getMode ? 'dark' : 'light'}
                />
            </div>
        </BrowserRouter>
    );
};

export default App;
