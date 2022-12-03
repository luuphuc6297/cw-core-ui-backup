import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

interface AddCircleBtnProps {
    onClick?: () => void;
}

const StyledAddCircleBtn = styled(IconButton)(({ theme }) => ({
    cursor: 'pointer',
    width: 32,
    height: 38,
    flex: 0,
}));

export const AddCircleBtn = ({ onClick }: AddCircleBtnProps) => {
    return (
        <StyledAddCircleBtn onClick={onClick} color="primary">
            <AddCircleOutlineIcon />
        </StyledAddCircleBtn>
    );
};
