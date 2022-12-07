import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { messageApis } from 'apis/messageApis';
import { AxiosError } from 'axios';
import { IListResponse, Message, MetaParams } from 'models';

type MessageMutateError = {
    title: string;
    errorKey: 'message_not_exists';
};

const messageKey = {
    all: () => ['messageServices'] as const,
    messages: (params: MetaParams) => [messageKey.all(), 'messages', params] as const,
    message: (workspaceId: string, conversationId: string) =>
        [messageKey.all(), 'message', { workspaceId, conversationId }] as const,
};

export const useMessageList = (
    workspaceId: string,
    conversationId: string,
    params: MetaParams,
    config: UseQueryOptions<
        IListResponse<Message>,
        AxiosError,
        IListResponse<Message>,
        InferQueryKey<typeof messageKey.messages>
    > = {}
) => {
    const result = useQuery(
        messageKey.messages(params),
        () => messageApis.getMessages(workspaceId, conversationId, (params.skip / params.limit + 1)),
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
        messages: data,
        hasMore,
        isLoadingPage,
        ...result,
    };
};

export const useMessageUpdate = (
    workspaceId: string,
    config: UseMutationOptions<Message, AxiosError<MessageMutateError>, Message> = {}
) => {
    const queryClient = useQueryClient();

    return useMutation((payload) => messageApis.updateMessage(workspaceId, payload._id, payload.content || ''), {
            ...config,
            onSuccess: (data, payload, ...rest) => {
                queryClient.cancelQueries([...messageKey.all(), 'messages']);
                queryClient
                    .getQueryCache()
                    .findAll([...messageKey.all(), 'messages'])
                    .forEach(({ queryKey }) => {
                        queryClient.setQueryData<IListResponse<Message> | undefined>(queryKey, (cachedData) => {
                            if (!cachedData) return;
                            return {
                                ...cachedData,
                                content: (cachedData.data || []).map((message) =>
                                    message._id === data._id ? data : message
                                ),
                            };
                        });
                    });
                queryClient.invalidateQueries([...messageKey.all(), 'messages']);
                // queryClient.invalidateQueries(messageKey.conversation(workspaceId, conversationId: conversation._id));
                // queryClient.invalidateQueries(messageKey.conversation({ workspaceId, conversationId }));
                if (config.onSuccess) {
                    config.onSuccess(data, payload, ...rest);
                }
            },
        }
    );
};

export const useMessageCreate = (
    workspaceId: string,
    conversationId: string,
    config: UseMutationOptions<Message, AxiosError<MessageMutateError>, Message> = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation(
      (message: Message): Promise<Message> => messageApis.createMessage(workspaceId, conversationId, message.content || ''),
      {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...messageKey.all(), 'messages']);
            config?.onSuccess?.(...args);
        },
      }
    );
};

export const useMessageDelete = (
    workspaceId: string,
    config: UseMutationOptions<Message, AxiosError<MessageMutateError>, Message> = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation(
      (message: Message): Promise<Message> => messageApis.deleteMessage(workspaceId, message._id),
      {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...messageKey.all(), 'messages']);
            config?.onSuccess?.(...args);
        },
      }
    );
};
