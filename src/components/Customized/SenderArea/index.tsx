import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { messageApis } from 'apis/messageApis';
import { AttachBtn, SaveEditingBtn, SenderIconBtn } from 'components';
import { debounce, get, trim } from 'lodash';
import { Conversation } from 'models';
import React from 'react';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, MessageSlice } from 'store/zustand/slices';

import { CLIENT_EVENT, WORKSPACE_ID } from 'utils';
import { TinyMCE } from '../TinyMCE';

// interface SenderAreaProps {
//     valueEditor: string;
//     editing: boolean;
//     countLengthValue: number;
//     onCancelEditMessage: () => void;
//     onSaveEditMessage: () => void;
//     handleInit: (evt: any, editor: any) => void;
// }

const StyledSenderAreaWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    gap: 4,
    padding: '15px 20px',
    maxHeight: 150,
    flexShrink: 0,
    background: '#ffffff',
    minHeight: 56,
    borderTop: '1px solid rgb(230, 230, 230)',
    alignItems: 'center',
}));

export const SenderArea = () => {
    const [countLengthValue, setCountLengthValue] = React.useState<number>(0);
    const [editing, setEditing] = React.useState(false);
    const [valueEditor, setValueEditor] = React.useState<string>('');
    const [isStarting, setIsStarting] = React.useState<boolean>(false);
    const [idMess, setIdMess] = React.useState<string>('');
    
    const {
        conversation,
    } = useRtcStore((state: ConversationSlice) => state);
    const {
        messages,
        createMessage,
        deleteMessage,
        updateMessagesFromSocket,
    } = useRtcStore((state: MessageSlice) => state);

    const pageNumber = messages.meta.skip / messages.meta.limit;

    /* handle message */

    const sendMessage = (messText: string) => {
        const drafMess: any = JSON.parse(window.localStorage.getItem('draftMessage') || '{}');
        delete drafMess[conversation._id];
        window.localStorage.setItem('draftMessage', JSON.stringify(drafMess));
        createMessage(WORKSPACE_ID, conversation._id, trim(messText));
    };

    const execute = async (value: string, conversation: Conversation) => {
        messageApis.stopTyping(WORKSPACE_ID, conversation._id).then();
        const drafMess: any = JSON.parse(window.localStorage.getItem('draftMessage') || '{}');
        drafMess[conversation._id] = value;
        window.localStorage.setItem('draftMessage', JSON.stringify(drafMess));
        setIsStarting(false);
    };

    const handler = React.useCallback(debounce(execute, 300), []);

    const handleChange = (data: any) => {
        const { value, editor } = data.detail;
        const content = editor.getContent({ format: 'text' });
        setValueEditor(value);
        setCountLengthValue(content.length);
        if (!isStarting) {
            setIsStarting(true);
            messageApis.startTyping(WORKSPACE_ID, conversation._id).then();
        }
        handler(content, conversation);
        editor.selection.select(editor.getBody(), true);
        editor.selection.collapse(false);
        editor.focus();
    };

    const handleSendMessage = async () => {
        if (valueEditor) {
            sendMessage(valueEditor);
        }
        setValueEditor('');
    };

    const handleEnter = ({ detail }: any) => {
        const mess = detail;
        if (mess.trim()) {
            if (mess) {
                if (window.localStorage.getItem('editMess') != null) {
                    const edit = JSON.parse(window.localStorage.getItem('editMess')!);
                    onSaveEditMessage(edit.id, mess);
                } else {
                    sendMessage(mess);
                    setValueEditor('');
                }
            }
        }
    };

    React.useEffect(() => {
        const cacheMessage = get(
            JSON.parse(window.localStorage.getItem('draftMessage') || '{}'),
            get(conversation, '_id', ''),
            ''
        );
        setValueEditor(cacheMessage);
    }, [conversation]);

    const editMessage = (data: any) => {
        const { content, _id } = data.detail;
        setValueEditor(content);
        setIdMess(_id);
        setEditing(true);
        window.localStorage.setItem('editMess', JSON.stringify({ id: _id, edit: true }));
    };

    const onDeleteMessage = (data: any) => {
        const { _id } = data.detail;
        deleteMessage(WORKSPACE_ID, _id);
    };

    const onCancelEditMessage = () => {
        setValueEditor('');
        setIdMess('');
        setEditing(false);
        window.localStorage.removeItem('editMess');
    };

    const onSaveEditMessage = async (id?: string, content?: string) => {
        const newId = typeof id == 'string' ? id : idMess;
        const message: any = await messageApis.updateMessage(WORKSPACE_ID, newId, content || valueEditor);
        await updateMessagesFromSocket(message);
        setValueEditor('');
        setIdMess('');
        setEditing(false);
        window.localStorage.removeItem('editMess');
    };

    const handleInit = (evt: any, editor: any) => {
        setCountLengthValue(editor.getContent({ format: 'text' }).length);
    };

    React.useEffect(() => {
        window.addEventListener(CLIENT_EVENT.CHANGE_SEND_MESSAGE, handleChange);
        window.addEventListener(CLIENT_EVENT.ENTER_SEND_MESSAGE, handleEnter);
        window.addEventListener(CLIENT_EVENT.EDIT_MESSAGE, editMessage);
        window.addEventListener(CLIENT_EVENT.DELETE_MESSAGE, onDeleteMessage);
        return () => {
            window.removeEventListener(CLIENT_EVENT.CHANGE_SEND_MESSAGE, handleChange);
            window.removeEventListener(CLIENT_EVENT.ENTER_SEND_MESSAGE, handleEnter);
            window.removeEventListener(CLIENT_EVENT.EDIT_MESSAGE, editMessage);
            window.removeEventListener(CLIENT_EVENT.DELETE_MESSAGE, onDeleteMessage);
        };
    });

    return (
        <StyledSenderAreaWrapper>
            <TinyMCE
                onInit={handleInit}
                value={valueEditor}
                onChange={(value: string, editor: any) => {
                    const widgetEvent = new CustomEvent(CLIENT_EVENT.CHANGE_SEND_MESSAGE, {
                        detail: { value, editor },
                    });
                    window.dispatchEvent(widgetEvent);
                }}
                placeholder="Type a message and press ENTER to send..."
            />
            {editing ? (
                <SaveEditingBtn
                    onCancel={onCancelEditMessage}
                    onClick={onSaveEditMessage}
                    isDisableSave={valueEditor === ''}
                ></SaveEditingBtn>
            ) : countLengthValue === 0 ? (
                <AttachBtn />
            ) : (
                <SenderIconBtn onClick={handleSendMessage} />
            )}
        </StyledSenderAreaWrapper>
    );
};
