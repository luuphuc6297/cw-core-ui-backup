import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { ConversationsTitle, LoadMoreMessages, MessagesArea, SenderArea } from 'components';
import { AttributesUser, Conversation, CurrentUser, ListResponse, WorkSpace } from 'models';
import React from 'react';
import { formatDistance } from 'utils';

interface ChattingProps {
    workspace: WorkSpace;
    conversation: Conversation;
    messages?: ListResponse;
    valueEditor: string;
    currentUser?: CurrentUser;
    typing: AttributesUser[];
    countLengthValue: number;
    editing: boolean;
    onCancelEditMessage: () => void;
    onSaveEditMessage: () => void;
    handleInit: (evt: any, editor: any) => void;
    loadMessages: () => void | any;
    sendMessage?: () => void;
}

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

export const Chatting = ({
    workspace,
    conversation,
    currentUser,
    messages,
    valueEditor,
    typing,
    loadMessages,
    sendMessage,
    editing,
    onCancelEditMessage,
    onSaveEditMessage,
    handleInit,
    countLengthValue,
}: ChattingProps) => {
    React.useEffect(() => {
        const elmContent: any = document.getElementById(`scrollable-box`);
        if (elmContent) elmContent.scrollTop = elmContent.scrollHeight;
    }, [conversation._id]);

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
                    messages={messages}
                    currentUser={currentUser}
                    typing={typing}
                    loadMessages={loadMessages}
                />
            </MessagesArea>

            <SenderArea
                handleInit={handleInit}
                valueEditor={valueEditor}
                sendMessage={sendMessage}
                editing={editing}
                onCancelEditMessage={onCancelEditMessage}
                onSaveEditMessage={onSaveEditMessage}
                countLengthValue={countLengthValue}
            />
        </StyledMessageContentDetail>
    );
};
