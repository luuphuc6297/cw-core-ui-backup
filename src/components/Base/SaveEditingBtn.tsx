import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

interface SaveEditingBtnProps {
    onClick?: () => void;
    onCancel?: () => void;
    isDisableSave: boolean;
}

const StyledSendIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
}));

export const SaveEditingBtn = ({ onClick, onCancel, isDisableSave }: SaveEditingBtnProps) => {
    return (
        <StyledSendIcon>
            <Button onClick={onCancel} size="small">
                Cancel
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    if (onClick) onClick();
                }}
                size="small"
                disabled={isDisableSave}
            >
                Save
            </Button>
        </StyledSendIcon>
    );
};
