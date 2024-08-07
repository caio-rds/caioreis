import './style.css'
import {useState} from "react";
import {ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import ContactPage from '@mui/icons-material/ContactPage';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DownloadIcon from "@mui/icons-material/Download";

export default function TopBar({newArea, setLanguage, language}) {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const buttons = {
        home: {'en-US': 'Home', 'pt-BR': 'Início'},        
        projects: {'en-US': 'Projects', 'pt-BR': 'Projetos'},
        contact: {'en-US': 'Contact', 'pt-BR': 'Contato'}
    }
    const languages = {
        'en-US': 'EN',
        'pt-BR': 'PT'
    }

    const icons = {
        home: <HomeIcon fontSize="small"/>,
        projects: <CodeIcon fontSize="small"/>,
        contact: <ContactPage fontSize="small"/>
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
                    <Box sx={{flexGrow: 0, display: {xs: 'flex', md: 'flex'}}}>
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
                            {
                                Object.keys(buttons).map((button, index) => (
                                    <MenuItem key={index} value={button} onClick={() => newArea(button)}>
                                        <ListItemIcon>{icons[button]}</ListItemIcon>
                                        <ListItemText>{buttons[button][language]}</ListItemText>
                                    </MenuItem>
                                ))
                            }
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
                    <Box position="absolute" display='flex' flexDirection='column' sx={{left: '50%', transform: 'translateX(-50%)'}}>
                        <Box display='flex' columnGap='5px' alignItems='center'>
                            <besideName>&lt;</besideName>
                            <name> Caio Reis </name>
                            <besideName>/&gt;</besideName>
                        </Box>
                        <role>{language === 'en-US' ? 'Software Engineer' : 'Engenheiro de Software'}</role>
                    </Box>
                    
                </Toolbar>
            </AppBar>

    );
}


// export default function TopBar({newArea, setLanguage, language, area}) {
//
//     const [showDisplay, setShowDisplay] = useState('none')
//
//     const buttons = {
//         home: {'en-US': 'Home', 'pt-BR': 'Início'},
//         // about: {'en-US': 'About', 'pt-BR': 'Sobre'},
//         projects: {'en-US': 'Projects', 'pt-BR': 'Projetos'},
//         contact: {'en-US': 'Contact', 'pt-BR': 'Contato'}
//     }
//
//     const icons = {
//         home: <HomeIcon color='#222'/>,
//         projects: <CodeIcon/>,
//         contact: <ContactPage />
//     }
//
//     const langs = {
//         'en-US': 'EN',
//         'pt-BR': 'PT'
//     }
//
//     const changeLanguage = (e) => {
//         if (e.target.value === language) return
//         localStorage.setItem('language', e.target.value)
//         setLanguage(e.target.value)
//     }
//
//     const isMobile = window.innerWidth < 768
//
//
//     const role = {
//         'en-US': 'Developer & Software Engineer',
//         'pt-BR': 'Desenvolvedor & Engenheiro de Software'
//     }
//
//     const toggleButtons = () => {
//         if (showDisplay === 'none') {
//             setShowDisplay('flex')
//         } else {
//             setShowDisplay('none')
//         }
//     }
//
//     return (
//         isMobile ?
//             <div className="topbar">
//                 <div className={"exposeButtons"}
//                      onClick={() => toggleButtons()}
//                      style={{backgroundColor: showDisplay === 'flex' ? '#282c34' : ''}}
//
//                 >
//                     <i className="fas fa-bars"></i>
//                     <div className={"buttons"} style={{display: showDisplay}} >
//                         <div className={"language"}>
//                             {
//                                 Object.keys(langs).map((lang, index) => (
//                                     <button key={index} value={lang} onClick={changeLanguage}
//                                             className={lang === language ? 'active' : ''}>
//                                         {langs[lang]}</button>
//                                 ))
//                             }
//                         </div>
//                         {
//                             Object.keys(buttons).map((button, index) => (
//                                 <Button key={index} variant={area === button ? 'contained' : 'text'} value={button}
//                                         onClick={() => newArea(button)} startIcon={icons[button]} disableElevation>
//                                     {buttons[button][language]}
//                                 </Button>
//                             ))
//                         }
//                     </div>
//                 </div>
//                 <span>
//                     <div>
//                         <besideName>&lt;</besideName>
//                         <name> Caio Reis </name>
//                         <besideName>/&gt;</besideName>
//                     </div>
//                     <role>{role[language]}</role>
//                 </span>
//             </div> :
//             <div className="topbar">
//             <span>
//                 <div>
//                     <besideName>&lt;</besideName>
//                     <name> Caio Reis </name>
//                     <besideName>/&gt;</besideName>
//                 </div>
//                 <role>{role[language]}</role>
//             </span>
//             <div className={"buttons"}>
//                 {Object.keys(buttons).map((button, index) => (
//                     <Button key={index} variant={area === button ? 'contained' : 'text'} value={button}
//                             onClick={() => newArea(button)} startIcon={icons[button]} disableElevation>
//                         {buttons[button][language]}
//                     </Button>
//                 ))}
//             </div>
//             <div className={"language"}>
//                 {
//                     Object.keys(langs).map((lang, index) => (
//                         <button key={index} value={lang} onClick={changeLanguage}
//                                 className={lang === language ? 'active' : ''}>
//                             {langs[lang]}</button>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }