import { LuCake } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { IoSchoolOutline } from "react-icons/io5";
import { Box, Typography } from "@mui/material";

const birthdate = () => {
    return Math.floor(
        (new Date() - new Date('1996-06-14')) / (1000 * 60 * 60 * 24 * 365.25)
    );
}

const university_period = () => {
    return Math.round((Math.floor((new Date() - new Date('2023-01-01')) / (1000 * 60 * 60 * 24)) / 30) / 6)
}

const personal_info = {
    birthdate: {
        'en-US': birthdate() + ' years',
        'pt-BR': birthdate() + ' anos'
    },
    period: {
        'en-US': `${university_period()}º Sem., Software Engeneer`,
        'pt-BR': `${university_period()}º Sem., Engenheiro de Software`
    }
}

export default function Infos({language}) {
    return (
        <Box display='flex' flexDirection={{xs: 'column', md: 'row'}} justifyContent='center' alignItems='center' marginTop={'12px'} gap={{xs: '5px', md: '10px'}} >
            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' gap={{xs: '5px', md: '10px'}} width={{xs: '100%', md: 'fit-content'}}>
                <Box className={'info'} width='fit-content'>
                    <LuCake size={20} />
                    <Typography variant={'body2'}>{personal_info.birthdate[language]}</Typography>
                </Box>
                <Box className={'info'} width='fit-content'>
                    <CiLocationOn size={20} />
                    <Typography variant={'body2'}>Rio de Janeiro, RJ</Typography>
                </Box>
            </Box>
            <Box className={'info'} width='fit-content' paddingLeft={'16px'} paddingRight={'16px'}>
                <IoSchoolOutline size={20} />
                <Typography variant={'body2'}>{personal_info.period[language]}</Typography>
            </Box>
        </Box>
    )
}