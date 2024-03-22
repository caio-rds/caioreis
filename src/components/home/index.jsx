import './style.css'

export default function Home({language}) {
    const legend = {
        first : {
            'en-US': 'Welcome to the home page of this simple app.',
            'pt-BR': 'Bem-vindo à página inicial deste simples site.'
        },
        second: {
            'en-US': 'The idea of this site is pretty simple, introduce myself and my work. (including this site)',
            'pt-BR': 'A ideia deste site é bem simples, me apresentar e apresentar meu trabalho. (incluindo esse site)'

        }
    }
    return (
        <div className="home">
            <h2>{legend.first[language]}</h2>
            <h3>{legend.second[language]}</h3>
        </div>
    )
}