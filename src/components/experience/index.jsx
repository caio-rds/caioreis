import './style.css'
import {Box} from "@mui/material";

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

// const legend = {
//     title: {
//         'en-US': "Experience",
//         'pt-BR': "Experiência"
//     },
//     description: {
//         'en-US': "Main Technologies",
//         'pt-BR': "Principais Tecnologias"
//     },
// }

export default function Experience({language}) {
    return (
        <Box sx={{
            display: 'flex',
            maxWidth: {xs: '97%', md: '100%'},
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '8px',
            flexWrap: 'wrap',
            columnGap: 3,
            backgroundColor: '#1e2126',
            borderRadius: '0 0 8px 8px'
        }}>
            {Object.keys(pl_images).map((pl) => {
                return (
                    <div>
                        <img width={38} src={pl_images[pl].src} alt={pl_images[pl].alt}/>
                    </div>
                )
            })}
        </Box>
    )
}