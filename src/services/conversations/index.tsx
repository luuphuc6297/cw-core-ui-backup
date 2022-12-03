import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { conversationApis } from 'apis/conversationApis';
import { AxiosError } from 'axios';
import { Conversation, IListResponse, MetaParams } from 'models';

const conversationKey = {
    all: () => ['conversationServices'] as const,
    conversations: (params: MetaParams) => [conversationKey.all(), 'conversations', params] as const,
};

export const useConversationList = (
    workspaceId: string,
    params: MetaParams,
    config: UseQueryOptions<
        IListResponse<Conversation>,
        AxiosError,
        IListResponse<Conversation>,
        InferQueryKey<typeof conversationKey.conversations>
    > = {}
) => {
    const result = useQuery(
        conversationKey.conversations(params),
        () => conversationApis.getListConversation(workspaceId, params),
        {
            keepPreviousData: true,
            ...config,
        }
    );

    const { data, meta } = result.data || {};

    const totalPages = Math.ceil((meta?._totalRows ?? 0) / params?._limit);

    const hasMore = params?._page + 1 < totalPages;

    const isLoadingPage = result.isFetching;

    return {
        conversations: data,
        hasMore,
        isLoadingPage,
        ...result,
    };
};
