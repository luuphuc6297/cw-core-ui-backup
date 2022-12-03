import * as React from 'react';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, Divider, List, ListItem, ListItemText } from '@mui/material';
import { LinksConversationUI } from './LinksConversationUI';

import { FilesConversationUI } from './FilesConversationUI';

export const LinksCollection = () => {
    const [openImages, setOpenImages] = React.useState<boolean>(false);
    const [openFiles, setOpenFiles] = React.useState<boolean>(false);

    const handleClickImages = () => setOpenImages(!openImages);
    const handleClickFiles = () => setOpenFiles(!openFiles);

    return (
        <React.Fragment>
            <List component="nav" aria-labelledby="list-images">
                <ListItem button onClick={handleClickImages}>
                    <ListItemText primary="Share media" />
                    {openImages ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openImages} timeout="auto" unmountOnExit>
                    <LinksConversationUI />
                </Collapse>
            </List>
            <Divider />
            <List component="nav" aria-labelledby="list-files">
                <ListItem button onClick={handleClickFiles}>
                    <ListItemText primary="Share files" />
                    {openFiles ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openFiles} timeout="auto" unmountOnExit>
                    <FilesConversationUI />
                </Collapse>
            </List>
            <Divider />
        </React.Fragment>
    );
};
