import { List, OutlinedInput } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Conversation } from 'models';
import { useNavigate } from 'react-router-dom';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, MessageSlice, WorkSpaceSlice } from 'store/zustand/slices';
import { WORKSPACE_ID } from 'utils';
import { CreateConversationArea } from './CreateConversationArea';
import { ListConversations } from './ListConversations';

const StyledSearchInput = styled(OutlinedInput)(({ theme }) => ({
    height: 34,
    borderRadius: 8,
    width: '100%',
    '> input': {
        cursor: 'pointer',
    },
}));

export const LeftSidebarRtc = ({ onClickSearch }: any) => {

    const navigate = useNavigate();

    const {
        conversations,
        setConversation,
        getUsersConversation,
    } = useRtcStore((state: ConversationSlice) => state);
    const {
        users,
    } = useRtcStore((state: WorkSpaceSlice) => state);
    const {
        getDataMessages,
    } = useRtcStore((state: MessageSlice) => state);

    const onClick = (conversation: Conversation) => {
        setConversation(conversation);
        getDataMessages(WORKSPACE_ID, conversation._id, 1);
        getUsersConversation(WORKSPACE_ID, conversation._id);
        navigate(`/rtc/${conversation._id}`);
    };

    const onSubmit = async (formValues: any, onCancel: any) => {
        // Handle logic in here
    };

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
                <ListConversations conversations={conversations.data} onClick={onClick} />
            </List>
        </Box>
    );
};
