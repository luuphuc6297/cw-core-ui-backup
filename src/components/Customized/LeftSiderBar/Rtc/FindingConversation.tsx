import { Box, OutlinedInput, styled } from '@mui/material';
import { MetaParams } from 'models';
import * as React from 'react';

interface FindingConversationProps {
    filter: MetaParams | any;
    onChange?: (newFilter: MetaParams) => void;
    onSearchChange?: (newFilter: MetaParams) => void;
}

const StyledSearchConversationArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: 64,
    justifyContent: 'space-between',
    flex: 1,
}));

const StyledSearchField = styled(OutlinedInput)(({ theme }) => ({
    width: '100%',
    height: 32,
    borderRadius: 8,
}));

export const FindingConversation = ({ filter, onChange, onSearchChange }: FindingConversationProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: MetaParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFilter);
    };

    return (
        <StyledSearchConversationArea>
            <StyledSearchField />
        </StyledSearchConversationArea>
    );
};
