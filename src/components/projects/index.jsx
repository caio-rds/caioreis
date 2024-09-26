import './style.css'
import { useEffect, useState } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Description as DescriptionIcon } from "@mui/icons-material";
import { FaPython, FaReact, FaJsSquare, FaDocker } from "react-icons/fa";
import { SiGoland, SiLua  } from "react-icons/si";
import animationData from "../../animations/anim.json";
import Lottie from "react-lottie"

const style = {
    projects: {
        width: {xs: '96%', md: '100%'},
        height: {xs: '80vh', md: '80vh'},
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e2126',
        borderRadius: '8px 8px 0 0',
        padding: '10px',
        rowGap: 2
    },
    title: {
        fontSize: {xs: '3rem', md: '4rem'},
        height: {xs: '100%'},
        width: {xs: '50%', md:'100%'},
        marginLeft: {xs: '10px', md: '0'},
        borderRadius: '8px 0 0 8px'
    },
    title_modal: {
        display: 'flex',
        columnGap: 2,
        alignItems: 'center',
    }
}

const icons = {
    Python: <FaPython size={24} color={'#306998'}/>,
    JavaScript: <FaJsSquare size={24} color={'#f0db4f'}/>,
    Go: <SiGoland size={24} color={'#00add8'}/>,
    Lua: <SiLua size={24} color={'#2c2d72'}/>,
    React: <FaReact size={24} color={'#61dbfb'}/>,
    Docker: <FaDocker size={24} color={'#0db7ed'}/>,        
}


export default function Projects({ language }) {

    const [modalOpen, setModalOpen] = useState(false)

    const legend = {
        see_project: {
            'en-US': "See in GitHub",
            'pt-BR': "Ver no GitHub"

        },
        loading: {
            'en-US': "Loading...",
            'pt-BR': "Carregando..."

        },
        title: {
            'en-US': "Projects",
            'pt-BR': "Projetos"
        },
        close: {
            'en-US': "Close",
            'pt-BR': "Fechar"
        },
        projects: {
            'en-US': "Projects",
            'pt-BR': "Projetos"
        }
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
 

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const request = async () => {
            const response = await fetch('https://api.github.com/users/caio-rds/repos')
            const data = await response.json()
            let result = []
            data.forEach((project) => {
                if (project.language == null) {
                    project.language = 'Null'
                }
                if (project.name !== 'caio-rds') {
                    result.push({
                        id: result.length + 1,
                        name: project.name,
                        full_name: project.full_name,
                        language: project.language,
                        description: project.description,
                        svn_url: project.svn_url
                    })
                }
            });
            setTimeout(() => {
                setProjects(result)
            }, 2000)
        }
        request().then()
    }, []);


    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {   
            modalOpen ? (
                projects.length === 0 ? (
                    <span className={'loader'}>{legend.loading[language]}</span>
                ) : (
                <Box sx={style.projects}>
                    <Box sx={style.header}>
                        <Box display='flex' justifyContent='center' columnGap={1} sx={{alignItems: 'center'}}>
                            <Typography variant={'h4'} sx={style.title}>                            
                                {legend.title[language]}
                            </Typography>
                            <Lottie
                                options={defaultOptions}
                                height={140}
                                width={180}
                                isPaused={false}
                                isStopped={false}/>
                        </Box>
                    </Box>
                    
                    <List>
                    {projects.map((project, index) => (
                        <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between", padding: "10px 0", flexDirection: {xs: 'column', md: 'row'}}}>
                            <Box sx={{ display: "flex", alignItems: "center", width:'60%'}}>
                                <ListItemIcon>{ icons[project.language] || <DescriptionIcon /> }</ListItemIcon>
                                <ListItemText primary={project.name} secondary={project.description} primaryTypographyProps={{variant: 'h6', sx:{color: '#fff'}}} secondaryTypographyProps={{ variant: 'body2' }} />
                            </Box>
                            <Button variant="contained" href={project.link} target="_blank">{legend.see_project[language]}</Button>
                        </ListItem>
                    ))}
                    </List>

                    
                    <Button variant={'contained'} onClick={() => setModalOpen(false)} sx={{marginTop: '16px'}} width='150px'>{legend.close[language]}</Button>
                </Box>)
        ) : <Button variant={'contained'} onClick={() => setModalOpen(true)} sx={{marginTop: '16px'}} width='150px'>{legend.projects[language]}</Button>}
        </Box>
    )
}