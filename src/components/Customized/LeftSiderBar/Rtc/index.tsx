import { Box } from '@mui/material';
import { Conversation, CreateConversationForm, ItemResponse, ListResponse, Message, MetaParams } from 'models';
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { LeftSidebarRtc } from './LeftSidebarRtc';
import { SearchConversationRtc } from './SearchConversationRtc';
interface RtcLeftSidebarProps {
    conversations: ItemResponse[] & Message[];
    filter: MetaParams | any;
    onChange?: (newFilter: MetaParams) => void;
    onSearchChange?: (newFilter: MetaParams) => void;
    onClick: (conversation: Conversation) => void;
    onSubmit?: (formValues: CreateConversationForm, onCancel: any) => Promise<void>;
    users: any | ListResponse;
    navigate: NavigateFunction;
}

export const RtcLeftSidebar = ({
    conversations,
    filter,
    onChange,
    onSearchChange,
    onClick,
    onSubmit,
    users,
    navigate,
}: RtcLeftSidebarProps) => {
    const [isSearchMode, setIsSearchMode] = useState(false);

    const handleOnClickSearch = () => {
        setIsSearchMode((preState) => !preState);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            {isSearchMode ? (
                <SearchConversationRtc
                    onCloseSearch={handleOnClickSearch}
                    conversations={conversations}
                    navigate={navigate}
                />
            ) : (
                <LeftSidebarRtc
                    {...{ onSubmit, conversations, users, onClick, navigate }}
                    onClickSearch={handleOnClickSearch}
                />
            )}
        </Box>
    );
};
