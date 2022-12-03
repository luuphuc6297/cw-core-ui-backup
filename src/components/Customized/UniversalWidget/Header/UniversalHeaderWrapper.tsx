import { styled } from '@mui/system';

interface StyledHeaderWrapperProps {
    children: React.ReactNode;
}

const StyledHeaderWrapper = styled('header')(({ theme }) => ({
    backgroundColor: theme.palette['primary'].main,
    color: 'white',
    height: 84,
    display: 'flex',
    borderRadius: '8px 8px 0 0',
    alignItems: 'center',
    padding: 16,
}));

export const UniversalHeaderWrapper = ({ children }: StyledHeaderWrapperProps) => {
    return <StyledHeaderWrapper>{children}</StyledHeaderWrapper>;
};
