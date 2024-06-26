import './style.css'
import {useEffect, useState} from "react";
import github from '../../assets/github.png'

export default function Projects({language}) {
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
                        name: project.name,
                        full_name: project.full_name,
                        language: project.language,
                        description: project.description,
                        svn_url: project.svn_url,
                        icon: `https://raw.githubusercontent.com/devicons/devicon/master/icons/${project.language.toLowerCase()}/${project.language.toLowerCase()}-original.svg`
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
        projects.length === 0 ? <span className={'loader'}>{legend.loading[language]}</span> :
        <div className={"projects"}>
            {projects.map((project, index) => {
                    return (
                        <div key={index}>
                            <span>
                                <h3>{project.name}</h3>
                                <img src={project.icon} alt={project.language} />
                            </ span>
                            <p>{project.description}</p>
                            <button onClick={() => window.open(project.svn_url, '_blank')}>
                                <img src={github} alt="GitHub" width={25}/>
                                {legend.see_project[language]}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}