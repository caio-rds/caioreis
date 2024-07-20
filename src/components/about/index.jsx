// noinspection JSValidateTypes

import './style.css'
import me from '../../assets/me.png'
import country from '../../assets/country.png'
import age from '../../assets/age.png'
import diploma from '../../assets/diploma.png'
import {Avatar, Box, Typography} from "@mui/material";


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
        'en-US': {icon: age, value: birthdate() + ' years'},
        'pt-BR': {icon: age, value: birthdate() + ' anos'}
    },
    location: {
        'en-US': {icon: country, value: 'Rio de Janeiro, RJ'},
        'pt-BR': {icon: country, value: 'Rio de Janeiro, RJ'}
    },
    period: {
        'en-US': {icon: diploma, value: `${university_period()}º Sem., Software Eng.`},
        'pt-BR': {icon: diploma, value: `${university_period()}º Sem., Eng. de Software`}
    }
}


export default function About({language}) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'row', md: 'column'},
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 2,
            backgroundColor: '#1e2126',
            borderRadius: {xs: '0', md: '0 0 8px 0'},
            padding: '10px',
            height: 'fit-content',
            width: {xs: '92%', md: '350px'},
            maxWidth: {xs: '92%', md: '350px'}
        }}>
            <Avatar alt={'eu'} src={me} sx={{width: {xs: 100, md: 350}, height: {xs: 100, md: 350}}}/>
            <Box sx={{width: '58%', padding: '5px', justifyContent: 'left', alignItems: 'left', rowGap: '2px'}}
            display='flex' flexDirection={'column'}>
                {Object.keys(personal_info).map((key) => {
                    return (
                        <Typography 
                            variant={'body2'}
                            sx={{display: 'flex', alignItems: 'center', justifyContent: {xs: 'flex-start', md: 'center'}, columnGap: '5px'}}
                            key={key}>
                                <img src={personal_info[key][language].icon} alt={key} width={25}/>
                                {personal_info[key][language].value}
                        </Typography>
                    )
                })}
            </Box>
        </Box>
    )
}