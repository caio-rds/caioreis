import './style.css'
import Lottie from "react-lottie"
import animationData from "../../animations/anim.json"


export default function Letter({language}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const imgSize = () => {
        if (window.innerWidth <= 768) return 100
        if (window.innerWidth <= 1366) return 200
        return 300
    }




    const legend = {
        letter_one: {
            'en-US': `In addition to college subjects, my current focus is on React, Python and MongoDB.`,
            'pt-BR': `Além das disciplinas da faculdade, meu foco atual é em React, Python e MongoDB.`
        },
        letter_two: {
            'en-US': `The idea of this site is very simple, introduce myself, present my work, make my contacts available and of course,
             learn more about Front-End, I have always worked as a Back-End but I have learned new technologies.`,
            'pt-BR': `A ideia deste site é bem simples, me apresentar, apresentar meu trabalho, disponibilizar meus
            contatos e claro, aprender mais sobre Front-End, sempre atuei como Back-End porém tenho aprendidos novas
            tecnologias.`
        }
    }
    return (
        <div className={'letter'}>
            <span>
                <p>{legend.letter_one[language]}</p>
                <p>{legend.letter_two[language]}</p>
            </span>
            <Lottie options={defaultOptions} height={imgSize()} width={imgSize()} isPaused={false} isStopped={false}/>
        </div>
    )
}