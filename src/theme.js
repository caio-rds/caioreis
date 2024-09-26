import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#556cd6',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#17191e'
                },
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent'
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e2126',
                },
                '&:not(:last-child)': {
                    borderBottom: 0,
                },
                '&:before': {
                    display: 'none',
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(100, 100, 100, 0.75)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#556cd6',
                    }
                }
            }
        },

    }
});

export default theme;