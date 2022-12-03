import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, OutlinedInput, styled } from '@mui/material';
import { debounce } from 'lodash';
import * as React from 'react';

interface FindingConversationProps {
    debouncedOnChange?: (value: string) => void;
    onCloseSearch: () => void;
}

const StyledSearchConversationArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: 60,
    justifyContent: 'space-between',
    top: 0,
    flexShrink: 0,
}));

const StyledWrapperButton = styled(Box)(({ theme }) => ({
    width: '100%',
}));

const StyledSearchInput = styled(OutlinedInput)(({ theme }) => ({
    height: 34,
    borderRadius: 8,
    width: '100%',
}));

export const FindingConversation = ({ debouncedOnChange, onCloseSearch }: FindingConversationProps) => {
    const [value, setValue] = React.useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedChangeHandler = React.useCallback(
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            debouncedOnChange && debouncedOnChange(e.target.value);
        }, 300),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <StyledSearchConversationArea>
            <StyledWrapperButton>
                <StyledSearchInput
                    id="searchByName"
                    placeholder="Search by name"
                    endAdornment={
                        <IconButton onClick={onCloseSearch}>
                            <CloseIcon />
                        </IconButton>
                    }
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        debouncedChangeHandler(e);
                        handleChange(e);
                    }}
                />
            </StyledWrapperButton>
        </StyledSearchConversationArea>
    );
};
