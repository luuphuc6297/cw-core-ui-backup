import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { ConversationsTitle, LoadMoreMessages, MessagesArea, SenderArea } from 'components';
import { DATA_FAKE } from 'containers/Home/Rtc/data';
import React from 'react';
import { formatDistance } from 'utils';

// interface ChattingProps {
//     messages?: ListResponse;
//     valueEditor: string;
//     typing?: AttributesUser[];
//     countLengthValue: number;
//     editing: boolean;
//     onCancelEditMessage: () => void;
//     onSaveEditMessage: () => void;
//     handleInit: (evt: any, editor: any) => void;
//     loadMessages: () => void | any;
//     sendMessage?: () => void;
// }

const StyledMessageContentDetail = styled(Box)(({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));

const StyledTitleChat = styled(Box)(({ theme }) => ({
    height: 64,
    position: 'relative',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    padding: '0px 20px',
    boxSizing: 'content-box',
}));

export const Chatting = () => {
    const conversation = DATA_FAKE.conversation;

    React.useEffect(() => {
        const elmContent: any = document.getElementById(`scrollable-box`);
        if (elmContent) elmContent.scrollTop = elmContent.scrollHeight;
    }, [conversation._id]);

    const loadMessages = () => {};

    if (!conversation._id) return <></>;
    return (
        <StyledMessageContentDetail id={conversation._id}>
            <StyledTitleChat>
                <ConversationsTitle
                    title={conversation.attributes.title}
                    firstName={conversation.attributes.title}
                    lastName=""
                    avatarUrl={conversation.attributes?.imagePath}
                    textTimeLastMess={`last seen ${formatDistance(conversation.attributes.lastMessage.createdAt)}`}
                />
            </StyledTitleChat>
            <MessagesArea>
                <LoadMoreMessages
                    messages={DATA_FAKE.messages}
                    currentUser={DATA_FAKE.user}
                    typing={[]}
                    loadMessages={loadMessages}
                />
            </MessagesArea>

            <SenderArea />
        </StyledMessageContentDetail>
    );
};
