import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { reactionApis } from 'apis/reactionsApis';
import { AxiosError } from 'axios';
import { ListResponse, MetaParams } from 'models';
import { BodyReaction } from 'models/reaction';

type ReactionMutateError = {
    title: string;
    errorKey: 'reactionnotexists';
};

const reactionKey = {
    all: () => ['reactionServices'] as const,
    reactions: (params: MetaParams) => [reactionKey.all(), 'reactions', params] as const,
    reaction: (workspaceId: string, postId: string) =>
        [reactionKey.all(), 'reaction', { workspaceId, postId }] as const,
};

export const useReactionList = (
    workspaceId: string,
    postId: string,
    params: MetaParams,
    config: UseQueryOptions<
        ListResponse,
        AxiosError,
        ListResponse,
        InferQueryKey<typeof reactionKey.reactions>
    > = {}
) => {
    const result = useQuery(
        reactionKey.reactions(params),
        () => reactionApis.getReactionsPost(workspaceId, postId),
        {
            keepPreviousData: true,
            ...config,
        }
    );

    const { data, meta } = result.data || {};

    const totalPages = Math.ceil((meta?.count ?? 0) / params?.limit);

    const hasMore = params?.page + 1 < totalPages;

    const isLoadingPage = result.isFetching;

    return {
        reactions: data,
        hasMore,
        isLoadingPage,
        ...result,
    };
};

export const useReactionCreate = (
    config: UseMutationOptions<
        BodyReaction,
        AxiosError<ReactionMutateError>,
        BodyReaction
    > = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => reactionApis.createReaction(payload.workspaceId, payload.postId, payload.type), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...reactionKey.all(), 'reactions']);
            config?.onSuccess?.(...args);
        },
      }
    );
};
