import { reactionApis } from 'apis/reactionsApis';
import { ListResponse } from 'models';
import { StateCreator } from 'zustand';
export interface ReactionSlice {
    loading: boolean;
    reactions: ListResponse;
    getAllReactionsPost: (workspaceId: string, postId: string) => void;
    createReaction: (workspaceId: string, postId: string, type: string) => void;
    deleteReaction: (workspaceId: string, postId: string, reactionId: string) => void;
}

const initReactions: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

export const createReactionsSlice: StateCreator<
    ReactionSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
    reactions: initReactions,
    getAllReactionsPost: async (workspaceId: string, postId: string) => {
        const result = await reactionApis.getReactionsPost(workspaceId, postId);

        set(() => ({ reactions: result }));
    },
    createReaction: async (workspaceId: string, postId: string, type: string) => {
        await reactionApis.createReaction(workspaceId, postId, type);
    },
    deleteReaction: async (workspaceId: string, postId: string, reactionId: string) => {},
});
