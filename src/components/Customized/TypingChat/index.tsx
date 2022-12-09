import { AttributesUser } from 'models';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';

interface UserTypingProps {
    user: AttributesUser;
}

const StyledBoxTyping = styled(Box)(({ theme }) => ({
    display: 'flex',
    color: grey[400],
    fontSize: 12,
    fontStyle: 'italic',
    flexDirection: 'row-reverse',
    right: 10,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    '@keyframes blink': {
        '50%': {},
    },
}));

const StyledBlinkDot = styled('span')(({ theme }) => ({
    marginRight: 8,
    animation: '1s blink infinite',
    ':nth-child(2)': {
        animationDelay: '250ms',
    },
    ':nth-child(3)': {
        animationDelay: '500ms',
    },
}));

export const TypingChat = ({ user }: UserTypingProps) => {
    const { firstName = '', lastName = '' } = user;

    return (
        <StyledBoxTyping>
            <StyledBlinkDot>.</StyledBlinkDot>
            <StyledBlinkDot>.</StyledBlinkDot>
            <StyledBlinkDot>.</StyledBlinkDot>
            {`${firstName} ${lastName}`} typing
        </StyledBoxTyping>
    );
};
