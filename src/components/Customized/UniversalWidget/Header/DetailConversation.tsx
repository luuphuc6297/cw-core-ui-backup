import * as React from 'react';
import { IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { MainLayoutContext } from 'layouts';

export default function DetailConversationPopover() {
    const { isShowRightSidebar, setIsShowRightSidebar } = React.useContext(MainLayoutContext);

    return isShowRightSidebar ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
    ) : (
        <IconButton component="label" onClick={setIsShowRightSidebar}>
            <MenuOpenIcon />
        </IconButton>
    );
}
