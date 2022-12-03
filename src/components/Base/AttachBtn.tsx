import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

const StyledAttachBtn = styled(IconButton)(({ theme }) => ({
    width: 32,
    height: 38,
    flex: 0,
}));

export const AttachBtn = () => {
    return (
        <StyledAttachBtn color="primary">
            <AttachFileIcon />
        </StyledAttachBtn>
    );
};
