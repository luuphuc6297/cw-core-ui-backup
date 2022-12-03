import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

interface ArrowBackProps {
    eventTypeId?: string;
    onClick?: () => void;
}

export const StyledBackIconBtn = styled(IconButton)(({ theme }) => ({
    color: 'white',
    padding: 0,
    marginRight: 8,
    height: 40,
    width: 40,
}));

export const ArrowBack = ({ eventTypeId, onClick }: ArrowBackProps) => {
    return (
        <StyledBackIconBtn aria-label="menu" onClick={onClick}>
            <ArrowBackIcon />
        </StyledBackIconBtn>
    );
};
