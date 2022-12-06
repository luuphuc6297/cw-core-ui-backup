import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { MainLayoutContext } from 'layouts';
import { get, values } from 'lodash';
import { Conversation, ListResponse } from 'models';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConversation, useConversationUpdate } from 'services';
import AvatarUpload from '../../ConversationAvatar';
import { InspectorOptions, LinksCollection } from '../../Inspector';
import { UsersConversationWrapper } from '../../Inspector/UsersConversationWrapper';

const workspaceId = '38647fbd-20a8-40ab-8292-b4828d636d29';
interface RightSidebarRtcProps {
    conversation: Conversation;
    handleChangeTitle: (value: string, conversationId: string) => void;
    uploadAvatar: (e: any) => void;
    usersConversation: ListResponse;
    users: any | ListResponse;
    onAddMember: (selectedId: string[]) => boolean;
}

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

export const RightSidebarRtc = ({ usersConversation, users, onAddMember }: RightSidebarRtcProps) => {
    const { conversationId }: string | any = useParams();
    const { conversation }: any = useConversation('', conversationId, { refetchOnWindowFocus: false });

    const navigate = useNavigate();
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
