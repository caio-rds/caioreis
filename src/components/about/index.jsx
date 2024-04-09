// noinspection JSValidateTypes

import './style.css'
import Hobbies from "../hobbies";
import me from '../../assets/me.png'
import state from '../../assets/state.png'
import country from '../../assets/country.png'
import name from '../../assets/name.png'
import age from '../../assets/age.png'
import Experience from "../experience";
import Letter from "../letter";


const birthdate = () => {
    return Math.floor(
        (new Date() - new Date('1996-06-14')) / (1000 * 60 * 60 * 24 * 365.25)
    );
}


const legend = {
    personal_info: {
        name: {
            'en-US': {icon: name, value: 'Caio Reis'},
            'pt-BR': {icon: name, value: 'Caio Reis'}
        },
        birthdate: {
            'en-US': {icon: age, value: birthdate() + ' years'},
            'pt-BR': {icon: age, value: birthdate() + ' anos'}
        },
        location: {
            'en-US': {icon: state, value: 'Rio de Janeiro, RJ'},
            'pt-BR': {icon: state, value: 'Rio de Janeiro, RJ'}
        },
        country: {
            'en-US': {icon: country, value: 'Brazil'},
            'pt-BR': {icon: country, value: 'Brasil'}
        },
    },
    subtitle: {
        'en-US': "Personal Information",
        'pt-BR': "Informações Pessoais"
    }
}


export default function About({language}) {

    return (
        <div className="about">
            <div className={"photoInfo"}>
                <img className={'profilePhoto'} src={me} alt={'profile'}/>
                <span>
                    <labelTitle>{legend.subtitle[language]}:</labelTitle>
                    <labelContent>
                        {Object.keys(legend.personal_info).map((key) => {
                            return (
                                <inlineContent key={key}>
                                    <img src={legend.personal_info[key][language].icon} alt={key}/>
                                    {legend.personal_info[key][language].value}
                                </inlineContent>
                            )
                        })}
                    </labelContent>
                </span>
                <Experience language={language}/>
            </div>

            <Letter language={language}/>
            <Hobbies language={language}/>
        </div>
    )
}