import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

export const FilesConversationUI = () => {
    const files: any = [];

    const filesElm = files.map(({ attributes }: any) => {
        return (
            <React.Fragment>
                <Link
                    href={attributes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{ color: 'black' }}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <InsertDriveFileIcon />
                        </ListItemIcon>
                        <ListItemText primary={attributes.name || 'default_file.pdf'} />
                    </ListItem>
                </Link>
            </React.Fragment>
        );
    });
    return (
        <List component="nav" aria-label="main mailbox folders">
            {filesElm}
        </List>
    );
};
