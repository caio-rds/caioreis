import { Box, IconButton, Typography } from "@mui/material";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function Footer({language}) {

    const footer_last = () => {
        return language === 'en-US' ? `Made with Love ❤️ and ReactJS - ${String.fromCharCode(0xA9)} Caio Reis - 2024` :
         `Feito com Amor ❤️ e ReactJS - ${String.fromCharCode(0xA9)} Caio Reis - 2024`
    }


    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: "12px", marginTop: {xs: '74px', md: '36px'}}}>
                <IconButton href="https://www.linkedin.com/in/caio-reis-04224a20a/" target="_blank" color="inherit">
                    <FaLinkedin size={30} />
                </IconButton>
                <IconButton href="https://github.com/caio-rds" target="_blank" color="inherit">
                    <FaGithub size={30} />
                </IconButton>
                <IconButton href="mailto:caiodtn@gmail.com" target="_blank" color="inherit">
                    <CiMail size={30} />
                </IconButton>
            </Box>
            <Typography variant={'body2'} sx={{color: 'rgba(255,255,255,.5)', paddingBottom: {xs: '12px', md: '0'}}}>{footer_last()}</Typography>
        </Box>
    );
}