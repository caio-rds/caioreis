import './style.css'
import Hobbies from "../hobbies";

const birthdate = () => {
    return Math.floor(
        (new Date() - new Date('1996-06-14')) / (1000 * 60 * 60 * 24 * 365.25)
    );
}



const personal_infos = {
    name: {
        'en-US': { label: 'Name', value: 'Caio Reis' },
        'pt-BR': { label: 'Nome', value: 'Caio Reis' }
    },
    birthdate: {
        'en-US': { label: 'Age', value: birthdate() + ' years'},
        'pt-BR': { label: 'Idade', value: birthdate() + ' anos'}
    },
    location: {
        'en-US': { label: 'Localization', value: 'Rio de Janeiro, RJ' },
        'pt-BR': { label: 'Localização', value: 'Rio de Janeiro, RJ'}
    },
    country: {
        'en-US': { label: 'Country', value: 'Brazil'},
        'pt-BR': { label: 'País', value: 'Brasil'}
    }
}

const legend = {
    title: {
        'en-US': "About",
        'pt-BR': "Sobre"
    },
    description: {
        'en-US': 'The idea of this site is pretty simple, introduce myself and my work. (including this site)',
        'pt-BR': 'A ideia deste site é bem simples, me apresentar e apresentar meu trabalho. (incluindo esse site)'
    },
    subtitle: {
        'en-US': "Personal Information",
        'pt-BR': "Informações Pessoais"
    },
    letter: {
        'en-US': `Hello, I'm Caio Reis, a full stack developer, passionate about technology and programming. I'm always looking for new challenges and learning new things. I'm currently working with React, Node.js, and MongoDB. I'm also a fan of Linux and open source.`,
        'pt-BR': `Olá, eu sou Caio Reis, um desenvolvedor full stack, apaixonado por tecnologia e programação. Estou sempre em busca de novos desafios e aprendendo coisas novas. Atualmente estou trabalhando com React, Node.js e MongoDB. Também sou fã de Linux e open source.`
    }
}

export default function About({language}) {

    return (
        <div className={"displayAbout"}>
            <div className="about">
                <h1>{legend.subtitle[language]}</h1>
                <div className={"photoInfo"}>
                    <img src={'./me.png'} alt={'profile'} width={230} height={230}/>
                    <span>
                        <inline>
                            <div>
                                <labelTitle>{personal_infos.name[language].label}:</labelTitle>
                                <labelContent>{personal_infos.name[language].value}</labelContent>
                            </div>
                            <div>
                                <labelTitle>{personal_infos.birthdate[language].label}:</labelTitle>
                                <labelContent>{personal_infos.birthdate[language].value}</labelContent>
                            </div>
                        </inline>
                        <div>
                            <labelTitle>{personal_infos.location[language].label}:</labelTitle>
                            <labelContent style={{width: '97%'}}>
                                <div>
                                    <inlineContent>
                                        <img src={'./state.png'} width={20} alt={'Location'}/>
                                        {personal_infos.location[language].value}
                                    </inlineContent>
                                    <inlineContent>
                                        <img src={'./country.png'} width={20} alt={'Country'}/>
                                        {personal_infos.country[language].value}
                                    </inlineContent>
                                </div>
                            </labelContent>
                        </div>
                    </span>
                </div>
                <h4>{legend.letter[language]}</h4>
            </div>
            <div className="about">
                <Hobbies language={language}/>
            </div>
        </div>
    )
}