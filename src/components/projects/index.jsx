import './style.css'
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";

export default function Projects({ language }) {
    const legend = {
        see_project: {
            'en-US': "See project in GitHub",
            'pt-BR': "Ver projeto no GitHub"

        },
        loading: {
            'en-US': "Loading...",
            'pt-BR': "Carregando..."

        }
    }

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
    //     { field: 'name', headerName: 'Name', width: 150, headerAlign: 'center' },
    //     {
    //         field: 'language', headerName: 'Language', width: 200, headerAlign: 'center', renderCell: (params) => {
    //             return (
    //                 <Box display='flex' alignItems='center' justifyContent='center' columnGap={1}>
    //                     <img
    //                         src={
    //                             `https://raw.githubusercontent.com/devicons/devicon/master/icons/${params.value.toLowerCase()}/${params.value.toLowerCase()}-original.svg`
    //                         } alt="github" height={25} width={25} className="github-icon" />
    //                     {params.value}
    //                 </Box>

    //             )
    //         }
    //     },
    //     { field: 'description', headerName: 'Description', width: 400, headerAlign: 'center' },
    // ];
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
        <Box sx={{justifyContent: 'center', alignItems: 'center'}}>

        {
            projects.length === 0 ? (
                <span className={'loader'}>{legend.loading[language]}</span>
            ) : (                
                
                <Box>
                    <h1>Projetos</h1>                    
                    {projects.map((project) => (
                    <Accordion key={project.id} sx={{width: '100%'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{project.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {project.description}
                            </Typography>
                            <Button onClick={() => window.open(project.svn_url, '_blank')}>{legend.see_project[language]}</Button>
                        </AccordionDetails>
                    </Accordion>
                ))}
                </Box>
                
        )} 
        </Box>
    )
}