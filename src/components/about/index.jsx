import me from '../../assets/me.png'
import {Avatar, Box, Typography} from "@mui/material";


const content = {
    hello: {
        'en-US': 'Hello, I am Caio Reis',
        'pt-BR': 'Olá, eu sou Caio Reis'
    },
    role: {
        'en-US': 'Software Engineer',
        'pt-BR': 'Engenheiro de Software'
    },
}

const styles ={
    about: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 2,
        padding: '10px',
        width: {xs: '92%', md: '350px'},
        maxWidth: {xs: '92%', md: '350px'}
    },
    avatar: {
        width: {xs: 150, md: 300},
        height: {xs: 150, md: 300}
    }
}


export default function About({language}) {

    return (
        <Box sx={styles.about}>
            <Avatar alt={'eu'} src={me} sx={styles.avatar}/>
            <Box sx={{padding: '5px', justifyContent: 'left', alignItems: 'left', rowGap: '2px'}}
            display='flex' flexDirection={'column'}>
                <Typography variant={'h4'} sx={{color: 'white', textAlign: 'center'}}>
                    {content.hello[language]}
                </Typography>
                <Typography variant={'body1'} sx={{color: 'text.secondary', textAlign: 'center'}}>
                    {content.role[language]}
                </Typography>
            </Box>
        </Box>
    )
}