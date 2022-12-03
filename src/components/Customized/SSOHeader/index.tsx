import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { NavigateFunction, useLocation } from 'react-router-dom';

interface HeaderProps {
    headerText?: string;
    redirectBtn?: string;
    onRedirect?: () => void;
    navigate: NavigateFunction;
}
const SignUpBtn = styled(Button)({
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'none',
});

const CustomHeader = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
});

const CustomCaption = styled(Typography)({
    fontSize: 14,
    marginRight: 12,
});

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '4px',
    p: 4,
};

const ConfirmBtn = styled(Button)({
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'none',
    width: 109,
    height: 40,
    marginRight: 8,
});

const CancelBtn = styled(Button)({
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'none',
    width: 109,
    height: 40,
});

export function SSOHeader({ headerText, redirectBtn, onRedirect, navigate }: HeaderProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const location = useLocation();

    const handleClose = () => setOpen(false);

    const handleBack = React.useCallback(() => setOpen(true), []);

    const handleConfirm = React.useCallback(() => navigate('/register'), [navigate]);

    const renderBackBtn = React.useCallback(() => {
        return (
            <IconButton onClick={handleBack}>
                <ArrowCircleLeftIcon />
            </IconButton>
        );
    }, [handleBack]);

    function renderNavigateBtn(): any {
        switch (location.pathname) {
            case '/sso/login':
                return null;
            case '/sso/register':
                return null;
            case '/sso/verify-code':
            case '/sso/setup-password':
            case '/sso/update-profile':
                return renderBackBtn();
        }
    }

    return (
        <CustomHeader>
            <CustomCaption>{headerText}</CustomCaption>
            {redirectBtn ? (
                <SignUpBtn variant="outlined" size="small" onClick={onRedirect}>
                    {redirectBtn}
                </SignUpBtn>
            ) : (
                renderNavigateBtn()
            )}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="body1">
                        You are in the process. Are you sure you want to back?
                    </Typography>
                    <Box sx={{ width: '100%', display: 'flex' }}>
                        <ConfirmBtn variant="contained" onClick={handleConfirm}>
                            Yes
                        </ConfirmBtn>
                        <CancelBtn variant="outlined" onClick={handleClose}>
                            Cancel
                        </CancelBtn>
                    </Box>
                </Box>
            </Modal>
        </CustomHeader>
    );
}
