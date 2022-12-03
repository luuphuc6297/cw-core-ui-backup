import React from 'react';

export const DEFAULT_VALUE_LAYOUT = {
    isShowRightSidebar: false,
    setIsShowRightSidebar: () => { },
};

export const MainLayoutContext = React.createContext(DEFAULT_VALUE_LAYOUT);
