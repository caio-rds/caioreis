import './style.css'
import linkedin from '../../assets/linkedin.png'
import twitch from '../../assets/twitch.png'
import github from '../../assets/github.png'
import youtube from '../../assets/youtube.png'
import discord from '../../assets/discord.png'
import mail from '../../assets/mail.png'

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
            handlerClick: () => window.open('https://www.linkedin.com/in/caio-reis-04224a20a/', '_blank'),
            mouseIn: (e) => e.target.style.backgroundColor = 'rgba(13, 85, 209,1)'
        },
        twitch: {
            icon: twitch,
            label: 'Twitch',
            handlerClick: () => window.open('https://www.twitch.tv/caiords_', '_blank'),
            mouseIn: (e) => e.target.style.backgroundColor = 'rgba(128, 5, 242,1)'
        },
        github: {
            icon: github,
            label: 'GitHub',
            handlerClick: () => window.open('https://www.github.com/caio-rds', '_blank'),
            mouseIn: (e) => e.target.style.backgroundColor = 'rgba(18, 18, 18,1)'
        },
        youtube: {
            icon: youtube,
            label: 'YouTube',
            handlerClick: () => window.open(
                'https://www.youtube.com/channel/UCShB4T_s3x20-ZVrZEdO5fw',
                '_blank'
            ),
            mouseIn: (e) => e.target.style.backgroundColor = 'rgba(230, 7, 7,1)'
        },
        discord: {
            icon: discord,
            label: 'Discord',
            handlerClick: () => window.navigator.clipboard.writeText('caiords'),
            mouseIn: (e) => e.target.style.backgroundColor = 'rgba(34, 117, 212,1)'
        },
        email: {
            icon: mail,
            label: 'Email',
            handlerClick: () => window.open('mailto:caiodtn@gmail.com'),
            mouseIn: (e) => e.target.style.backgroundColor = 'rgba(16, 201, 115,1)'
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
                            <button
                                key={key}
                                onClick={socials[key].handlerClick}
                                onMouseEnter={socials[key].mouseIn}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#1e2126'}>
                                    <img alt={key} src={socials[key].icon} width={30}/>
                                    {socials[key].label}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}