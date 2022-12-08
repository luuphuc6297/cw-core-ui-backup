import { List, OutlinedInput } from '@mui/material';
import { Box, styled } from '@mui/system';
import { DATA_FAKE } from 'containers/Home/Rtc/data';
import { Conversation, ListResponse } from 'models';
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
    const onClick = (conversation: Conversation) => {
        // Handle logic in here
    };
    const onSubmit = async (formValues: any, onCancel: any) => {
        // Handle logic in here
    };

    const conversations: any = DATA_FAKE.conversations.data;
    const users: any | ListResponse = DATA_FAKE.users;

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
                <ListConversations conversations={conversations} onClick={onClick} />
            </List>
        </Box>
    );
};
