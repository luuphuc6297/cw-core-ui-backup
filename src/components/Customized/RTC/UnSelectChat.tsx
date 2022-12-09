import { Box } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundUnSelectConversation = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    background: '#e8e8e8',
    '> span': {
        background: '#E1E1E2',
        padding: '5px 10px',
        borderRadius: 999,
    },
}));

const UnSelectChat = () => {
    return (
        <BackgroundUnSelectConversation>
            <span>Select a chat to start messaging</span>
        </BackgroundUnSelectConversation>
    );
};

export default UnSelectChat;
