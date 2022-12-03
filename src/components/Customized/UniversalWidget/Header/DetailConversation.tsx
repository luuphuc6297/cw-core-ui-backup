import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton } from '@mui/material';
import { MainLayoutContext } from 'layouts';
import * as React from 'react';

export default function DetailConversationPopover() {
    const { isShowRightSidebar, setIsShowRightSidebar } = React.useContext(MainLayoutContext);

    return isShowRightSidebar ? (
        <></>
    ) : (
        <IconButton component="label" onClick={setIsShowRightSidebar}>
            <MenuOpenIcon />
        </IconButton>
    );
}
