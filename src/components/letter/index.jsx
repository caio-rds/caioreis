import './style.css'

import {Box} from "@mui/material";


export default function Letter({language}) {


    const legend = {

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: {xs: '92%', md: '100%'},
                minHeight: {xs: '49%'},
                maxHeight: {xs: '49%'},
                padding: {xs: '10px', md: '20px'},
                backgroundColor: '#1e2126',
                borderRadius: {xs: '0px', md: '8px 8px 0 0 '},
                justifyContent: 'center',
                rowGap: {xs: '2px', md: '20px'},
            }}>
            <p>{legend.letter_one[language]}</p>
            <p>{legend.letter_two[language]}</p>
            <p>{legend.letter_three[language]}</p>
        </Box>
    )
}