import { Box } from '@mui/material';
import Popover from '@mui/material/Popover';
import * as React from 'react';

interface IOptionsDialog {
    renderButton: React.FunctionComponent;
    children: React.ReactNode;
}

const OptionsDialog = ({ renderButton, children }: IOptionsDialog) => {
    const RenderButton = renderButton;
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Box onClick={handleClick}>
                <RenderButton />
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>
        </>
    );
};

export default OptionsDialog;
