import { ListResponse } from 'models';
import axiosDiscussions from './clients/axiosDiscussions';

export const commentsApis = {
    getCommentsPost: (workspaceId: string, postId: string): Promise<ListResponse> => {
        const url = `/${workspaceId}/api/comments`;

        return axiosDiscussions.get(url, {
            params: {
                postId,
            },
        });
    },
    getCommentDetail: (workspaceId: string, commentId: string): Promise<any> => {
        const url = `/${workspaceId}/api/comments/${commentId}`;

        return axiosDiscussions.get(url);
    },
    createComment: (workspaceId: string, postId: string, content: string): Promise<any> => {
        const url = `/${workspaceId}/api/comments`;

        return axiosDiscussions.post(url, {
            body: {
                postId,
                content,
            },
        });
    },
    updateComment: (workspaceId: string, commentId: string, content: string): Promise<any> => {
        const url = `/${workspaceId}/api/comments/${commentId}`;

        return axiosDiscussions.patch(url, {
            body: {
                content,
            },
        });
    },
};
