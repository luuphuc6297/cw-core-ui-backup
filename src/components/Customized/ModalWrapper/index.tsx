import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import React from 'react';

interface ModalWrapperProps {
    open?: boolean | unknown | any;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
}

const modalWrapperStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledBodyModal = styled(Box)(({ theme }) => ({}));

export const ModalWrapper = ({ open, title, children, onClose }: ModalWrapperProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBodyModal sx={modalWrapperStyles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                {children}
            </StyledBodyModal>
        </Modal>
    );
};
