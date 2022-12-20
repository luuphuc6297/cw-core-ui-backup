import { ListResponse } from 'models';
import axiosDiscussions from './clients/axiosDiscussions';

export const postsApis = {
    getAllPostsCommunity: (workspaceId: string, communityId: string): Promise<ListResponse> => {
        const url = `${workspaceId}/api/posts`;

        return axiosDiscussions.get(url, {
            params: {
                communityId: communityId,
            },
        });
    },
    getPostDetail: (workspaceId: string, postId: string): Promise<any> => {
        const url = `${workspaceId}/api/posts/${postId}`;
        return axiosDiscussions.get(url);
    },
    createPost: (workspaceId: string, communityId: string, content: string): Promise<any> => {
        const url = `${workspaceId}/api/posts/`;

        return axiosDiscussions.post(url, {
            body: {
                communityId: communityId,
                content: content,
            },
        });
    },
    updatePost: (workspaceId: string, postId: string, content: string): Promise<any> => {
        const url = `${workspaceId}/api/posts/${postId}`;

        return axiosDiscussions.patch(url, {
            body: {
                content,
            },
        });
    },
    archivePost: (workspaceId: string, postId: string) => {},
};
