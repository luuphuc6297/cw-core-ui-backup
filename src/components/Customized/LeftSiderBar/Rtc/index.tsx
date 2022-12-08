import { Box } from '@mui/material';
import { useState } from 'react';
import { LeftSidebarRtc } from './LeftSidebarRtc';
import { SearchConversationRtc } from './SearchConversationRtc';

export const RtcLeftSidebar = () => {
    const [isSearchMode, setIsSearchMode] = useState(false);

    const handleOnClickSearch = () => {
        setIsSearchMode((preState) => !preState);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            {isSearchMode ? (
                <SearchConversationRtc onCloseSearch={handleOnClickSearch} />
            ) : (
                <LeftSidebarRtc onClickSearch={handleOnClickSearch} />
            )}
        </Box>
    );
};
