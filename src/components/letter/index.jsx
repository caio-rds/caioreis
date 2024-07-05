import './style.css'
import Lottie from "react-lottie"
import animationData from "../../animations/anim.json"
import {Box} from "@mui/material";


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
        if (window.innerWidth <= 768) return 150
        if (window.innerWidth <= 1366) return 200
        return 300
    }

    const isMobile = () => {
        return window.innerWidth <= 768
    }

    const legend = {
        hi: {
            'en-US': 'Hi, I\'m Caio Reis',
            'pt-BR': 'Olá, eu sou Caio Reis'
        },
        letter_one: {
            'en-US': `With a results-oriented approach, I am always looking for new ways to apply and expand my knowledge.
             My goal is to contribute to challenging projects that make a difference and add value through innovative solutions.`,
            'pt-BR': `Com uma abordagem orientada a resultados, estou sempre buscando novas maneiras de aplicar e expandir meus conhecimentos.
             Meu objetivo é contribuir para projetos desafiadores que façam a diferença e agregar valor através de soluções inovadoras.`
        },
        letter_two: {
            'en-US': `In my portfolio, you will find a selection of projects that reflect my commitment to excellence and my continuous evolution as a developer.`,
            'pt-BR': `No meu portfólio, você encontrará uma seleção de projetos que refletem meu compromisso com a 
            excelência e minha evolução contínua como desenvolvedor.`
        },
        letter_three: {
            'pt-BR': `Sinta-se à vontade para explorar meu trabalho e entrar em contato se tiver qualquer pergunta ou interesse em colaborar!`,
            'en-US': `Feel free to explore my work and get in touch if you have any questions or interest in collaborating!`
        }
    }
    return (
        isMobile() ?
            <div className={'letter'}>
            <span>
                <h1>{legend.hi[language]}</h1>
                <p>{legend.letter_one[language]}</p>
                <Box display='flex' flexDirection='row' alignItems={'center'}>
                    <Box>
                        <p>{legend.letter_two[language]}</p>
                        <p>{legend.letter_three[language]}</p>
                    </Box>

                     <Lottie options={defaultOptions} height={imgSize()} width={imgSize()} isPaused={false}
                             isStopped={false}/>
                </Box>
            </span>
            </div> :
            <div className={'letter'}>
            <span>
                <h1>{legend.hi[language]}</h1>
                <p>{legend.letter_one[language]}</p>
                <p>{legend.letter_two[language]}</p>
                <p>{legend.letter_three[language]}</p>
            </span>
                <Lottie options={defaultOptions} height={imgSize()} width={imgSize()} isPaused={false}
                        isStopped={false}/>
            </div>
    )
}