import { List, OutlinedInput } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Conversation, CreateConversationForm, ListResponse } from 'models';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { CreateConversationArea } from './CreateConversationArea';
import { ListConversations } from './ListConversations';

interface LeftSidebarRtcProps {
    drawer?: React.ReactNode;
    openDrawer?: boolean;
    conversations: any;
    onClick: (conversation: Conversation) => void;
    onSubmit?: (formValues: CreateConversationForm, onCancel: any) => Promise<void>;
    users: any | ListResponse;
    onClickSearch: () => void;
    navigate: NavigateFunction;
}

const StyledSearchInput = styled(OutlinedInput)(({ theme }) => ({
    height: 34,
    borderRadius: 8,
    width: '100%',
    '> input': {
        cursor: 'pointer',
    },
}));

export const LeftSidebarRtc = ({
    users,
    onSubmit,
    conversations,
    onClick,
    onClickSearch,
    navigate,
}: LeftSidebarRtcProps) => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    height: 65,
                }}
            >
                <StyledSearchInput onClick={onClickSearch} placeholder="Search by name" />
                <CreateConversationArea onSubmit={onSubmit} users={users} />
            </Box>
            <List sx={{ height: '100%', overflowY: 'auto' }}>
                <ListConversations conversations={conversations} onClick={onClick} navigate={navigate} />
            </List>
        </Box>
    );
};
