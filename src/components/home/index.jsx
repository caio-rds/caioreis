import Experience from "../experience";
import Letter from "../letter";
import About from "../about";
import {Box, Typography} from "@mui/material";





export default function Home({language}) {

    const isMobile = () => {
        return window.innerWidth <= 768
    }
     const hi = {
         'en-US': 'Hello, I am Caio Reis',
         'pt-BR': 'Olá, eu sou Caio Reis'
     }


    return (
        <Box id='home' 
            sx={{justifyContent: {xs: 'flex-start', md: 'flex-start'}, alignItems: 'center', border: '1px solid red',height: '100%', display: 'flex', flexDirection: 'column'}}
             display={'flex'} rowGap={'5px'}>            
            {
                isMobile() ?
                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant={'h1'} sx={{
                            marginTop: '5px',
                            fontSize: {xs: '2.2rem', md: '3.5rem',
                            backgroundColor: '#1e2126',
                            padding: '10px',
                            width: '92%',
                            borderRadius: '8px 8px 0 0'
                        }}
                    }>
                            {hi[language]}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '5px', rowGap: '5px', alignItems: 'center'}}>
                        <About language={language}/>
                        <Letter language={language}/>
                        <Experience language={language}/>
                    </Box>
                </Box>
                :
                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', rowGap: '5px', marginTop: '100px', width: '1050px'}}>
                    <Typography variant={'h1'} sx={{                                
                        fontSize: {xs: '2.2rem', md: '3.5rem'},
                        backgroundColor: '#1e2126',
                        padding: '0px',
                        width: '99.7%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100px',
                        borderRadius: '8px 8px 0 0'
                    }}>
                            {hi[language]}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center', 
                            columnGap: '5px',
                            width: '100%',
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '5px', maxWidth: '64%', height: '100%'}}>
                            <Letter language={language}/>
                            <Experience />
                        </Box>
                        <About language={language}/>
                    </Box>
                </Box>
            }

        </Box>
    )
}