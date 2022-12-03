import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/system';

interface UniversalToggleBtnProps {
    isOpen: boolean;
    onClick: () => void;
}
const StyledIconBtn = styled(IconButton)(({ theme }) => ({
    width: 56,
    height: 56,
    backgroundColor: theme.palette['primary'].main,
    position: 'fixed',
    bottom: 24,
    right: 24,
    zIndex: 99,
    color: 'white',
    '&:hover': {
        backgroundColor: purple[700],
        opacity: 0.8,
    },
}));
export const UniversalToggleBtn = ({ isOpen, onClick }: UniversalToggleBtnProps) => {
    return (
        <StyledIconBtn aria-label="toggle-button" onClick={onClick}>
            {isOpen ? <CloseIcon fontSize="large" /> : <AddIcon fontSize="large" />}
        </StyledIconBtn>
    );
};
