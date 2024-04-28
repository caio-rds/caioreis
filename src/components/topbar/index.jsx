import './style.css'


export default function TopBar({newArea, setLanguage, language, area}) {
    const buttons = {
        home: {'en-US': 'Home', 'pt-BR': 'Início'},
        // about: {'en-US': 'About', 'pt-BR': 'Sobre'},
        projects: {'en-US': 'Projects', 'pt-BR': 'Projetos'},
        contact: {'en-US': 'Contact', 'pt-BR': 'Contato'}
    }
    const langs = {
        'en-US': 'EN',
        'pt-BR': 'PT'
    }

    const changeLanguage = (e) => {
        if (e.target.value === language) return
        localStorage.setItem('language', e.target.value)
        setLanguage(e.target.value)
    }

    const isMobile = window.innerWidth < 768


    const role = {
        'en-US': 'Developer & Software Engineer',
        'pt-BR': 'Desenvolvedor & Engenheiro de Software'
    }

    return (
        <div className="topbar">
            <span>
                <div>
                    <besideName>&lt;</besideName>
                    <name> Caio Reis </name>
                    <besideName>/&gt;</besideName>
                </div>
                <role>{role[language]}</role>
            </span>
            <div className={"buttons"}>
                {Object.keys(buttons).map((button, index) => (
                    <button key={index} value={button}
                            onClick={() => newArea(button)}
                            style={{
                                background: area === button ? '#1e2126' : '',
                                fontWeight: area === button ? 'bold' : '',
                                boxShadow: area === button ? '5px 5px 10px rgba(0, 0, 0, 0.5)' : ''
                            }}
                    >
                        {buttons[button][language]}
                    </button>
                ))}
            </div>
            <div className={"language"}>
                {
                    Object.keys(langs).map((lang, index) => (
                        <button key={index} value={lang} onClick={changeLanguage}
                                className={lang === language ? 'active' : ''}>
                            {langs[lang]}</button>
                    ))
                }
            </div>
        </div>
    )
}