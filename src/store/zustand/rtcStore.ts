import {
    ConversationSlice, createConversationSlice,
    createMessageSlice,
    createTypingSlice,
    createUserSlice,
    createWorkSpaceSlice, MessageSlice,
    TypingSlice,
    WorkSpaceSlice,
    CommentSlice,
    CommunitySlice,
    PostsSlice,
    ReactionSlice,
    UsersDiscussionSlice,
    createCommentSlice,
    createCommunitySlice,
    createPostsSlice,
    createReactionsSlice,
    createUsersDiscussionSlice
} from './slices';

import create, { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { logger } from './store';

type Logger = <
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
    f: StateCreator<T, Mps, Mcs>,
    name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
    //@ts-ignore
    f: PopArgument<StateCreator<T, [], []>>,
    name?: string
    //@ts-ignore
) => PopArgument<StateCreator<T, [], []>>;

// @ts-ignore
const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
    type T = ReturnType<typeof f>;
    // @ts-ignore
    const loggedSet: typeof set = (...a) => {
        set(...a);
        // console.log(...(name ? [`${name}:`] : []), get());
    };
    store.setState = loggedSet;

    return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

export const useRtcStore = create<ConversationSlice & MessageSlice & TypingSlice & WorkSpaceSlice & CommentSlice & CommunitySlice & PostsSlice & ReactionSlice & UsersDiscussionSlice>()(
    logger(
        devtools(
            persist(
                function (...a) {
                    return {
                        //@ts-ignore
                        ...createUserSlice(...a),
                        //@ts-ignore
                        ...createWorkSpaceSlice(...a),
                        //@ts-ignore
                        ...createConversationSlice(...a),
                        //@ts-ignore
                        ...createMessageSlice(...a),
                        //@ts-ignore
                        ...createCommentSlice(...a),
                        //@ts-ignore
                        ...createCommunitySlice(...a),
                        //@ts-ignore
                        ...createPostsSlice(...a),
                        //@ts-ignore
                        ...createReactionsSlice(...a),
                        //@ts-ignore
                        ...createUsersDiscussionSlice(...a),
                        //@ts-ignore
                        ...createTypingSlice(...a),

                    };
                },
                { name: 'rtc-store', getStorage: () => sessionStorage }
            )
        )
    )
);
