import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: { fontSize: 30, fontWeight: 'bold' },
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    item: {
                        paddingLeft: 0,
                        paddingTop: 0,
                    },
                },
            },
        },
    },
});

export default theme;
