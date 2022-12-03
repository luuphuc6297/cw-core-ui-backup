import { Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ItemFormat } from 'models';
import { formatTime } from 'utils';

interface TimeDisplayedConversationProps {
    time: string;
}

const StyledDisplayTime = styled(Typography)(({ theme }) => ({
    fontSize: 12,
    fontStyle: 'italic',
}));

export const TimeDisplayedConversation = ({ time }: TimeDisplayedConversationProps) => {
    const fullFormat: ItemFormat = formatTime(time);

    const { fullDate, fullTime } = fullFormat;

    return (
        <Tooltip title={`${fullDate} at ${fullTime}`}>
            <StyledDisplayTime>{fullTime}</StyledDisplayTime>
        </Tooltip>
    );
};
