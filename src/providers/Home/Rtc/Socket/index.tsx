import { ClientToServerEvents, CurrentUser, IResponseSocket, ResponseSocketItem, ServerToClientEvents } from 'models';
import React from 'react';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, MessageSlice, TypingSlice, WorkSpaceSlice } from 'store/zustand/slices';
import { SOCKET_EVENT } from 'utils';

import io, { Socket } from 'socket.io-client';

interface RTCSocketProviderProps {
    children?: React.ReactNode;
    token: string;
}

export const socketRtc: Socket<ServerToClientEvents, ClientToServerEvents | any> = io(
    'https://dev-rtc-api.coachingworkspace.com',
    { transports: ['websocket'] }
);

export const SocketContext = React.createContext({});

export const RTCSocketProvider = ({ children, token }: RTCSocketProviderProps) => {
    const workspace = useRtcStore((state: WorkSpaceSlice | any) => state.workspace);

    const updateMessagesFromSocket = useRtcStore((state: MessageSlice) => state.updateMessagesFromSocket);
    const {
        createNewConversationSuccess,
        swapConversationsPosition,
        updateDataConversationDetailFromSocket,
        updateLastMessageOfConversationInList,
    } = useRtcStore((state: ConversationSlice) => state);

    const { getStartTypingUser, removeStartTypingUser } = useRtcStore((state: TypingSlice) => state);

    React.useEffect(() => {
        socketRtc.on('connect', () => {
            console.log('SOCKET CONNECTED');
        });

        socketRtc.on('WOOF_WOOF', () => {
            setTimeout(() => {
                socketRtc.emit('MEOW_MEOW', {
                    headers: { Authorization: token },
                });
            }, 30000);
        });
        socketRtc.on('RESPONSE_CREATE_CONVERSATION', (data: any) => {
            createNewConversationSuccess(data);
            // (async () => {
            //     await getUsersConversation(workspace.id, data._id);
            // })();

            socketRtc.emit('REQUEST_JOIN_CONVERSATION', {
                body: { conversationId: data._id },
                headers: { Authorization: token },
            });
        });

        socketRtc.on('RESPONSE_UPDATE_CONVERSATION', (data: ResponseSocketItem) => {
            const { _id: conversationId } = data;
            (async () => {
                await updateDataConversationDetailFromSocket(conversationId, data);
            })();
        });

        socketRtc.on('RESPONSE_JOIN_CONVERSATION', async (data: any) => {
            console.log('RESPONSE_JOIN_CONVERSATION', data);
            // const conversation = await conversationApis.getConversationDetail(
            //     workspace.id,
            //     data.attributes.conversationId
            // );
            // createNewConversationSuccess(data as any);
        });

        socketRtc.on('RESPONSE_JOIN_CONVERSATIONS', async (data: any) => {
            console.log('RESPONSE_JOIN_CONVERSATIONS', data);
        });

        socketRtc.on('SYSTEM_NOTIFICATION', (data: IResponseSocket) => {
            if (data.attributes.requestType === SOCKET_EVENT.REQUEST_DELETE_CONVERSATION) {
                console.log(SOCKET_EVENT.REQUEST_DELETE_CONVERSATION);
            }
            if (data.attributes.requestType === SOCKET_EVENT.REQUEST_INVITE_USER) {
                socketRtc.emit('REQUEST_JOIN_CONVERSATION', {
                    body: { conversationId: data.attributes.conversationId },
                    headers: { Authorization: token },
                });
            }
        });

        socketRtc.on('RESPONSE_START_TYPING', (data: IResponseSocket) => {
            const user: any = data.attributes;
            getStartTypingUser(user);
        });

        socketRtc.on('RESPONSE_STOP_TYPING', (data: IResponseSocket) => {
            const user: CurrentUser | any = data.attributes;
            removeStartTypingUser(user);
        });

        socketRtc.on('RESPONSE_CREATE_MESSAGE', (data: ResponseSocketItem) => {
            const allPromise = Promise.all([
                updateMessagesFromSocket(data),
                swapConversationsPosition(data._id),
                // remove update message conversation[]
                updateLastMessageOfConversationInList(data),
            ]);
            (async () => {
                await allPromise;
            })();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRtc, token, workspace?.id]);

    return <SocketContext.Provider value={socketRtc}>{children}</SocketContext.Provider>;
};
