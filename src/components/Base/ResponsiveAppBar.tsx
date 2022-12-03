import { SvgIconComponent } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, Menu, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import * as React from 'react';
import { NavigateFunction } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface INavigationItem {
    id: string;
    name: string;
    icon: SvgIconComponent;
    path: string;
}

interface ResponsiveAppBarProps {
    currentLocation?: string;
    navigate: NavigateFunction;
}

const StyleLeftToolbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

const StyledSettingWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 0,
    display: 'flex',
    flexWrap: 'nowrap',
}));

const StyledIconButton = styled(Box)(({ theme }) => ({
    color: 'rgba(0, 0, 0, 0.54)',
}));

const navigationItems: INavigationItem[] = [
    { id: 'journey', name: 'Journey', icon: HomeIcon, path: '/home' },
    { id: 'discussion', name: 'Discussion', icon: GroupsIcon, path: '/discussions' },
    { id: 'workbook', name: 'Workbooks', icon: OndemandVideoIcon, path: '/workbook' },
    { id: 'event', name: 'Event', icon: CalendarTodayIcon, path: '/schedule' },
    { id: 'conversations', name: 'Conversation', icon: ChatBubbleOutlineIcon, path: '/rtc' },
];

export const ResponsiveAppBar = ({ currentLocation = 'rtc', navigate }: ResponsiveAppBarProps) => {
    // const { user }: any = useStore();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    // const location = useLocation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const renderNavigateItems = () => {
        return navigationItems.map((item: INavigationItem) => (
            <StyledIconButton
                key={item.id}
                aria-label={item.path}
                color={item.path === currentLocation ? 'primary' : 'default'}
                onClick={() => navigate(`${item?.path}`, { replace: true })}
            >
                {<item.icon />}
            </StyledIconButton>
        ));
    };

    return (
        <Box sx={{ height: 60, flexShrink: 0 }}>
            <Grid container sx={{ flexWrap: 'nowrap', height: '100%', padding: '0 10px' }}>
                <Grid item sx={{ margin: 'auto 0' }}>
                    <StyleLeftToolbar>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                display: { xs: 'flex' },
                                flexGrow: 1,
                                fontSize: 18,
                                fontWeight: 400,
                                textDecoration: 'none',
                                color: grey[500],
                            }}
                        >
                            Harvard Business School
                        </Typography>
                    </StyleLeftToolbar>
                </Grid>
                <Grid item xs={10} sx={{ margin: 'auto 0' }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex',
                                justifyContent: 'center',
                                alightItems: 'center',
                                gridGap: 50,
                                gap: 50,
                            },
                        }}
                    >
                        {renderNavigateItems()}
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        margin: 'auto 0',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <StyledSettingWrapper>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton></IconButton>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {/* <Avatar
                                            alt={`${user?.attributes['firstName']} ${user?.attributes['lastName']}`}
                                            src={user?.attributes['avatarUrl']}
                                        /> */}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </StyledSettingWrapper>
                </Grid>
            </Grid>
        </Box>
    );
};
