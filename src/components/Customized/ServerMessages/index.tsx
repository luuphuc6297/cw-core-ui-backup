import { Box, Typography } from '@mui/material';
import parse from 'html-react-parser';

import { styled } from '@mui/system';

interface IServerMessageProps {
    id: string;
    content: string;
}

const StyledServerMessage = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    color: 'rgb(130, 130, 130)',
}));

export const ServerMessages = ({ id, content }: IServerMessageProps) => {
    return (
        <StyledServerMessage>
            <Typography>{parse(`${content}`)}</Typography>
        </StyledServerMessage>
    );
};
