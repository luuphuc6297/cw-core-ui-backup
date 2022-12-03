import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CustomCaption = styled(Typography)(({ theme }) => ({
    lineHeight: '24px',
    fontSize: 16,
    marginBottom: 24,
    color: theme.palette['grey'][500],
    textAlign: 'left',
}));

