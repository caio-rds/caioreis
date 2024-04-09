import './App.css';
import TopBar from "./components/topbar";
import {useEffect, useState} from "react";
import About from "./components/about";
import Home from "./components/home";
import Projects from "./components/projects";
import Contact from "./components/contact";



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

    const mapArea = {
        home: <Home language={language} setArea={areaHandler}/>,
        about: <About language={language}/>,
        projects: <Projects language={language}/>,
        contact: <Contact language={language}/>
    }

    return (
        <div className="App">
            <TopBar newArea={areaHandler} setLanguage={languageHandler} language={language} area={area}/>
            <div className="content">
                {mapArea[area]}
            </div>
        </div>
    );
}

export default App;
