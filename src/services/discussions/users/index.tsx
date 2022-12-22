import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userDiscussionApis } from 'apis/userDiscussionApis';
import { AxiosError } from 'axios';
import { ListResponse, MetaParams } from 'models';

const userDiscussionKey = {
    all: () => ['userDiscussionServices'] as const,
    userDiscussions: (params: MetaParams) => [userDiscussionKey.all(), 'userDiscussions', params] as const,
    userDiscussion: (workspaceId: string, communityId: string) =>
        [userDiscussionKey.all(), 'userDiscussion', { workspaceId, communityId }] as const,
};

export const useReactionList = (
    workspaceId: string,
    communityId: string,
    params: MetaParams,
    config: UseQueryOptions<
        ListResponse,
        AxiosError,
        ListResponse,
        InferQueryKey<typeof userDiscussionKey.userDiscussions>
    > = {}
) => {
    const result = useQuery(
        userDiscussionKey.userDiscussions(params),
        () => userDiscussionApis.getUsersDiscussion(workspaceId, communityId),
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
        userDiscussions: data,
        hasMore,
        isLoadingPage,
        ...result,
    };
};

