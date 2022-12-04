import { RightSidebarRtc, RtcLeftSidebar } from 'components';
import { MainLayout } from 'layouts';
import { RTCSocketProvider, socketRtc } from 'providers/Home/Rtc/Socket';
import React from 'react';
import { getTokenAuth } from 'utils';
import GetPayload from './GetPayload';

const RtcContainer = () => {
    const token = getTokenAuth();

    React.useEffect(() => {
        socketRtc.emit('REQUEST_JOIN_CONVERSATIONS', { headers: { Authorization: token } });
    }, [token]);

    return (
        <RTCSocketProvider token={token}>
            <GetPayload />
            {/* <MainLayout
                    rightSidebar={
                        <RightSidebarRtc
                            uploadAvatar={uploadAvatar}
                            usersConversation={usersConversation}
                            users={users}
                            onAddMember={onAddMember}
                        />
                    }
                    leftSidebar={
                        <RtcLeftSidebar
                            filter={{ page: 1, limit: 15 }}
                            conversations={conversations.data}
                            onChange={handleFilterChange}
                            onSearchChange={handleSearchChange}
                            onClick={(item: Conversation) => {
                                setConversation(item);
                            }}
                            onSubmit={onSubmit}
                            users={users}
                            navigate={navigate}
                        />
                    }
                >
                    <Chatting
                        workspace={workspace}
                        typing={typing}
                        conversation={conversation}
                        currentUser={user}
                        valueEditor={valueEditor}
                        loadMessages={loadMessages}
                        sendMessage={handleSendMessage}
                        messages={messages}
                        editing={editing}
                        onSaveEditMessage={onSaveEditMessage}
                        onCancelEditMessage={onCancelEditMessage}
                        handleInit={handleInit}
                        countLengthValue={length}
                    />
                </MainLayout> */}
        </RTCSocketProvider>
    );
};

export default RtcContainer;
