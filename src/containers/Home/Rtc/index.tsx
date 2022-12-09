import { RightSidebarRtc, RtcLeftSidebar } from 'components';
import { MainLayout } from 'layouts';
import { RTCSocketProvider, socketRtc } from 'providers/Home/Rtc/Socket';
import React from 'react';
import { getTokenAuth } from 'utils';
import AreaContentRtc from './AreaContentRtc';
import GetPayload from './GetPayload';

const RtcContainer = () => {
    const token = getTokenAuth();

    React.useEffect(() => {
        socketRtc.emit('REQUEST_JOIN_CONVERSATIONS', { headers: { Authorization: token } });
    }, [token]);

    return (
        <RTCSocketProvider token={token}>
            <GetPayload />
            <MainLayout rightSidebar={<RightSidebarRtc />} leftSidebar={<RtcLeftSidebar />}>
                <AreaContentRtc />
            </MainLayout>
        </RTCSocketProvider>
    );
};

export default RtcContainer;
