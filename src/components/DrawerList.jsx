import React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeIcon from '@mui/icons-material/Home';
import { Person2 } from '@mui/icons-material';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../features/auth/authSlice';


const DrawerList = ({ setOpen }) => {
    const [selectedItem, setSelectedItem] = useState(0)
    const navigate = useNavigate()
    const theme = useTheme()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const colorSecondary = theme.palette.secondary.main

    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                setSelectedItem(0)
                break;
            case "/urls":
                setSelectedItem(1)
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname])

    let lists;
    const authenticatedLists = [
        {
            text: 'Home',
            icon: <HomeIcon/>,
            onclick: () => navigate('/')
        },
        {
            text: 'Profile',
            icon: <Person2 />,
            onclick: () => navigate('/profile')
        },
        {
            text: 'Donation',
            icon: < VolunteerActivismIcon />,
            onclick: () => navigate('/donations')
        },
        {
            text: 'Requests',
            icon: <RequestPageIcon/>,
            onclick: () => navigate('/requests')
        },
        {
            text: 'Signout',
            icon: <LogoutIcon/>,
            onclick: () => {
                dispatch(signout())
                navigate('/')
            }
        }
    ]

    const unAuthenticatedList = [
        {
            text: 'Home',
            icon: <HomeIcon/>,
            onclick: () => navigate('/')
        },
        {
            text: 'Login',
            icon: <LoginIcon/>,
            onclick: () => navigate('/signin')
        },
    ]
    if(user){
        lists = authenticatedLists
    }
    else{
        lists = unAuthenticatedList
    }

    return (
        <>
            <List sx={{
                // selected and (selected + hover) states
                '&& .Mui-selected, && .Mui-selected:hover': {
                    bgcolor: '#1f2936',
                    '&, & .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                },
                // hover states
                '& .MuiListItemButton-root:hover': {
                    bgcolor: '#1f2936',
                    '&, & .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                },
            }}>
                {lists.map(({ text, icon, onclick }, index) => (
                    <ListItem key={text} disablePadding selected={selectedItem === index}>
                        <ListItemButton
                            onClick={() => { onclick(); setSelectedItem(index); setOpen && setOpen(false) }}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default DrawerList;