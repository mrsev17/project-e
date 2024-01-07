import { HomePage, NotFoundPage, FavoritesPage, BasketPage, CatalogPage, ProductPage, CategoryPage, LoginPage, RegisterPage } from './pages';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdaptiveLogo } from './components';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { setInitialData } from './redux/productsSlice';
import { ToastContainer } from 'react-toastify';
// import { selectMode } from './redux/modeSlice';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const getMode = useAppSelector((state) => state.mode.modeState);
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
                        position='bottom-left'
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
            </div>
        </BrowserRouter>
    );
};

export default App;
