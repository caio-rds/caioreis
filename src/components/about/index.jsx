import './style.css'
import Hobbies from "../hobbies";
import me from '../../assets/me.png'
import state from '../../assets/state.png'
import country from '../../assets/country.png'
import name from '../../assets/name.png'
import age from '../../assets/age.png'
import Experience from "../experience";


const birthdate = () => {
    return Math.floor(
        (new Date() - new Date('1996-06-14')) / (1000 * 60 * 60 * 24 * 365.25)
    );
}



const personal_infos = {
    name: {
        'en-US': { icon: name, value: 'Caio Reis' },
        'pt-BR': { icon: name, value: 'Caio Reis' }
    },
    birthdate: {
        'en-US': { icon: age, value: birthdate() + ' years'},
        'pt-BR': { icon: age, value: birthdate() + ' anos'}
    },
    location: {
        'en-US': { icon: state, value: 'Rio de Janeiro, RJ' },
        'pt-BR': { icon: state, value: 'Rio de Janeiro, RJ'}
    },
    country: {
        'en-US': { icon: country, value: 'Brazil'},
        'pt-BR': { icon: country, value: 'Brasil'}
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
        'pt-BR': `Olá, eu sou Caio Reis, um desenvolvedor (quase) full stack, apaixonado por tecnologia e programação.
         Estou sempre em busca de novos desafios e aprendendo coisas novas.
         Meu foco atual é em React, Node.js e MongoDB. Também sou um entusiasta de Linux e software livre.`
    }
}

export default function About({language}) {

    return (
        <div className={"displayAbout"}>
            <div className="about" style={{maxWidth: "46%", height: "61.5%"}}>
                <div className={"photoInfo"}>
                    <img src={me} alt={'profile'} width={210} height={220}/>
                    <span>
                        <labelTitle>{legend.subtitle[language]}:</labelTitle>
                        <labelContent>
                                {
                                    Object.keys(personal_infos).map((key) => {
                                        return (
                                            <inlineContent key={key}>
                                                <img src={personal_infos[key][language].icon} width={20} alt={key}/>
                                                {personal_infos[key][language].value}
                                            </inlineContent>
                                        )
                                    })
                                }
                        </labelContent>
                    </span>
                    <span>
                        <labelTitle>{legend.title[language]}:</labelTitle>
                        <labelContent style={{textAlign: "justify", height: "164px"}}>
                            {legend.letter[language]}
                        </labelContent>
                    </span>
                </div>

                <Experience language={language}/>
            </div>
            <div className="about">
                <Hobbies language={language}/>
            </div>
        </div>
    )
}