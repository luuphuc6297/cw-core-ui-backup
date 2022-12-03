import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

interface SenderIconBtnProps {
    onClick?: () => void;
    isDisable?: boolean;
}

const StyledSendIcon = styled(IconButton)(({ theme }) => ({
    cursor: 'pointer',
    width: 32,
    height: 38,
    flex: 0,
}));

export const SenderIconBtn = ({ onClick, isDisable }: SenderIconBtnProps) => {
    return (
        <StyledSendIcon disabled={isDisable} color="primary" aria-label="send" onClick={onClick} type="submit">
            <SendIcon fontSize="small" />
        </StyledSendIcon>
    );
};
