import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Counter, HomePage, AboutPage, ContactsPage, NotFoundPage } from './components';
import MainLayout from './layouts/MainLayout';
import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className='app'>
                <header>
                    <Routes>
                        <Route path='/home' element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path='about' element={<AboutPage />} />
                            <Route path='contacts' element={<ContactsPage />} />
                            <Route path='counter' element={<Counter />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </header>
            </div>
        </BrowserRouter>
    );
};

export default App;
