import './style.css'

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
    lua: {
        name: 'Lua',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg",
        alt: 'Lua'
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

    return (

        <div className="experience">
            <p>{legend.description[language]}</p>
            <div>
                {Object.keys(pl_images).map((pl) => {
                    return (
                        <span key={pl}>
                                <img src={pl_images[pl].src} alt={pl_images[pl].alt} width={40}/>
                                <p>{pl_images[pl].name}</p>
                            </span>
                    )
                })}
            </div>

            <a href={"./cv.pdf"} download>
                <button>
                    <i className="fas fa-download"></i>
                    {legend.download[language]}
                </button>
            </a>

        </div>

    )
}