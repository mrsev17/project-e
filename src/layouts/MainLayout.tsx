import { Outlet } from 'react-router-dom';
import { Menu, StickyAdaptiveMenu, LastCheckdProducts, Footer } from '../components';

const MainLayout = () => {
    return (
        <>
            <Menu />
            <StickyAdaptiveMenu />
            <main>
                <Outlet />
            </main>
            <LastCheckdProducts />
            <Footer />
        </>
    );
};

export default MainLayout;
