import './App.css';
import {useState} from "react";
import TopBar from "./components/bar";
import Infos from './components/infos';
import Footer from './components/footer';
import Projects from './components/projects';
import Experience from "./components/experience";
import Letter from "./components/letter";
import About from "./components/about";


function App() {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US')

    const languageHandler = (lang) => {
        setLanguage(lang)
    }

    return (
        <div className="App">
            <TopBar setLanguage={languageHandler} language={language} />
            <div id='home'>
                <About language={language}/>
                <Letter language={language}/>                        
                <Projects language={language}/>                    
                <Experience language={language}/>
                <Infos language={language}/>
                <Footer language={language}/>
            </div>
        </div>
    );
}

export default App;
