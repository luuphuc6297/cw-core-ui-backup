import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

interface LiveChatProps {
    children?: React.ReactNode;
}

const StyledPaper = styled(Paper)(({ theme }: any) => ({
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flex: 1,
    borderRadius: 'inherit',
}));

export const MessagesArea = ({ children }: LiveChatProps) => {
    return <StyledPaper elevation={0}>{children}</StyledPaper>;
};
