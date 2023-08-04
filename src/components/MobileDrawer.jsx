import { Divider, IconButton, Stack, SwipeableDrawer, Typography, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import DrawerList from './DrawerList';

const MobileDrawer = ({open, setOpen}) => {
    const theme = useTheme()
    const colorSecondary = theme.palette.secondary.dark
    return (
        <>
            <SwipeableDrawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                sx={{
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', backgroundColor: `${colorSecondary}`, color: 'secondary.contrastText' },
                }}
                PaperProps={{
                    sx: { width: "90%" },
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <Stack direction={'row'} alignItems={'center'}>
                            {/* <BiCollapse size={36} style={{ marginRight: '0.5rem', color: `${colorPrimary}` }} /> */}
                            <Typography color={'secondary.contrastText'} variant="h6" component="div">
                               Food Donation
                            </Typography>
                        </Stack>
                    </Link>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon sx={{ color: 'secondary.contrastText' }} />
                    </IconButton>
                </Toolbar>
                <Divider />
                <DrawerList setOpen={setOpen} />
            </SwipeableDrawer>
        </>
    );
};

export default MobileDrawer;