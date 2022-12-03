import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { BottomNavigation, BottomNavigationAction, Divider, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ResponsiveAppBar } from 'components';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutContext } from './MainLayoutContext';

interface MainLayoutProps {
    children?: React.ReactNode;
    leftSidebar?: React.ReactElement;
    rightSidebar?: React.ReactElement;
}

export const MainLayout = ({ children, leftSidebar, rightSidebar }: MainLayoutProps) => {
    const theme = useTheme();
    const isShow = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(0);
    const [isShowRightSidebar, setIsShowRightSidebar] = React.useState(false);
    const navigate = useNavigate();

    const handleToggleRightSideBar = React.useCallback(() => {
        setIsShowRightSidebar((preState) => !preState);
    }, []);

    const mainLayoutContext = React.useMemo(() => {
        return { isShowRightSidebar, setIsShowRightSidebar: handleToggleRightSideBar };
    }, [handleToggleRightSideBar, isShowRightSidebar]);

    return (
        <MainLayoutContext.Provider value={mainLayoutContext}>
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ResponsiveAppBar navigate={navigate} />
                <Divider light />
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    <Box
                        sx={{
                            width: isShow ? '100%' : 380,
                            display: 'flex',
                            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                            flexDirection: 'column',
                        }}
                    >
                        {leftSidebar && leftSidebar}
                    </Box>
                    {!isShow && <Box sx={{ flex: '1' }}>{children}</Box>}
                    <Box
                        sx={{
                            width: isShowRightSidebar ? 300 : 0,
                            transition: 'width 0.5s',
                            flexShrink: 0,
                            position: 'relative',
                            borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        {rightSidebar && rightSidebar}
                    </Box>
                </Box>

                {isShow && (
                    <Paper>
                        <BottomNavigation
                            showLabels={false}
                            value={value}
                            onChange={(_, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction showLabel={false} icon={<HomeIcon />} />
                            <BottomNavigationAction showLabel={false} icon={<PeopleIcon />} />
                            <BottomNavigationAction showLabel={false} icon={<ChatBubbleOutlineIcon />} />
                            <BottomNavigationAction showLabel={false} icon={<CalendarTodayIcon />} />
                        </BottomNavigation>
                    </Paper>
                )}
            </Box>
        </MainLayoutContext.Provider>
    );
};
