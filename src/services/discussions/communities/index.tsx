import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { communityApis } from 'apis/communityApis';
import { AxiosError } from 'axios';
import { ListResponse, MetaParams } from 'models';

const communityKey = {
    all: () => ['communityServices'] as const,
    communities: (params: MetaParams) => [communityKey.all(), 'communities', params] as const,
    community: (workspaceId: string) =>
        [communityKey.all(), 'community', { workspaceId }] as const,
};

export const useCommunityList = (
    workspaceId: string,
    params: MetaParams,
    config: UseQueryOptions<
        ListResponse,
        AxiosError,
        ListResponse,
        InferQueryKey<typeof communityKey.communities>
    > = {}
) => {
    const result = useQuery(
        communityKey.communities(params),
        () => communityApis.getCommunities(workspaceId),
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
        comments: data,
        hasMore,
        isLoadingPage,
        ...result,
    };
};
