import { List, useMediaQuery, useTheme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import React from 'react';

interface ResponsiveDrawerProps {
    drawer?: React.ReactNode;
    openDrawer?: boolean;
}

const openedMixin = (theme: Theme, width: string, maxWidth: string): CSSObject => ({
    width: width,
    maxWidth: maxWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{
    width: string;
    maxWidth: string;
    height: string;
}>(({ theme, open, width, maxWidth, height }) => ({
    width: '100%',
    maxWidth: maxWidth,
    zIndex: 99,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme, width, maxWidth),
        '& .MuiDrawer-paper': openedMixin(theme, width, maxWidth),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
    '.MuiPaper-root': {
        height: height,
    },
}));

const StyledListConversation = styled(List)(({ theme }) => ({
    padding: 0,
}));

export const ResponsiveDrawer = ({ drawer, openDrawer }: ResponsiveDrawerProps) => {
    const theme = useTheme();
    const isShow = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Drawer
            height={!isShow ? 'calc(100vh - 56px)' : '100vh'}
            width="100%"
            maxWidth={isShow ? '380px' : '600px'}
            variant="permanent"
            open={openDrawer}
        >
            <StyledListConversation>{drawer}</StyledListConversation>
        </Drawer>
    );
};
