import { Typography } from '@mui/material';
import { styled } from '@mui/system';

interface StyledHeaderTitleProps {
    children: string;
}
export const StyledTitle = styled(Typography)(({ theme }) => ({
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordWrap: 'break-word',
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginRight: 4,
    '&::hover': {
        textDecoration: 'underline',
    },
}));

export const StyledHeaderTitle = ({ children }: StyledHeaderTitleProps) => {
    return <StyledTitle variant="h6">{children}</StyledTitle>;
};
