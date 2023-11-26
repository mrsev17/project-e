import { Outlet } from 'react-router-dom';
import { Menu } from '../components';

const MainLayout = () => {
    return (
        <>
            <Menu />
            <Outlet />
        </>
    );
};

export default MainLayout;
