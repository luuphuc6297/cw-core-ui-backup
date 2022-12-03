import { ListResponse } from './common';
import { Post } from './posts';
import { CurrentUser } from './user';
import { WorkSpace } from './workspace';
export interface UserSliceState {
    user: CurrentUser;
    storeUser: (user: CurrentUser) => void;
    clearUser: (user: CurrentUser) => void;
}

export interface WorkSpaceSliceState {
    workspace: WorkSpace;
    getWorkSpaceDetail: (workSpaceId: string) => void;
}

export interface UsersDiscussionSlice {
    loading: boolean;
    usersDiscussion: ListResponse;
    getAllUsersDiscussion: (workspaceId: string, communityId: string) => void;
}

export interface PostsSlice {
    loading: boolean;
    posts: ListResponse;
    post: Post;
    getPosts: (workspaceId: string, communityId: string) => void;
    createPost: (workspaceId: string, communityId: string, content: string) => void;
}

export interface CommunitySlice {
    loading: boolean;
    communities: ListResponse;
    community: any;
    getAllCommunities: (workspaceId: string) => void;
}

export interface CommentSlice {
    loading: boolean;
    comments: ListResponse;
    getAllCommentPost: (workspaceId: string, postId: string) => void;
    createComment: (workspaceId: string, postId: string) => void;
}

export interface ReactionSlice {
    loading: boolean;
    reactions: ListResponse;
    getAllReactionsPost: (workspaceId: string, postId: string) => void;
}
