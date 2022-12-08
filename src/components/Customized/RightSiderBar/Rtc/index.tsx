import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DATA_FAKE } from 'containers/Home/Rtc/data';
import { MainLayoutContext } from 'layouts';
import { get } from 'lodash';
import { ListResponse } from 'models';
import React from 'react';
import { useParams } from 'react-router-dom';
import AvatarUpload from '../../ConversationAvatar';
import { InspectorOptions, LinksCollection } from '../../Inspector';
import { UsersConversationWrapper } from '../../Inspector/UsersConversationWrapper';

const StyledTitleDetail = styled(Box)(({ theme }) => ({
    height: 65,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledInfoUser = styled(Box)(({ theme }) => ({
    marginTop: 8,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    '.MuiAvatar-root': {
        width: 80,
        height: 80,
    },
}));

export const RightSidebarRtc = () => {
    const conversation = DATA_FAKE.conversation;

    const users: any | ListResponse = DATA_FAKE.users;

    const usersConversation: ListResponse = DATA_FAKE.usersConversation;

    const { setIsShowRightSidebar } = React.useContext(MainLayoutContext);

    const leaveGroup = () => {
        console.log('handle leave group');
    };

    const { title: titleChat = '', imagePath: avatarUrl = '' } = get(conversation, 'attributes', {} as any);

    // const { mutate: editConversation } = useConversationUpdate({
    //     onSuccess: () => {
    //         console.log('success');
    //         navigate(-1);
    //     },
    // });

    const handleChangeTitle = async (customTitle: string) => {
        const data = { title: customTitle };

        // editConversation({
        //     workspaceId,
        //     conversationId,
        //     payload: data,
        // } as any);
    };

    const onAddMember = (selectedId: string[]) => {
        return false;
    };

    return (
        <>
            <StyledTitleDetail>
                <Typography sx={{ fontWeight: 650, padding: '0 16px' }} variant="h5" component="h5">
                    Detail
                </Typography>
                <IconButton component="label" onClick={setIsShowRightSidebar}>
                    <CloseIcon />
                </IconButton>
            </StyledTitleDetail>

            <StyledInfoUser>
                <Box sx={{ margin: '0 auto' }}>
                    <AvatarUpload {...{ avatarUrl, firstName: titleChat, lastName: '' }} />
                </Box>
                <Typography
                    sx={{ fontWeight: 650, padding: '0 16px', textAlign: 'center' }}
                    variant="h5"
                    component="h5"
                >
                    {titleChat}
                </Typography>
            </StyledInfoUser>

            <Divider />
            <InspectorOptions conversationId={conversation._id} title={titleChat} handleChange={handleChangeTitle} />
            <Divider />
            <UsersConversationWrapper
                conversation={conversation}
                usersConversation={usersConversation}
                users={users}
                onAddMember={onAddMember}
            />
            <Divider />
            <LinksCollection />
            <List component="nav" aria-labelledby="leave-group">
                <ListItem button onClick={leaveGroup}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leave group" />
                </ListItem>
            </List>
        </>
    );
};
