import { Box } from '@mui/material';
import { DATA_FAKE } from 'containers/Home/Rtc/data';
import { isNull } from 'lodash';
import React from 'react';
import { ConversationItem } from '../../ConversationItem';
import { FindingConversation } from './FindConversation';

export const SearchConversationRtc = ({ onCloseSearch }: any) => {
    const handleOnChangeSearch = (value: string) => {
        console.log(value, 'value');
    };

    const conversations = DATA_FAKE.conversations.data;

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
        >
            <FindingConversation onCloseSearch={onCloseSearch} debouncedOnChange={handleOnChangeSearch} />

            <Box sx={{ display: 'flex', flexDirection: 'column', flexShrink: 1, overflowY: 'auto' }}>
                {conversations.map((conversation: any) => (
                    <React.Fragment key={conversation._id}>
                        {!isNull(conversation) && (
                            <ConversationItem
                                key={conversation._id}
                                conversation={conversation}
                                handleListItemClick={(idConversation) => {
                                    console.log(`/rtc/${idConversation}`);
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};
