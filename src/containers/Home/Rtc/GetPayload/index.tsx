import React from 'react';
import { useParams } from 'react-router-dom';
import { useConversationList, useConversationUpdate, useMessageUpdate } from 'services';
import { useUserList } from 'services/users';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, MessageSlice, WorkSpaceSlice } from 'store/zustand/slices';

const GetPayload = () => {
    const { id: conversationId } = useParams();
    const { setConversations } = useRtcStore((state: ConversationSlice) => state);

    const { setUsers, workspace } = useRtcStore((state: WorkSpaceSlice) => state);

    const { clearMessage, getDataMessages } = useRtcStore((state: MessageSlice) => state);
    const { data: conversations } = useConversationList(workspace.id, {
        limit: 30,
        count: 0,
        totalPages: 1,
        skip: 0,
    });

    const { data: users } = useUserList(workspace.id);

    // const { messages } = useMessageList(
    //     workspace.id,
    //     "9e27a779-b4cc-418c-acb7-03767c941b4c", {
    //     limit: 30,
    //     count: 0,
    //     totalPages: 1,
    //     skip: 0,
    // });

    const { mutate: messageUpdate, ...messageUpdateData } = useMessageUpdate(workspace.id, {
        onSuccess: (data, login) => {
            console.log(data);
        },
        onError: (_, error) => {
            console.log(error);
        },
    });

    const { mutate: conversationUpdate, ...conversationUpdateData } = useConversationUpdate(workspace.id, {
        onSuccess: (data, login) => {
            console.log(data);
        },
        onError: (_, error) => {
            console.log(error);
        },
    });

    const updateConversation = () =>
        conversationUpdate({
            _id: '9e27a779-b4cc-418c-acb7-03767c941b4c',
            attributes: {
                contextId: 1,
                imageUrl: '',
                userCount: 3,
                recentActivities: [
                    {
                        _id: 'b02389a4-64f6-46fe-a4ed-6e79f8027fbc',
                        email: 'phuc.dinh@coachingcloud.io',
                        avatarPath: null,
                        firstName: 'Phuc',
                        lastName: 'Dinh',
                    },
                    {
                        _id: 'dec67e95-9dbb-4e63-96d0-3ef1e1cb56ea',
                        email: 'luuphuc6297+49991@gmail.com',
                        firstName: 'Phuc',
                        lastName: 'Luu',
                        avatarUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                    },
                ],
                status: 'Active',
                mode: 'Private',
                title: 'test conversation create 2',
                color: '#00bcd4',
                lastMessage: {
                    contentType: 'Text',
                    generator: 'Server',
                    _id: 'c10b62a6-2f6f-45d6-8454-2cf4e975e288',
                    conversationId: '9e27a779-b4cc-418c-acb7-03767c941b4c',
                    content: 'Phuc Dinh has added Phuc DT to the conversation',
                    createdAt: '2022-12-01T04:45:05.825Z',
                    updatedAt: '2022-12-01T04:45:05.825Z',
                },
                user: {
                    _id: 'b02389a4-64f6-46fe-a4ed-6e79f8027fbc',
                    email: 'phuc.dinh@coachingcloud.io',
                    firstName: 'Phuc',
                    lastName: 'Dinh',
                },
            },
            meta: {
                createdAt: '2022-12-01T04:44:39.947Z',
                updatedAt: '2022-12-01T04:45:05.818Z',
                respondedAt: '2022-12-06T02:55:28.663Z',
            },
            type: '',
        });

    const updateMessage = () =>
        messageUpdate({
            _id: '48302f18-6438-4737-8ca4-40ca1b33433b',
            type: 'Message',
            attributes: {
                contentType: 'Text',
                generator: 'Server',
                _id: '48302f18-6438-4737-8ca4-40ca1b33433b',
                conversationId: '9e27a779-b4cc-418c-acb7-03767c941b4c',
                content: 'Phuc Dinh updated the conversation',
            },
            meta: {
                createdAt: '2022-12-07T13:21:05.062Z',
                updatedAt: '2022-12-07T13:21:05.062Z',
                respondedAt: '2022-12-07T13:42:02.985Z',
            },
            content: 'hello',
        });

    React.useEffect(() => {
        if (conversations) setConversations(conversations);
    }, [conversations]);

    React.useEffect(() => {
        if (users) setUsers(users);
    }, [users]);

    React.useEffect(() => {
        if (conversationId) {
            clearMessage();
            getDataMessages(workspace.id, conversationId, 1);
        }
    }, []);

    return <React.Fragment />;
};
export default GetPayload;
