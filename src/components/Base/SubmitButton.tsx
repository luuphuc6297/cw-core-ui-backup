import { Button } from '@mui/material';
import { styled } from '@mui/system';

const SubmitBtn = styled(Button)({
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 'bold',
    height: 44,
    marginBottom: 24,
});

export const SubmitButton = ({ children, ...props }: any) => {
    return (
        <SubmitBtn type="submit" variant="contained" fullWidth {...props}>
            {children}
        </SubmitBtn>
    );
};
