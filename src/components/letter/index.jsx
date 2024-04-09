import './style.css'

export default function Letter({language}) {
    const legend = {
        letter: {
            'en-US': `Hello, I'm Caio Reis, a full stack developer, passionate about technology and programming. I'm always looking for new challenges and learning new things. I'm currently working with React, Node.js, and MongoDB. I'm also a fan of Linux and open source.`,
            'pt-BR': `Olá, eu sou Caio Reis, um desenvolvedor (quase) full stack, apaixonado por tecnologia e programação. Estou sempre em busca de novos desafios e aprendendo coisas novas. Meu foco atual é em React, Node.js e MongoDB. Também sou um entusiasta de Linux e software livre.`
        },
        title: {
            'en-US': "About",
            'pt-BR': "Sobre"
        },
    }
    return (
        <div className={'letter'}>
            <label>{legend.title[language]}</label>
            <content style={{textAlign: "justify"}}>
                {legend.letter[language]}
            </content>
        </div>
    )
}