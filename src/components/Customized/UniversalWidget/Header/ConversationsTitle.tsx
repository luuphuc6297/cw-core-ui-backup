import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Box, styled } from '@mui/system';
import { CustomizedAvatar } from '../../CustomizedAvatar';
import DetailConversationPopover from './DetailConversation';
import { StyledHeaderTitle } from './StyledHeaderTitle';

interface ConversationsTitleProps {
    title: string;
    firstName: string;
    lastName: string;
    textTimeLastMess?: string;
    avatarUrl?: string;
}

const StyledHeaderTitleWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: '100%',
}));

export const ConversationsTitle = ({
    title,
    firstName,
    lastName,
    textTimeLastMess,
    avatarUrl,
}: ConversationsTitleProps) => {
    return (
        <StyledHeaderTitleWrapper>
            <ListItem>
                <ListItemAvatar>
                    <CustomizedAvatar firstName={firstName} lastName={lastName} avatarUrl={avatarUrl} />
                </ListItemAvatar>
                <ListItemText primary={<StyledHeaderTitle>{title}</StyledHeaderTitle>} secondary={textTimeLastMess} />
            </ListItem>
            <DetailConversationPopover />
        </StyledHeaderTitleWrapper>
    );
};
