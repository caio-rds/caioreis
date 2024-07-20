import './style.css'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import discord from '../../assets/discord.png'
import mail from '../../assets/mail.png'
import {Box, Button} from "@mui/material";
import animationData from "../../animations/contact.json";
import Lottie from "react-lottie"

export default function Contact({language}) {
    const legend = {
        title: {
            'en-US': "Contact",
            'pt-BR': "Contato"
        },
        description: {
            'en-US': "Options to get in touch with me",
            'pt-BR': "Opções para entrar em contato comigo"
        },

    }
    const socials = {
        linkedin: {
            icon: linkedin,
            label: 'LinkedIn',
            handlerClick: () => window.open('https://www.linkedin.com/in/caio-reis-04224a20a/', '_blank')
        },
        github: {
            icon: github,
            label: 'GitHub',
            handlerClick: () => window.open('https://www.github.com/caio-rds', '_blank'),
        },
        discord: {
            icon: discord,
            label: 'Discord',
            handlerClick: () => window.navigator.clipboard.writeText('caiords'),
        },
        email: {
            icon: mail,
            label: 'Email',
            handlerClick: () => window.open('mailto:caiodtn@gmail.com'),
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

    return (
        <Box id='contact' sx={{
            height: '90%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}> 
            <Box sx={{display: 'flex'}}>
                <Box>
                    <h1>{legend.title[language]}</h1>
                    <p>{legend.description[language]}</p>
                </Box>
                <Lottie
                    options={defaultOptions}
                    height={140}
                    width={140}
                    isPaused={false}
                    isStopped={false}/>
            </Box>
            
            <Box>
                {
                    Object.keys(socials).map((key) => {
                        return (
                            <Button
                                variant="contained"
                                key={key}
                                sx={{justifyContent:"flex-start", alignItems:"center", display:"flex", margin: 1, minWidth: '200px'}}
                                startIcon={<img alt={key} src={socials[key].icon} width={30}/>}
                                onClick={socials[key].handlerClick}>
                                    {socials[key].label}
                            </Button>
                        )
                    })
                }
            </Box>
        </Box>
    )
}