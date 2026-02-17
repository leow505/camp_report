import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6366f1', // Indigo
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#64748b', // Slate
        },
        background: {
            default: '#f8fafc', // Very light slate/blue-ish white
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a', // Deep slate
            secondary: '#64748b',
        },
        divider: '#e2e8f0',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            color: '#0f172a',
        },
        h6: {
            fontWeight: 600,
            color: '#0f172a',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid #e2e8f0',
                },
            },
        },
    },
});

export default theme;
