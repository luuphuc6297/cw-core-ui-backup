import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { AttachBtn, SaveEditingBtn, SenderIconBtn } from 'components';

import { CLIENT_EVENT } from 'utils';
import { TinyMCE } from '../TinyMCE';

interface SenderAreaProps {
    valueEditor: string;
    editing: boolean;
    countLengthValue: number;
    sendMessage?: () => void;

    onCancelEditMessage: () => void;
    onSaveEditMessage: () => void;
    handleInit: (evt: any, editor: any) => void;
}

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

export const SenderArea = ({
    valueEditor,
    sendMessage,
    editing,
    onCancelEditMessage,
    onSaveEditMessage,
    handleInit,
    countLengthValue,
}: SenderAreaProps) => {
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
