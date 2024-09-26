import {Box, Typography} from "@mui/material";


export default function Letter({language}) {


    const legend = {
        letter_one: {
            'en-US': `With a results-oriented approach, I am always looking for new ways to apply and expand my knowledge.
             My goal is to contribute to challenging projects that make a difference and add value through innovative solutions.`,
            'pt-BR': `Com uma abordagem orientada a resultados, estou sempre buscando novas maneiras de aplicar e expandir meus conhecimentos.
             Meu objetivo é contribuir para projetos desafiadores que façam a diferença e agregar valor através de soluções inovadoras.`
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',                
                padding: {xs: '10px', md: '20px'},                          
                justifyContent: 'center',
                rowGap: '10px',
                width: {xs: '90%', md: '60%'},
            }}>
            <Typography variant={'subtitle1'}>{legend.letter_one[language]}</Typography>
        </Box>
    )
}