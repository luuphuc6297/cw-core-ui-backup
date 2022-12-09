import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { EditMenu } from './EditMenu';

export const EditFeature = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box>
            <IconButton
                sx={{
                    width: 32,
                    height: 32,
                    color: 'black',
                }}
                onClick={handleClick}
            >
                <BorderColorOutlinedIcon />
            </IconButton>
            <EditMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
        </Box>
    );
};
