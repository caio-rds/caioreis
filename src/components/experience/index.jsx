import {Box, Typography} from "@mui/material";

const pl_images = {
    python: {
        name: 'Python',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",

    },
    javascript: {
        name: 'JavaScript',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",

    },
    react: {
        name: 'React',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    },
    golang: {
        name: 'Golang',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
    },
    lua: {
        name: 'Lua',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg",
    },
    mysql: {
        name: 'MySQL',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    },
    mongodb: {
        name: 'MongoDB',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    },
    docker: {
        name: 'Docker',
        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
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

export default function Experience() {
    return (
        <Box sx={{
            display: 'flex',
            minWidth: {xs: '97%', md: '100%'},
            maxWidth: {xs: '97%', md: '100%'},
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '8px',
            paddingBottom: '4px',
            flexWrap: 'wrap',
            columnGap: 3,
            backgroundColor: '#1e2126',
            borderRadius: {xs: '0 0 8px 8px', md: '0 0 0 8px'},
        }}>
            {Object.keys(pl_images).map((pl) => {
                return (
                    <div>
                        <img width={38} src={pl_images[pl].src} alt={pl_images[pl].name}/>
                        <Typography variant={'body1'} sx={{color: 'white'}}>{pl_images[pl].name}</Typography>
                    </div>
                )
            })}
        </Box>
    )
}