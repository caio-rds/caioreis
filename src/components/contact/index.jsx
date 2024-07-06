import './style.css'
import linkedin from '../../assets/linkedin.png'
import twitch from '../../assets/twitch.png'
import github from '../../assets/github.png'
import youtube from '../../assets/youtube.png'
import discord from '../../assets/discord.png'
import mail from '../../assets/mail.png'
import {Button} from "@mui/material";

export default function Contact({language}) {
    const legend = {
        title: {
            'en-US': "Contact",
            'pt-BR': "Contato"
        },
        description: {
            'en-US': "Here is a list of my contact information:",
            'pt-BR': "Aqui está uma lista com as minhas informações de contato:"
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

    return (
        <div className="contact">
            <h1>{legend.title[language]}</h1>
            <p>{legend.description[language]}</p>
            <div>
                {
                    Object.keys(socials).map((key) => {
                        return (
                            <Button
                                variant="contained"
                                key={key}
                                sx={{justifyContent:"center", alignItems:"center", display:"flex", margin: 1}}
                                startIcon={<img alt={key} src={socials[key].icon} width={30}/>}
                                onClick={socials[key].handlerClick}>
                                    {socials[key].label}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}