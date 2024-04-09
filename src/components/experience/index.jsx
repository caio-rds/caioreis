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
    // react: {
    //     name: 'React',
    //     src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    //     alt: 'React'
    // },
    golang: {
        name: 'Golang',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
        alt: 'Golang'
    },
    // lua: {
    //     name: 'Lua',
    //     src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg",
    //     alt: 'Lua'
    // },
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

const legend = {
    title: {
        'en-US': "Experience",
        'pt-BR': "Experiência"
    },
    description: {
        'en-US': "Main Technologies",
        'pt-BR': "Principais Tecnologias"
    },
    projects: {
        'en-US': "See Projects",
        'pt-BR': "Ver Projetos"
    }
}

export default function Experience({language}) {
    return (
        <div className="experience">
            <label>{legend.description[language]}</label>
            <content>
                {Object.keys(pl_images).map((pl) => {
                    return (
                        <language key={pl}>
                            <img src={pl_images[pl].src} alt={pl_images[pl].alt}/>
                            <p>{pl_images[pl].name}</p>
                        </language>
                    )
                })}
            </content>

        </div>
    )
}