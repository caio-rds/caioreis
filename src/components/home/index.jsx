import './style.css'

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
        <Box sx={{justifyContent: {xs: 'flex-start', md: 'center'}, alignItems: 'center', height: '90%', display: 'flex', flexDirection: 'column'}}
             display={'flex'} rowGap={'5px'}>
            <Typography variant={'h1'} sx={{marginTop: isMobile() ? '20px' : '0px', fontSize: {xs: '2.2rem', md: '3.5rem'}}}>{hi[language]}</Typography>
            {
                isMobile() ?
                    <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '5px', rowGap: '5px', alignItems: 'center'}}>
                        <About language={language}/>
                        <Letter language={language}/>
                        <Experience language={language}/>
                    </Box>
                    :
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid red',
                            maxWidth: 'fit-content',
                            columnGap: '10px'
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '5px', maxWidth: '40%', border: '1px solid green'}}>
                            <Letter language={language}/>
                            <Experience language={language}/>
                        </Box>
                        <About language={language}/>
                    </Box>

            }

        </Box>
    )
}