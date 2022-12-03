import { Box, CircularProgress } from '@mui/material';

export const CircularIndeterminate = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
            }}
        >
            <CircularProgress size={32} color="primary" />
        </Box>
    );
};
