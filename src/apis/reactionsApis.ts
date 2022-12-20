import axiosDiscussions from './clients/axiosDiscussions';

export const reactionApis = {
    getReactionsPost: (workspaceId: string, postId: string): Promise<any> => {
        const url = `${workspaceId}/api/reactions`;

        return axiosDiscussions.get(url, {
            params: {
                postId,
            },
        });
    },
    createReaction: (workspaceId: string, postId: string, type: string): Promise<any> => {
        const url = `${workspaceId}/api/reactions`;

        return axiosDiscussions.post(url, {
            body: {
                postId,
                type,
            },
        });
    },
    updateReactions: (workspaceId: string, reactionId: string, type: string): Promise<any> => {
        const url = `${workspaceId}/api/reactions/${reactionId}`;

        return axiosDiscussions.patch(url, {
            body: {
                type,
            },
        });
    },
};
