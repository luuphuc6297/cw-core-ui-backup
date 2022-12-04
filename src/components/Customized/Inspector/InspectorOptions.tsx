import EditIcon from '@mui/icons-material/Edit';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from '@mui/material';
import React from 'react';
import { timeout } from 'utils';

interface IInspectorOptionsProps {
    conversationId: string;
    title: string;
    handleChange: (value: string, conversationId: string) => void;
}

export const InspectorOptions = ({ conversationId, title, handleChange }: IInspectorOptionsProps) => {
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [hidden, setHidden] = React.useState<boolean>(true);

    const handleClick = () => setOpen(!open);

    const handleOpenDialog = async () => {
        setOpenDialog(true);
        const el = document.getElementById('setting-universal');
        if (!el) return;
        const settings = el.querySelector('.MuiBox-root .settings');
        if (!settings) return;
        await timeout(500);
        const dialogChangeTitle: any = document.getElementById('dialog-change-title');
        settings.appendChild(dialogChangeTitle);
    };

    const handleClose = () => {
        setHidden(true);
        const el = document.getElementById('dialog-change-title');
        if (!el) return;
        document.body.appendChild(el);
        setOpenDialog(false);
    };

    const [customTitle, setTitle] = React.useState(title);

    React.useEffect(() => {
        setTitle(title);
    }, [title]);

    const changeTitle = (e: any) => {
        const { value } = e.target;
        setTitle(value);
    };

    const updateTitle = () => {
        handleChange(customTitle, conversationId);
    };

    const loadModal = (value: boolean) => {
        setHidden(value);
    };

    return (
        <List component="nav" aria-labelledby="list-users">
            <ListItem button onClick={handleClick}>
                <ListItemText primary="Custom chat" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className="change_title" onClick={handleOpenDialog}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change title" />
                    </ListItem>
                    <ListItem button className="change_photo">
                        <ListItemIcon>
                            <ImageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change photo" />
                    </ListItem>
                </List>
            </Collapse>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="dialog-change-title-conversation"
                className={`${hidden ? 'd-none' : 'd-block'}`}
                id="dialog-change-title"
            >
                <DialogTitle id="dialog-change-title-conversation">{'Change title'}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        variant="filled"
                        value={customTitle}
                        onChange={changeTitle}
                        className="w-100"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                    <Button
                        onClick={() => {
                            updateTitle();
                            handleClose();
                        }}
                        color="primary"
                        autoFocus
                        disabled={!customTitle}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    );
};
