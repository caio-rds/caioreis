import './style.css'
import {useState} from "react";
import {ListItemIcon, ListItemText, Typography} from "@mui/material";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DownloadIcon from "@mui/icons-material/Download";

export default function TopBar({setLanguage, language}) {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const languages = {
        'en-US': 'EN',
        'pt-BR': 'PT'
    }

    const changeLanguage = (e) => {
        if (e.target.value === language) return
        localStorage.setItem('language', e.target.value)
        setLanguage(e.target.value)
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (

            <AppBar position="static" sx={{ paddingBottom: '3px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#17191e'}}>
                    <Box display='flex' columnGap='5px' alignItems='center' flexDirection='row'>
                            <div className={"besideName"}>&lt;</div>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#556cd6'}}>Caio Reis</Typography>
                            <div className={"besideName"}>/&gt;</div>
                    </Box>
                    <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'flex-end'}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >                           
                            <MenuItem>
                                <ListItemIcon><DownloadIcon fontSize="small"/></ListItemIcon>
                                <ListItemText><a href="./cv.pdf" download>Download CV</a></ListItemText>
                            </MenuItem>
                            <MenuItem>

                                <div className={"language"}>{
                                    Object.keys(languages).map((lang, index) => (
                                        <button key={index} value={lang} onClick={changeLanguage}
                                                className={lang === language ? 'active' : ''}>
                                            {languages[lang]}
                                        </button>
                                    ))
                                }</div>

                            </MenuItem>
                        </Menu>
                    </Box>
                    
                </Toolbar>
            </AppBar>

    );
}
