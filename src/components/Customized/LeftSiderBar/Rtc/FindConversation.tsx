import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, InputAdornment, OutlinedInput, styled } from '@mui/material';
import { debounce } from 'lodash';
import * as React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
interface FindingConversationProps {
    debouncedOnChange?: (value: string) => void;
    onCloseSearch: () => void;
}

const StyledSearchConversationArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    justifyContent: 'space-between',
    height: 64,
    top: 0,
    flexShrink: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}));

const StyledWrapperButton = styled(Box)(({ theme }) => ({
    width: '100%',
}));

const StyledSearchInput = styled(OutlinedInput)(({ theme }) => ({
    height: 34,
    borderRadius: 8,
    width: '100%',
    transitions: 'all 0.1s ease-in-out',
}));

const StyledSearchIcon = styled('img')(({ theme }) => ({
    width: 18,
    height: 18,
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
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchOutlinedIcon />
                        </InputAdornment>
                    }
                    endAdornment={
                        <IconButton
                            onClick={onCloseSearch}
                            sx={{
                                width: 24,
                                height: 24,
                                color: 'black',
                                '&:hover': {},
                            }}
                        >
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
