import { Outlet } from 'react-router-dom';
import { Menu, StickyAdaptiveMenu, Footer } from '../components';

const MainLayout = () => {
    return (
        <>
            <Menu />
            <StickyAdaptiveMenu />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
