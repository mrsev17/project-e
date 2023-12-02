import { Outlet } from 'react-router-dom';
import { Menu, StickyAdaptiveMenu } from '../components';

const MainLayout = () => {
    return (
        <>
            <Menu />
            <StickyAdaptiveMenu />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
