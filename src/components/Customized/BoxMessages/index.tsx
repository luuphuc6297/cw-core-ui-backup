import { alpha, Box, IconButton, Menu, MenuItem, MenuProps, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import parse from 'html-react-parser';
import { isEqual } from 'lodash';
import { CurrentUser, LastMessage, Message } from 'models';
import moment from 'moment-timezone';
import React from 'react';
import {
    CLIENT_EVENT,
    getCreatedAtLastMessage,
    getFullName,
    getUserIdFormLastMessage,
    getUserIdFormMessage
} from 'utils';
import { AvatarConversation, ServerMessages, TimeDisplayedConversation } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface BoxMessageProps {
    currentUser?: CurrentUser;
    children?: React.ReactNode;
    message: Message;
    lastMessage: LastMessage;
}

const StyledBoxMessage = styled(Box)<{ render?: boolean }>(({ theme, render }) => ({
    display: 'flex',
    marginBottom: 20,
    flexDirection: render ? 'row-reverse' : 'row',
    gap: '10px',
}));

const StyledName = styled(Typography)(({ theme }) => ({
    color: theme.palette['primary'].main,
    fontSize: 14,
    marginRight: 16,
    fontWeight: 700,
}));

const StyledMessageEntry = styled(Box)(({ theme }) => ({
    backgroundColor: grey[100],
    padding: 12,
    borderRadius: 10,
    height: 'auto',
    maxWidth: 280,
    textAlign: 'left',
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
    color: 'black',
    wordBreak: 'break-word',
    '& > blockquote': {},
    '& > p': {
        fontSize: 14,
        margin: 0,
        wordBreak: 'break-word',
        '& > img': {
            width: '100%',
            objectFit: 'contain',
        },
    },
}));

const StyledInfoSender = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: 8,
}));

export const StyledWrapperAvatar = styled(Box)(({ theme }) => ({
    width: '40px',
    height: '40px',
}));

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => {
    return {
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette['grey'][300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette['text'].secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(theme.palette['primary'].main, theme.palette['action'].selectedOpacity),
                },
            },
        },
    };
});

const StyledExtension = styled(Box)<{ isSelf?: boolean }>(({ theme, isSelf }) => ({
    height: '40px',
}));

const StyledEdited = styled(Box)(({ theme }) => ({
    fontSize: '12px',
    color: 'grey',
}));

const StyledMore = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const BoxMessages = ({ currentUser, message, lastMessage }: BoxMessageProps) => {
    const createdAtLastMessage = getCreatedAtLastMessage(lastMessage);
    const [showExtension, setShowExtension] = React.useState(false);

    const {
        meta: { createdAt, updatedAt },
        attributes: { content = '', generator },
    } = message;

    const userIdMess: string = getUserIdFormMessage(message);
    const idDiff = moment(updatedAt).diff(moment(createdAt), 'seconds') > 0;

    const userIdLastMess = getUserIdFormLastMessage(lastMessage);

    const diff = moment(createdAt).diff(moment(createdAtLastMessage), 'minutes');

    const showImage = userIdMess !== userIdLastMess || (diff > 5 && diff < 1440);

    const name = getFullName(message);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (showExtension) setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditMessage = () => {
        const widgetEvent = new CustomEvent(CLIENT_EVENT.EDIT_MESSAGE, {
            detail: { content, _id: message._id },
        });
        window.dispatchEvent(widgetEvent);
        handleClose();
    };

    const handleDeleteMessage = async () => {
        const widgetEvent = new CustomEvent(CLIENT_EVENT.DELETE_MESSAGE, {
            detail: { _id: message._id },
        });
        window.dispatchEvent(widgetEvent);
        handleClose();
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <React.Fragment>
            {generator === 'User' ? (
                <StyledBoxMessage
                    onMouseOver={(e: any) => {
                        setShowExtension(true);
                    }}
                    onMouseOut={(e: any) => {
                        setShowExtension(false);
                    }}
                    render={isEqual(message?.attributes?.user?._id, currentUser?.id)}
                >
                    <StyledWrapperAvatar>
                        {showImage && <AvatarConversation user={message.attributes.user} />}
                    </StyledWrapperAvatar>
                    <StyledMessageEntry>
                        <React.Fragment>
                            <StyledInfoSender>
                                <StyledName>{name}</StyledName>
                                <TimeDisplayedConversation time={createdAt} />
                            </StyledInfoSender>

                            <StyledContentBox>{parse(`${content}`)}</StyledContentBox>
                        </React.Fragment>
                    </StyledMessageEntry>
                    <StyledMore>
                        <StyledExtension isSelf={isEqual(message.attributes.user?._id, currentUser?.id)}>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                {showExtension && <MoreVertIcon />}
                            </IconButton>
                            <StyledMenu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {isEqual(message.attributes.user?._id, currentUser?.id) ? (
                                    <>
                                        <MenuItem onClick={handleEditMessage} disableRipple>
                                            <EditIcon />
                                            Edit message
                                        </MenuItem>
                                        <MenuItem onClick={handleDeleteMessage} disableRipple>
                                            <DeleteIcon />
                                            Delete message
                                        </MenuItem>
                                    </>
                                ) : (
                                    <MenuItem disableRipple>Sample</MenuItem>
                                )}
                            </StyledMenu>
                            {/* <IconButton
                                    onClick={() => {}}
                                >
                                    <AddReactionIcon/>
                                </IconButton> */}
                        </StyledExtension>
                        <StyledEdited>
                            <i>{idDiff ? '(edited)' : ''}</i>
                        </StyledEdited>
                    </StyledMore>
                </StyledBoxMessage>
            ) : (
                <ServerMessages id={`server-message-${userIdMess}`} content={content} />
            )}
        </React.Fragment>
    );
};
