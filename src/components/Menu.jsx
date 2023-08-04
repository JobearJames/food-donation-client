import * as React from 'react';
import Button from '@mui/material/Button';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Menu({ name, menuItems }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                sx={{
                    color: 'black',
                    textTransform: 'none',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    mr: '8px'
                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
            >
                {name}
                <ArrowDropDownIcon />
            </Button>
            <MuiMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    menuItems.map((item, i) => (
                        <MenuItem
                            key={item.item}
                            onClick={() => { item.onclick(); handleClose() }}>
                            {item.item}
                        </MenuItem>
                    ))
                }
            </MuiMenu>
        </>
    );
}
