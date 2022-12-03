import { Box, Divider, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

export const ListItemLazy = () => {
    return (
        <Box>
            <ListItem>
                <ListItemAvatar>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                    primary={<Skeleton animation="wave" height={20} width="20%" />}
                    secondary={<Skeleton animation="wave" height={20} width="50%" />}
                />
            </ListItem>
            <Divider />
        </Box>
    );
};
