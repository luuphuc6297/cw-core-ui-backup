import { Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box, styled } from '@mui/system';
import { get } from 'lodash';
import { Conversation, CurrentUser } from 'models';
import { extractContent, formatTimeForListConversation, splitTitleConversationByUser } from 'utils';
import { StyledWrapperAvatar } from '../BoxMessages';
import { CustomizedAvatar } from '../CustomizedAvatar';
import { LastMessage } from './LastMessage';

interface IConversationItemProps {
    currentUser?: CurrentUser;
    conversation: Conversation;
    handleListItemClick: (id: string) => void;
}

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    // '& .MuiListItemText-secondary': {
    //     maxWidth: 268,
    //     whiteSpace: 'nowrap',
    //     overflow: 'hidden !important',
    //     textOverflow: 'ellipsis',
    // },
}));

const StyledConversationItem = styled(ListItem)(({ theme }) => ({
    height: '100%',
    cursor: 'pointer',
    padding: 10,
    '&:hover': {
        backgroundColor: grey[300],
    },
}));

const StyleWrapperTitleConversation = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 6,
}));

const StyleTitleConversation = styled('span')(({ theme }) => ({
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    wordWrap: 'break-word',
    width: '100%',
    textOverflow: 'ellipsis',
    display: 'inline-block',
}));

const StyleTimeConversation = styled('span')(({ theme }) => ({
    fontSize: 13,
    flexShrink: 0,
}));

export const ConversationItem = ({ currentUser, conversation, handleListItemClick }: IConversationItemProps) => {
    const {
        title: titleChat = '',
        lastMessage,
        user,
        imagePath: avatarUrl = '',
        userCount,
    } = get(conversation, 'attributes', {} as any);
    const firstName = get(user, 'firstName', '');
    const lastName = get(user, 'lastName', '');

    const { firstCharacter, lastCharacter } = splitTitleConversationByUser({
        totalUser: userCount,
        titleChat,
        firstName,
        lastName,
    });
    const { type = '', content = '' } = lastMessage;

    const messDetail = content.indexOf('wrapper') !== -1 ? 'Send a file' : extractContent(content);

    const userId = user?._id || '';

    const currentUserId = currentUser?.id || '';

    return (
        <>
            <StyledConversationItem onClick={() => handleListItemClick(conversation._id)}>
                <ListItemAvatar>
                    <StyledWrapperAvatar>
                        <CustomizedAvatar firstName={firstCharacter} lastName={lastCharacter} avatarUrl={avatarUrl} />
                    </StyledWrapperAvatar>
                </ListItemAvatar>
                <StyledListItemText
                    primary={
                        <StyleWrapperTitleConversation>
                            <StyleTitleConversation>{titleChat}</StyleTitleConversation>
                            <StyleTimeConversation>
                                {formatTimeForListConversation(conversation.meta.createdAt)}
                            </StyleTimeConversation>
                        </StyleWrapperTitleConversation>
                    }
                    secondary={
                        <LastMessage
                            {...{
                                messDetail,
                                firstName,
                                currentUserId,
                                userId,
                                content,
                                type,
                            }}
                        />
                    }
                />
            </StyledConversationItem>
        </>
    );
};
