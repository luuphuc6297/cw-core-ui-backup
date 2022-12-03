import { CreateConversationForm, ListResponse } from 'models';
import { Box, Modal, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { CLIENT_EVENT } from 'utils';
import { CreateConversation } from '../../CreateConversation';
import { EditFeature } from './EditFeature';

interface CreateConversationAreaProps {
    onSubmit?: (formValues: CreateConversationForm, onCancel: any) => Promise<void>;
    users: any | ListResponse;
}

const StyledCreateSearchConversationArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: 60,
    justifyContent: 'start',
}));

const StyledContentStartConversation = styled(Box)(({ theme }) => ({
    background: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    padding: '10px',
}));

export const CreateConversationArea = ({ onSubmit, users }: CreateConversationAreaProps) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const onShow = (data: any) => {
        const { detail } = data;
        if (detail == 'create-conversation') {
            setOpen((preState) => !preState);
        }
    };

    useEffect(() => {
        window.addEventListener(CLIENT_EVENT.ON_OFF_MODAL, onShow);
        return () => {
            window.removeEventListener(CLIENT_EVENT.ON_OFF_MODAL, onShow);
        };
    });

    return (
        <StyledCreateSearchConversationArea>
            <EditFeature />
            <Modal open={open} onClose={handleClose}>
                <StyledContentStartConversation>
                    <CreateConversation
                        onSubmit={(formValues: CreateConversationForm) => {
                            if (onSubmit != null) onSubmit(formValues, handleClose);
                        }}
                        onCancel={handleClose}
                        initialValues={{ title: '', selectedId: [] }}
                        users={users}
                    />
                </StyledContentStartConversation>
            </Modal>
        </StyledCreateSearchConversationArea>
    );
};
