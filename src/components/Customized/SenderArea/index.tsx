import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { AttachBtn, SaveEditingBtn, SenderIconBtn } from 'components';
import React from 'react';

import { CLIENT_EVENT } from 'utils';
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

    const sendMessage = () => {
        //Handle logic here
    };

    const onCancelEditMessage = () => {};

    const onSaveEditMessage = async (id?: string, content?: string) => {};

    const handleInit = (evt: any, editor: any) => {};

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
                <SenderIconBtn onClick={sendMessage} />
            )}
        </StyledSenderAreaWrapper>
    );
};
