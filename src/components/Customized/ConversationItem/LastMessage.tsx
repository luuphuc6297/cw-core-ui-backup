import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyleLastMess = styled(Typography)(({ theme }) => ({
    flex: 0,
    fontSize: 13,
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    width: '100%',
    maxWidth: 298,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
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
