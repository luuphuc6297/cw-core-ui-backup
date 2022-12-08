import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { isNull } from 'lodash';
import { Conversation, ItemResponse, Message } from 'models';
import React from 'react';
import { ConversationItem } from '../../ConversationItem';

interface ListConversationsProps {
    conversations: ItemResponse[] & Message[];
    onClick: (conversation: Conversation) => void;
}

const StyledCollapse = styled(Collapse)(({ theme }) => ({
    height: '100% !important',
    overflow: 'auto',
}));

export const ListConversations = ({ conversations, onClick }: ListConversationsProps) => {
    const [open, setOpen] = React.useState(true);

    return (
        <>
            <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <StyledCollapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ overflowY: 'auto' }} disablePadding>
                    {conversations.map((conversation: any) => (
                        <React.Fragment key={conversation._id}>
                            {!isNull(conversation) && (
                                <ConversationItem
                                    key={conversation._id}
                                    conversation={conversation}
                                    handleListItemClick={(idConversation) => {
                                        console.log(`/rtc/${idConversation}`);
                                        onClick(conversation);
                                    }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </StyledCollapse>
        </>
    );
};
