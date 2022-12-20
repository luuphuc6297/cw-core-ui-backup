import { commentsApis } from 'apis/commentApis';
import { ListResponse } from 'models';
import { StateCreator } from 'zustand';

export interface CommentSlice {
    loading: boolean;
    comments: ListResponse;
    getAllCommentPost: (workspaceId: string, postId: string) => void;
    createComment: (workspaceId: string, postId: string, content: string) => void;
}

const initComment: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

export const createCommentSlice: StateCreator<
    CommentSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
    comments: initComment,
    getAllCommentPost: async (workspaceId: string, postId: string) => {
        const result = await commentsApis.getCommentsPost(workspaceId, postId);

        set(() => ({ comments: result }));
    },
    createComment: async (workspaceId: string, postId: string, content: string) => {
        await commentsApis.createComment(workspaceId, postId, content);
    },
});
