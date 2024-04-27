import './style.css'

import Experience from "../experience";
import Letter from "../letter";
import About from "../about";



export default function Home({language}) {

    const legend = {
        hi: {
            'en-US': 'Hi, I\'m Caio Reis',
            'pt-BR': 'Olá, eu sou Caio Reis'
        },
        download: {
            'en-US': "Download my CV",
            'pt-BR': "Baixe meu currículo"
        }
    }

    return (
        <div className="home">
            <h1>{legend.hi[language]}</h1>
            <span>
                <About language={language}/>
                <Experience language={language}/>
            </span>
            <Letter language={language}/>
            <a href={"./cv.pdf"} tabIndex={-1} download>
                <button>
                    <i className="fas fa-download"></i>
                    {legend.download[language]}
                </button>
            </a>

        </div>
    )
}