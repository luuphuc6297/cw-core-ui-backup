import { Box, Button, List, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { isNull, take } from 'lodash';
import { ItemResponse } from 'models';
import React from 'react';
import { CLIENT_EVENT } from 'utils';
import { ConversationItem } from '../ConversationItem';
// import { useConversationStore } from 'app/conversation-store';
// import { ConversationSlice } from 'app/slices';
import { ListItemLazy } from '../ListItemLazy';

// import './style.scss';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: 16,
    margin: 16,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const StyledSeeAllBtn = styled(Button)(({ theme }) => ({
    background: 'transparent',
    width: 80,
    height: 32,
    textTransform: 'initial',
}));

const StyledStartConversationBtn = styled(Button)(({ theme }) => ({
    fontWeight: 600,
}));

export const ConversationsUI = () => {
    // const conversations = useConversationStore((state: ConversationSlice) => state.conversations);

    // const loading = useConversationStore((state: ConversationSlice) => state.loading);

    const goToConversation = (id: string) => {
        const widgetEvent1 = new CustomEvent(CLIENT_EVENT.ID_CONVERSATION, id as any);
        window.dispatchEvent(widgetEvent1);

        const widgetEvent = new CustomEvent(CLIENT_EVENT.REDIRECT_UNIVERSAL, { route: '/conversations' } as any);
        window.dispatchEvent(widgetEvent);
    };

    const createConversation = () => {
        const widgetEvent = new CustomEvent(CLIENT_EVENT.REDIRECT_UNIVERSAL, { route: '/create-conversations' } as any);
        window.dispatchEvent(widgetEvent);
    };

    // const elmItem = take(conversations.data, 2).map((conversation: ItemResponse, index: number) => {
    //     return (
    //         <React.Fragment key={index}>
    //             {!isNull(conversation) && (
    //                 <ConversationItem
    //                     key={index}
    //                     index={index}
    //                     conversation={conversation}
    //                     handleListItemClick={goToConversation}
    //                 />
    //             )}
    //         </React.Fragment>
    //     );
    // });

    const loadingItem = [1, 2].map((item: number) => {
        return <ListItemLazy key={item} />;
    });

    return (
        <StyledPaper className="conversations">
            <StyledBox>
                <Typography variant="subtitle2">RECENT CONVERSATIONS</Typography>
                <StyledSeeAllBtn color="primary">See all</StyledSeeAllBtn>
            </StyledBox>
            <List component="nav" aria-label="communication">
                {/* {!loading ? elmItem : loadingItem} */}
            </List>
            <StyledStartConversationBtn variant="outlined" onClick={createConversation} color="primary">
                Start conversation
            </StyledStartConversationBtn>
        </StyledPaper>
    );
};
