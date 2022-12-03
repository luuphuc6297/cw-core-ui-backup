import { Avatar, styled, Typography } from '@mui/material';
import { AttributesUser } from 'models';
import React from 'react';
import { getShortName, stringToColor } from 'utils';

export type AvatarConversationProps = Pick<AttributesUser, 'avatarUrl' | 'firstName' | 'lastName'>;

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
}));

export const CustomizedAvatar = React.memo(({ firstName, lastName, avatarUrl }: AvatarConversationProps) => {
    const firstCharacter = getShortName(firstName);
    const secondCharacter = getShortName(lastName);
    const displayName = firstCharacter + secondCharacter;
    const backgroundColorAvatar = stringToColor(`${firstCharacter}${secondCharacter}`);

    const RenderAvatar = () => {
        if (!avatarUrl) {
            return (
                <StyledAvatar sx={{ bgcolor: backgroundColorAvatar }} alt={displayName}>
                    <Typography sx={{ fontWeight: 600 }}>{displayName}</Typography>
                </StyledAvatar>
            );
        } else {
            return <StyledAvatar alt={displayName} src={avatarUrl} />;
        }
    };

    return <RenderAvatar />;
});
