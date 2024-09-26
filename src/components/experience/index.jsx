import {Box, Button, Divider, Modal, Typography} from "@mui/material";
import { FaPython, FaReact, FaJsSquare, FaDocker } from "react-icons/fa";
import { SiGoland, SiLua, SiMongodb  } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { useState } from "react";
import { GoDatabase } from "react-icons/go";

const pl_images = {
    python: {
        name: 'Python',
        src: <FaPython size={32} color={'white'}/>,
        exp: {
            'en-US': 'Development of efficient scripts, RestAPI\'s and process automation.',
            'pt-BR': 'Desenvolvimento de scripts eficientes, RestAPI\'s e automação de processos.'
        }
    },
    javascript: {
        name: 'JavaScript',
        src: <FaJsSquare size={32} color={'white'}/>,
        exp: {
            'en-US': 'Development of interactive features for the web.',
            'pt-BR': 'Desenvolvimento de funcionalidades interativas para a web.'
        }
    },
    react: {
        name: 'React',
        src: <FaReact size={32} color={'white'}/>,
        exp: {
            'en-US': 'Development of web applications with dynamic and responsive user interfaces.',
            'pt-BR': 'Desenvolvimento de aplicações web com interfaces de usuário dinâmicas e responsivas.'
        }
    },
    golang: {
        name: 'Golang',
        src: <SiGoland size={32} color={'white'}/>,
        exp: {
            'en-US': 'Development of robust applications and high performance microservices.',
            'pt-BR': 'Desenvolvimento de aplicações robustas e microserviços de alta performance.'
        }
    },
    lua: {
        name: 'Lua',
        src: <SiLua size={32} color={'white'}/>,
        exp: {
            'en-US': 'Development of scripts, game logic and development in embedded systems.',
            'pt-BR': 'Desenvolvimento de scripts, lógica de jogos  desenvolvimento em sistemas embarcados.'
        }
    },
    database: {
        name: 'Databases',
        src: <GoDatabase size={32} color={'white'}/>,
        exp: {
            'en-US': 
            <Box marginTop={'20px'}>
                <Box display='flex' columnGap={'10px'} alignItems={'center'}>
                    <TbSql size={48} color={'white'}/>
                    <Typography variant={'h6'}>Relational Databases</Typography>
                </Box>                
                
                <Typography variant={'body2'}  marginTop={'20px'} marginBottom={'20px'}>Development of relational databases and data management with <b>PostgreSQL, MySQL and SQLite.</b></Typography>
                
                <Box display='flex' columnGap={'10px'} alignItems={'center'}>
                    <SiMongodb size={42} color={'white'}/>
                    <Typography variant={'h6'}>NoSQL Databases</Typography>
                </Box>                
                <Typography variant={'body2'} marginTop={'20px'} marginBottom={'20px'}>Development of applications with high volume of unstructured/standardized data and high performance requirements with <b>MongoDB.</b></Typography>
            </Box>,
            'pt-BR': 
            <Box marginTop={'20px'}>
                <Box display='flex' columnGap={'10px'} alignItems={'center'} paddingTop={'10px'} paddingBottom={'10px'}>
                    <TbSql size={48} color={'white'}/>
                    <Typography variant={'h6'}>Bancos de Dados Relacionais</Typography>
                </Box>                
                <Typography variant={'body2'} marginTop={'20px'} marginBottom={'20px'}>Desenvolvimento de bancos de dados relacionais e gerenciamento de dados com <b>PostgreSQL, MySQL e SQLite.</b></Typography>                
                <Box display='flex' columnGap={'10px'} alignItems={'center'}>
                    <SiMongodb size={42} color={'white'}/>
                    <Typography variant={'h6'}>Mongo DataBase</Typography>
                </Box>                
                <Typography variant={'body2'} marginTop={'20px'} marginBottom={'20px'}>Desenvolvimento de aplicações com alto volume de dados não estruturados/padronizados e requisitos de alta performance.</Typography>                
            </Box>
        }
    },
    docker: {
        name: 'Docker',
        src: <FaDocker size={32} color={'white'}/>,
        exp: {
            'en-US': 'Knowledge in containerization and creation of consistent development environments.',
            'pt-BR': 'Conhecimento em containerização e criação de ambientes de desenvolvimento consistentes.'
        }
    }

}

const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: '70%', md: '30%'},
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        color: 'white',
        rowGap: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 4
    },
    experience: {
        display: 'flex',
        marginTop: '48px',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '8px',
        paddingBottom: '4px',
        flexWrap: 'wrap',
        columnGap: {xs: '20px', md: '48px'},
    },
    divider: {
        width: {xs: '100%', md:'102%'},
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    button: {
        width: '150px',
        marginTop: '16px'
    }
  };

export default function Experience({language}) {

    const [openModal, setOpenModal] = useState(false)
    const [currentPl, setCurrentPl] = useState('')
    

    return (
        <Box sx={style.experience}>
            {Object.keys(pl_images).map((pl) => {
                return (
                    <Box style={{marginBottom: '6px'}}
                    onMouseEnter={(e) => e.target.style.outlineBottom = '1px solid #556cd6'}
                    onMouseLeave={(e) => e.target.style.outlineBottom = 'none'}
                    key={pl}
                    onClick={() => {setCurrentPl(pl); setOpenModal(true)}}>
                        {pl_images[pl].src}                        
                    </Box>
                )
            })}
            <Divider sx={style.divider}/>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>{
            pl_images[currentPl] != null ?
            <Box sx={style}>
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                    {pl_images[currentPl].src}
                    <Typography variant={'h4'}>{pl_images[currentPl].name}</Typography>
                </Box>
                <Divider sx={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}/>                            
                <Typography variant={'body2'}>{pl_images[currentPl].exp[language]}</Typography>
                <Button variant={'contained'} onClick={() => setOpenModal(false)} sx={style.divider}>{language === 'en-US' ? 'Close' : 'Fechar'}</Button>
            </Box> : <></>
            }</Modal>
        </Box>
    )
}