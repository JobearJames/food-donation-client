import { Toolbar } from '@mui/material';
import AppBar from '../components/AppBar';

const MainLayout = ({children}) => {
    return (
        <>
            <AppBar/>
            <Toolbar/>
            {children}
        </>
    );
};

export default MainLayout;