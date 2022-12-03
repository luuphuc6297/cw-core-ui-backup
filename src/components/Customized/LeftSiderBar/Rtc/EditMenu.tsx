import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { Menu, MenuItem, styled, Typography } from '@mui/material';
import { CLIENT_EVENT } from 'utils';

interface EditMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
}

const StyledIconPerson = styled(PersonAddAltOutlinedIcon)(({ theme }) => ({
    marginRight: 16,
}));

const StyledIconList = styled(PlaylistAddCheckOutlinedIcon)(({ theme }) => ({
    marginRight: 16,
}));
export const EditMenu = ({ anchorEl, open, onClose }: EditMenuProps) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem
                onClick={() => {
                    const widgetEvent = new CustomEvent(CLIENT_EVENT.ON_OFF_MODAL, { detail: 'create-conversation' });
                    window.dispatchEvent(widgetEvent);
                }}
            >
                <StyledIconPerson />
                <Typography>New conversation</Typography>
            </MenuItem>
            <MenuItem onClick={onClose}>
                <StyledIconList />
                <Typography>Select</Typography>
            </MenuItem>
        </Menu>
    );
};
