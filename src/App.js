import './App.css';
import TopBar from "./components/topbar";
import {useEffect, useState} from "react";
import Home from "./components/home";
import Projects from "./components/projects";
import Contact from "./components/contact";
import {Box} from "@mui/material";



function App() {
    const [area, setArea] = useState('home')
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US')

    useEffect(() => {
        if (localStorage.getItem('area')) {
            setArea(localStorage.getItem('area'))
        }
    }, []);

    const areaHandler = (area) => {
        localStorage.setItem('area', area)
        setArea(area)
    }

    const languageHandler = (lang) => {
        setLanguage(lang)
    }

    const footer_last = () => {
        return `${String.fromCharCode(0xA9)} Caio Reis - 2024`
    }

    return (
        <div className="App">

                <TopBar newArea={areaHandler} setLanguage={languageHandler} language={language} area={area}/>
                <Box sx={{
                    paddingBottom: 5,
                    backgroundColor: '#17191e',
                    height: '100vh',
                }}
                     overflow="auto"
                >
                    <Home language={language}/>
                    <Projects language={language}/>
                    <Contact language={language}/>
                </Box>
                <footer>
                    {
                        language === 'en-US' ?
                            `Made with ReactJS and Love ❤️ by ${footer_last()}` :
                            `Feito com ReactJS e Amor ❤️ por ${footer_last()}`
                    }
                </footer>
        </div>
    );
}

export default App;
