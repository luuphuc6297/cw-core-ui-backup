import { Box, Container, Grid, Hidden, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Banner, SSOHeader } from 'components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SSOProps {
    children: React.ReactElement;
    title: string;
    headerText?: string;
    redirectBtn?: string;
    onRedirect?: () => void;
}

const CustomTitle = styled(Typography)({
    marginBottom: 24,
});

// const CustomGridContainer = styled(Grid)({});

const CustomGridItem = styled(Grid)(({ theme }) => ({
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    },
}));

const CustomizedContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: theme.breakpoints.values.sm,
    },
}));

export function SSO({ headerText, children, redirectBtn, title, onRedirect }: SSOProps) {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Hidden smDown>
                    <Grid item xs={4}>
                        <Banner />
                    </Grid>
                </Hidden>
                <SSOHeader
                    headerText={headerText}
                    redirectBtn={redirectBtn}
                    onRedirect={onRedirect}
                    navigate={navigate}
                />
                <CustomGridItem item xs={8}>
                    <CustomizedContainer maxWidth="sm">
                        <CustomTitle variant="h1">{title}</CustomTitle>
                        {children}
                    </CustomizedContainer>
                </CustomGridItem>
            </Grid>
        </Box>
    );
}
