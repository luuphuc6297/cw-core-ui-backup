import { styled } from '@mui/system';

const StyleLastMess = styled('span')(({ theme }) => ({
    flex: 0,
    fontSize: 13,
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    wordWrap: 'break-word',
    width: '100%',
    textOverflow: 'ellipsis',
    display: 'inline-block',
}));

export const LastMessage = ({
    messDetail,
    firstName,
    currentUserId,
    userId,
    content,
    type,
}: {
    messDetail: string;
    firstName: string;
    currentUserId: string;
    userId: string;
    content: string;
    type: string;
}) => {
    if (type === 'Server') {
        return <StyleLastMess>{content}</StyleLastMess>;
    } else {
        if (userId !== currentUserId) {
            return <StyleLastMess>{`${firstName}: ${messDetail}`}</StyleLastMess>;
        } else {
            return <StyleLastMess>{`You: ${messDetail}`}</StyleLastMess>;
        }
    }
};
