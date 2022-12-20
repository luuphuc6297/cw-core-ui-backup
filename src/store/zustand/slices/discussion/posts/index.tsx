import { postsApis } from 'apis/postsApis';
import { ListResponse, Post } from 'models';
import { StateCreator } from 'zustand';

export interface PostsSlice {
    loading: boolean;
    posts: ListResponse;
    post: Post;
    getPosts: (workspaceId: string, communityId: string) => void;
    createPost: (workspaceId: string, communityId: string, content: string) => void;
}

const initPosts: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initPost: Post = {
    _id: '',
    type: 'Post',
    attributes: {
        communityId: '',
        content: '',
        user: {
            _id: '',
            email: '',
            createdAt: '',
            updatedAt: '',
            avatarUrl: '',
            firstName: '',
            lastName: '',
        },
    },
    meta: {
        createdAt: '',
        updatedAt: '',
        respondedAt: '',
    },
};

export const createPostsSlice: StateCreator<
    PostsSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
    posts: initPosts,
    post: initPost,
    getPosts: async (workspaceId: string, communityId: string) => {
        const result: ListResponse = await postsApis.getAllPostsCommunity(workspaceId, communityId);

        set(() => ({ posts: result }));
    },
    createPost: async (workspaceId: string, communityId: string, content: string) => {
        const result = await postsApis.createPost(workspaceId, communityId, content);

        set(() => ({ post: result }));
    },
});
