import './style.css'

import Experience from "../experience";
import Letter from "../letter";
import About from "../about";
import {Box, Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';



export default function Home({language}) {

    const DownloadCv = () => {
        const link = document.createElement('a');
        const pdf = "./cv.pdf"
        link.href = pdf;
        link.download = pdf;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Box className={'home'} sx={{justifyContent: {xs: 'flex-start'}, alignItems: {xs: 'center'}, border: '1px solid red'}}>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, columnGap: '5px', rowGap: '5px'}}>
                <About language={language}/>
                <Experience language={language}/>
            </Box>
            <Letter language={language}/>
            <Button onClick={DownloadCv} variant="outlined" sx={{style: {maxWidth: '200px'}}}
                    startIcon={<DownloadIcon />} >
                Download CV
            </Button>
        </Box>
    )
}