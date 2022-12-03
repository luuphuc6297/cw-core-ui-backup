import { RTCSocketProvider, socketRtc } from 'providers/Home/Rtc/Socket';
import React from 'react';
import { getTokenAuth } from 'utils';

const RtcContainer = () => {
    const token = getTokenAuth();

    React.useEffect(() => {
        socketRtc.emit('REQUEST_JOIN_CONVERSATIONS', { headers: { Authorization: token } });
    }, [token]);

    return (
        <RTCSocketProvider token={token}>
            <div>this rtc</div>
        </RTCSocketProvider>
    );
};

export default RtcContainer;
