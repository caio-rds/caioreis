import './style.css'
import Lottie from "react-lottie"
import animationData from "../../animations/anim.json"

export default function Home({language, setArea}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const react_url = "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"

    const legend = {
        explain: {
            'en-US': `The idea of this site is pretty simple, introduce myself and my work.`,
            'pt-BR': 'A ideia deste site é bem simples, me apresentar e apresentar meu trabalho.'
        },
        hi: {
            'en-US': 'Hi, my name is',
            'pt-BR': 'Olá, meu nome é'
        },
        about: {
            'en-US': 'See more about me',
            'pt-BR': 'Veja mais sobre mim'
        },
        download: {
            'en-US': "Download my CV",
            'pt-BR': "Baixe meu currículo"
        },
        comment: {
            'en-US': "This site is made with react, you can see the code on my github.",
            'pt-BR': "Este site é feito com react, você pode ver o código no meu github."
        },
        role: {
            'en-US': 'Developer & Software Engineer',
            'pt-BR': 'Desenvolvedor & Engenheiro de Software'

        }
    }
    return (
        <div className="home">
            <div>
                <span>
                    {legend.hi[language]}
                    <name>Caio Reis</name>
                    <role>{legend.role[language]}</role>
                </span>
                <h3>{legend.explain[language]}</h3>
                <explainer>
                    <img src={react_url} alt="React" width={50}/>
                    {legend.comment[language]}
                </explainer>
                <buttons>
                    <button onClick={() => setArea('about')}>
                        <i className="fas fa-user"></i>
                        {legend.about[language]}
                    </button>
                    <a href={"./cv.pdf"} download>
                        <button>
                            <i className="fas fa-download"></i>
                            {legend.download[language]}
                        </button>
                    </a>
                </buttons>
            </div>
            <Lottie options={defaultOptions} height={400} width={400} isPaused={false} isStopped={false}/>

        </div>
    )
}