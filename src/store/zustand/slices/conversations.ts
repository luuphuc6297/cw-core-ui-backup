import { conversationApis } from 'apis/conversationApis';
import _, { first, isEmpty, keys } from 'lodash';
import {
    Conversation,
    CreateConversationForm,
    ItemResponse,
    LastMessage,
    ListResponse,
    ResponseSocketItem
} from 'models';
import { getRandomColor } from 'utils';
import { StateCreator } from 'zustand';

export interface ConversationSlice {
    conversations: ListResponse;
    conversation: Conversation;
    usersConversation: ListResponse;
    links: ListResponse;
    serverMessages: LastMessage;
    getListConversation: (workspaceId: string) => void;
    getConversationDetail: (workspaceId: string, conversationId: string) => void;
    getUsersConversation: (workspaceId: string, conversationId: string) => void;
    getLinks: (workspaceId: string, conversationId: string) => void;
    createNewConversation: (workspaceId: string, formValues: CreateConversationForm) => Promise<Conversation>;
    createNewConversationSuccess: (data: ItemResponse) => void;
    updateUserCountOfConversationInList: (_id: string) => void;
    updateUserCountOfConversationDetail: (_id: string) => void;
    updateDataConversationDetailFromSocket: (conversationId: string, data: ResponseSocketItem) => void;
    deleteConversation: (workspaceId: string, conversationId: string) => void;
    inviteUsers: (workspaceId: string, conversationId: string, userIdArray: string[]) => void;
    swapConversationsPosition: (conversationId: string) => void;
    // setLoading: (isLoading: boolean) => void;
    clearConversation: () => void;
    updateLastMessageOfConversationInList: (data: ResponseSocketItem, conversationId?: string) => void;
    setConversations: (conversations: ListResponse) => void;
    setConversation: (conversation: Conversation) => void;
}

const initConversations: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initUsers: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initUsersConversation: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initLinksConversation: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initConversation: Conversation = {
    _id: '',
    type: 'Conversation',
    attributes: {
        contextId: 0,
        imageUrl: '',
        color: '',
        title: '',
        userCount: 0,
        recentActivities: [],
        status: '',
        mode: '',
        lastMessage: {
            content: '',
            contentType: '',
            conversationId: '',
            createdAt: '',
            generator: '',
            updatedAt: '',
            _id: '',
        },
        user: {
            lastName: '',
            firstName: '',
            _id: '',
            email: '',
        },
    },
    meta: {
        createdAt: '',
        updatedAt: '',
        respondedAt: '',
    },
};

