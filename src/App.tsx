import { HomePage, NotFoundPage, FavoritesPage, BasketPage, CatalogPage, ProductPage, CategoryPage, LoginPage, RegisterPage } from './pages';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdaptiveLogo } from './components';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { setInitialData } from './redux/productsSlice';
import { ToastContainer } from 'react-toastify';
import { Preloader } from './components';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const getMode = useAppSelector((state) => state.mode.modeState);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const checkWidth: boolean = window.innerWidth < 567;
    useEffect(() => {
        const storedData = localStorage.getItem('persist:e-app-test-january');
        if (storedData) {
            setTimeout(() => {
                setDataLoaded(true);
            }, 2000);
        } else {
            dispatch(setInitialData());
            setTimeout(() => {
                setDataLoaded(true);
            }, 2000);
        }
    }, [dispatch]);

    if (!dataLoaded) {
        return <Preloader />;
    }
    return (
        <BrowserRouter>
            <div className={getMode ? 'appDark' : 'appLight'}>
                <div className='app-container'>
                    <AdaptiveLogo />

                    <Routes>
                        <Route path='/' element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path='login' element={<LoginPage />} />
                            <Route path='register' element={<RegisterPage />} />
                            <Route path='products' element={<CatalogPage />} />
                            <Route path='products/:category/:name/:id' element={<ProductPage />} />
                            <Route path=':category' element={<CategoryPage />} />
                            <Route path='favorites' element={<FavoritesPage />} />
                            <Route path='basket' element={<BasketPage />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                    <ToastContainer
                        position={checkWidth ? 'top-right' : 'bottom-left'}
                        autoClose={1500}
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
            </div>
        </BrowserRouter>
    );
};

export default App;
