import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { ConversationsTitle, LoadMoreMessages, MessagesArea, SenderArea } from 'components';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, MessageSlice, TypingSlice, UserSlice } from 'store/zustand/slices';
import { formatDistance, WORKSPACE_ID } from 'utils';

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
    const { id: conversationId } = useParams();

    const { conversation, getUsersConversation, getConversationDetail } = useRtcStore(
        (state: ConversationSlice) => state
    );

    const { typing } = useRtcStore((state: TypingSlice) => state);

    const { messages, getDataMessages } = useRtcStore((state: MessageSlice) => state);

    const { user } = useRtcStore((state: UserSlice | any) => state);

    const loadMessages = () => {};

    React.useEffect(() => {
        const elmContent: any = document.getElementById(`scrollable-box`);
        if (elmContent) elmContent.scrollTop = elmContent.scrollHeight;
    }, [conversation._id]);

    React.useEffect(() => {
        if (conversationId) {
            getConversationDetail(WORKSPACE_ID, conversationId);
            getDataMessages(WORKSPACE_ID, conversationId, 1);
            getUsersConversation(WORKSPACE_ID, conversationId);
        }
    }, [conversationId]);

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
                <LoadMoreMessages messages={messages} currentUser={user} typing={typing} loadMessages={loadMessages} />
            </MessagesArea>

            <SenderArea />
        </StyledMessageContentDetail>
    );
};