const initServerMessages: LastMessage = {
    content: '',
    contentType: '',
    conversationId: '',
    createdAt: '',
    generator: '',
    updatedAt: '',
    _id: '',
};
export const createConversationSlice: StateCreator<
    ConversationSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    conversations: initConversations,
    conversation: initConversation,
    usersConversation: initUsersConversation,
    links: initLinksConversation,
    serverMessages: initServerMessages,
    setConversations: (conversations: ListResponse) => {
        set(() => ({ conversations }));
    },
    setConversation: (conversation: Conversation) => {
        set(() => ({ conversation }));
    },
    getListConversation: async () => {
        // if (get().conversations.data.length > 0) return;
        // const result: ListResponse = await conversationApis.getListConversation(workspaceId);
        // console.log(result)
        // set(() => ({ conversations: result, loading: false }));
        return get().conversations.data;
    },
    getConversationDetail: async (workspaceId: string, conversationId: string) => {
        const result = await conversationApis.getConversationDetail(workspaceId, conversationId);

        set(() => ({ conversation: result }));
    },
    getUsersConversation: async (workspaceId: string, conversationId: string) => {
        const result: ListResponse = await conversationApis.getUsersConversation(workspaceId, conversationId);

        const usersConversation = get().usersConversation;

        set(() => ({ usersConversation: { ...usersConversation, ...{ data: result.data } } }));
    },
    getLinks: async (workspaceId: string, conversationId: string) => {
        const result: ListResponse = await conversationApis.getLinksConversation(workspaceId, conversationId);
        set(() => ({ links: result, loading: false }));
    },
    createNewConversation: async (workspaceId: string, formValues: CreateConversationForm) => {
        const { title } = formValues;

        const colorRandom: string = getRandomColor();

        const result: Conversation = await conversationApis.createConversation(workspaceId, {
            title,
            color: colorRandom,
        });

        if (result.attributes.lastMessage.generator === 'Server') {
            const messages = result.attributes.lastMessage;

            set(() => ({ serverMessages: messages }));
        }

        set(() => ({ conversation: result }));

        return result;
    },
    createNewConversationSuccess: async (data: ItemResponse) => {
        const conversations: ListResponse = get().conversations;
        const index = conversations.data.findIndex((i: any) => i._id === data._id);
        if (index < 0) conversations.data.unshift(data);
        set(() => ({ conversation: data, conversations }));
    },
    clearConversation: () => {
        set({
            conversations: initConversations,
            conversation: initConversation,
            usersConversation: initUsersConversation,
            links: initLinksConversation,
            serverMessages: initServerMessages,
        });
    },
    updateUserCountOfConversationInList: async (_id: string) => {
        const usersConversation = get().usersConversation;

        const cloneData = usersConversation.data || [];
        const index = cloneData.findIndex((item) => item._id === _id);

        if (index !== -1) {
            cloneData[index].attributes = {
                ...cloneData[index].attributes,
                ...{ userCount: usersConversation.data.length, recentActivities: usersConversation.data },
            };
            cloneData[index] = { ...cloneData[index], ...{ isCreated: false } };

            set(() => ({ usersConversation: { ...usersConversation, ...{ data: cloneData } }, loading: false }));
        }
    },
    updateUserCountOfConversationDetail: async (_id: string) => {
        const usersConversation = get().usersConversation;
        const conversationIdArray = usersConversation.data.map((item) => first(keys(item)));

        const currentConversationId = _id;
        const index = conversationIdArray.findIndex((id) => id === currentConversationId);

        // if (index !== -1) {
        //     set(() => ({ loading: false }));
        // }
    },
    updateDataConversationDetailFromSocket: async (conversationId: string, data: ResponseSocketItem) => {
        const conversations = get().conversations;
        const index = conversations.data.findIndex((i) => i._id === conversationId);
        conversations.data[index] = data as any;
        if (index !== -1) {
            set(() => ({
                conversation: data as any,
                conversations,
            }));
        }
    },
    inviteUsers: async (workspaceId: string, conversationId: string, userIdArray: any) => {
        await conversationApis.inviteManyUser(workspaceId, {
            conversationId,
            userIdArray: (userIdArray || []).map((user: any) => user.id || user),
            isEmit: true,
        });

        // const getUsersConversation = get().getUsersConversation;
        // await getUsersConversation(workspaceId, conversationId);
    },

    deleteConversation: async (workspaceId: string, conversationId: string) => {
        const conversations = get().conversations;
        try {
            const result = await conversationApis.removeConversation(workspaceId, conversationId);

            if (result) {
                const remain: any = conversations.data.filter((item) => item._id !== conversationId);
                set(() => ({
                    conversation: initConversation,
                    conversations: {
                        ...conversations,
                        data: remain,
                    },
                    loading: false,
                }));
            }
        } catch (e: any) {
            // console.log(e.response.data.message);
            // toast.error(e.response.data.message)
            // set({ loading: false });
        }
    },
    swapConversationsPosition: async (conversationId: string) => {
        const conversations = get().conversations;

        const conversation = conversations.data.find((item) => _.get(item, '_id', '') === conversationId);
        const cloneData = conversations.data.filter((item) => !isEmpty(item));

        const filteredConversations = cloneData.filter((item) => item._id !== conversationId);

        const data: any = [conversation, ...filteredConversations];

        set(() => ({ conversations: { ...conversations, ...{ data: data } } }));
    },
    updateLastMessageOfConversationInList: (data: ResponseSocketItem) => {
        const conversations = get().conversations;
        const id = data.attributes.conversationId;
        const cloneData: any = conversations.data || [];

        const index = cloneData.findIndex((item: ItemResponse) => item && item._id === id);
        if (index !== -1) {
            cloneData[index].attributes = {
                ...cloneData[index].attributes,
                ...{ lastMessage: data.attributes },
            };
            set(() => ({ conversations: { ...conversations, data: cloneData.filter((i: any) => i) } }));
        }
    },
});
