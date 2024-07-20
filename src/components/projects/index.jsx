import './style.css'
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import animationData from "../../animations/anim.json";
import Lottie from "react-lottie"

export default function Projects({ language }) {


    const legend = {
        see_project: {
            'en-US': "See project in GitHub",
            'pt-BR': "Ver projeto no GitHub"

        },
        loading: {
            'en-US': "Loading...",
            'pt-BR': "Carregando..."

        },
        title: {
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

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
            projects.length === 0 ? (
                <span className={'loader'}>{legend.loading[language]}</span>
            ) : (                
                
                <Box id='projects' 
                    sx={{width: {xs: '96%', md: '50%'}, height: {xs: '80vh', md: '80vh'}, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#1e2126',
                        borderRadius: '8px 8px 0 0',
                        padding: '10px',
                        rowGap: 2
                    }}>
                        <Box display='flex'
                             justifyContent='center'
                             columnGap={1}
                             sx={{alignItems: 'center'}}
                        >
                            <Typography variant={'h2'} sx={{
                                fontSize: {xs: '3rem', md: '4rem'},
                                height: {xs: '100%'},
                                width: {xs: '50%', md:'100%'},
                                marginLeft: {xs: '10px', md: '0'},
                                borderRadius: '8px 0 0 8px'
                            }}>
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
                    {projects.map((project) => (
                        <Accordion key={project.id} sx={{width: '100%'}} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography startIcon={"https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg"}>{project.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{project.description}</Typography>
                                <Button onClick={() => window.open(project.svn_url, '_blank')}>
                                    {legend.see_project[language]}
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
                
        )} 
        </Box>
    )
}