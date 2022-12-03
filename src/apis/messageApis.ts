import { ListResponse, Message } from 'models';
import axiosRTC from 'apis/clients/axiosRTC';

export const messageApis = {
    getMessages: (workspaceId: string, conversationId: string, pageNumber: number): Promise<ListResponse> => {
        const url = `/${workspaceId}/api/messages`;

        return axiosRTC.get(url, {
            params: {
                conversationId: conversationId,
                pageSize: 30,
                pageNumber: pageNumber,
            },
        });
    },
    createMessage: (workspaceId: string, conversationId: string, content: string): Promise<Message> => {
        const url = `/${workspaceId}/api/messages`;
        return axiosRTC.post(url, {
            content: content,
            conversationId: conversationId,
        });
    },
    updateMessage: (workspaceId: string, messageId: string, content: string): Promise<Message> => {
        const url = `/${workspaceId}/api/messages/${messageId}`;
        return axiosRTC.patch(url, { content: content });
    },
    deleteMessage: (workspaceId: string, messageId: string): Promise<Message> => {
        const url = `/${workspaceId}/api/messages/${messageId}`;
        return axiosRTC.delete(url);
    },
    startTyping: (workspaceId: string, conversationId: string): Promise<any> => {
        const url = `/${workspaceId}/api/typing/start`;
        return axiosRTC.post(url, {
            conversationId: conversationId,
        });
    },
    stopTyping: (workspaceId: string, conversationId: string): Promise<any> => {
        const url = `/${workspaceId}/api/typing/stop`;
        return axiosRTC.post(url, {
            conversationId: conversationId,
        });
    },
};
