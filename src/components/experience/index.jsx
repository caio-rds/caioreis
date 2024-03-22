import './style.css'
import Projects from "../projects/index.jsx"
import {useState} from "react";

const pl_images = {
    python: {
        name: 'Python',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        alt: 'Python'
    },
    javascript: {
        name: 'JavaScript',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
        alt: 'JavaScript'
    },
    react: {
        name: 'React',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
        alt: 'React'
    },
    golang: {
        name: 'Golang',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
        alt: 'Golang'
    },
    mysql: {
        name: 'MySQL',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
        alt: 'MySQL'
    },
    mongodb: {
        name: 'MongoDB',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
        alt: 'MongoDB'
    },
    docker: {
        name: 'Docker',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
        alt: 'Docker'
    }
}

export default function Experience({language}) {
    const legend = {
        title: {
            'en-US': "Experience",
            'pt-BR': "Experiência"
        },
        description: {
            'en-US': "Programming languages and tools I've been working with",
            'pt-BR': "Linguagens de programação e ferramentas com as quais tenho trabalhado"
        },
        download: {
            'en-US': "Download my CV",
            'pt-BR': "Baixe meu currículo"
        },
        projects: {
            'en-US': "See Projects",
            'pt-BR': "Ver Projetos"
        }
    }
    const [showProjects, setShowProjects] = useState(false)

    const toggleProjects = () => {
        let content = document.querySelector('.content')
        content.style.effect = "blur(5px)"
        setShowProjects(!showProjects)
    }

    return (
        <div className={"mainDisplay"}>
            <div className="experience">
                <h1>{legend.title[language]}</h1>
                <p>{legend.description[language]}</p>
                <div>
                    {Object.keys(pl_images).map((pl) => {
                        return (
                            <span key={pl}>
                                <img src={pl_images[pl].src} alt={pl_images[pl].alt} width={40} />
                                <p>{pl_images[pl].name}</p>
                            </span>
                        )
                    })}
                </div>
                <div className={"buttonArea"}>
                    <a href={"./cv.pdf"} download>
                        <button>
                            <i className="fas fa-download"></i>
                            {legend.download[language]}
                        </button>
                    </a>
                    <button onClick={toggleProjects}>
                        <img src={'./github.png'} alt={'GitHub'} width={20} />
                        {legend.projects[language]}
                    </button>

                </div>
            </div>
            <Projects language={language} show={showProjects} setDisplay={toggleProjects}/>
        </div>
    )
}