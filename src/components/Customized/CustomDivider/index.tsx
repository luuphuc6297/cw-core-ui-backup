import { Divider } from '@mui/material';
import { styled } from '@mui/system';

interface CustomDividerProps {
    children?: string;
}

const DividerStyled = styled(Divider)({
    fontSize: 12,
    color: 'rgba(5, 6, 15, 0.6)',
    margin: '24px 0',
});

export const CustomDivider = ({ children }: CustomDividerProps) => {
    return <DividerStyled>{children}</DividerStyled>;
};
