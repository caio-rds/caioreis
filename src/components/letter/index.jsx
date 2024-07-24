import {Box, Typography} from "@mui/material";


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
                minWidth: {xs: '92%', md: '94%'},
                maxWidth: {xs: '92%', md: '94%'},
                minHeight: {xs: '60%', md: '74%'},
                maxHeight: {xs: '60%', md: '74%'},
                padding: {xs: '10px', md: '20px'},
                backgroundColor: '#1e2126',                
                justifyContent: 'center',
                rowGap: {xs: '10px', md: '20px'},
            }}>
            <Typography variant={'subtitle1'}>{legend.letter_one[language]}</Typography>
            <Typography variant={'subtitle2'}>{legend.letter_two[language]}</Typography>
            <Typography variant={'body2'} sx={{marginTop: '20px'}}>{legend.letter_three[language]}</Typography>
        </Box>
    )
}