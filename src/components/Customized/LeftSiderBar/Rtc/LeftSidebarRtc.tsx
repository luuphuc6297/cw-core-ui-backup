import { List, OutlinedInput } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Conversation } from 'models';
import { useNavigate } from 'react-router-dom';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, WorkSpaceSlice } from 'store/zustand/slices';
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
        createNewConversation,
        inviteUsers,
    } = useRtcStore((state: ConversationSlice) => state);
    const {
        users,
    } = useRtcStore((state: WorkSpaceSlice) => state);

    const onClick = (conversation: Conversation) => {
        navigate(`/rtc/${conversation._id}`);
    };

    const onSubmit = async (formValues: any, onCancel: any) => {
        const result: Conversation = await createNewConversation(WORKSPACE_ID , formValues);
        inviteUsers(WORKSPACE_ID, result._id, formValues?.selectedId);
        onCancel();
        navigate(`/rtc/${result._id}`);
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
