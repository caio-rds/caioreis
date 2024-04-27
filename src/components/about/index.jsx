// noinspection JSValidateTypes

import './style.css'
import me from '../../assets/me.png'
import country from '../../assets/country.png'
import age from '../../assets/age.png'
import graduation from '../../assets/graduation.png'
import stack from '../../assets/stack.png'
import state from '../../assets/state.png'
import diploma from '../../assets/diploma.png'


const birthdate = () => {
    return Math.floor(
        (new Date() - new Date('1996-06-14')) / (1000 * 60 * 60 * 24 * 365.25)
    );
}

const university_period = () => {
    return Math.round((Math.floor((new Date() - new Date('2023-01-01')) / (1000 * 60 * 60 * 24)) / 30) / 6)
}

const personal_info = {
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
    graduation: {
        'en-US': {icon: graduation, value: `Software Eng. `,},
        'pt-BR': {icon: graduation, value: `Eng. de Software `}
    },
    period: {
        'en-US': {icon: diploma, value: `${university_period()}º period`},
        'pt-BR': {icon: diploma, value: `${university_period()}º período`}
    },
    stack: {
        'en-US': {icon: stack, value: 'FullStack'},
        'pt-BR': {icon: stack, value: 'FullStack'}
    }
}


export default function About({language}) {

    return (
        <div className="about">

                <img className={'profilePhoto'} src={me} alt={'profile'}/>
                <span>

                    {Object.keys(personal_info).map((key) => {
                        return (
                            <content key={key}>
                                <img src={personal_info[key][language].icon} alt={key}/>
                                {personal_info[key][language].value}
                            </content>
                        )
                    })}
                </span>

        </div>
    )
}