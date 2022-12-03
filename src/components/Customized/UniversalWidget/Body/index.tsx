import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface UniversalBodyWrapperProps {
    children: React.ReactNode;
}
const StyledBodyWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: '#f6f7fb',
    flex: 1,
    overflow: 'auto',
    height: 'calc(100% - 84px)',
}));

export const UniversalBodyWrapper = ({ children }: UniversalBodyWrapperProps) => {
    return <StyledBodyWrapper>{children}</StyledBodyWrapper>;
};
