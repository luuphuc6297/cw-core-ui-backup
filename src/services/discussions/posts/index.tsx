import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { postsApis } from 'apis/postsApis';
import { AxiosError } from 'axios';
import { ListResponse, MetaParams } from 'models';
import { BodyPost } from 'models/post';

type PostMutateError = {
    title: string;
    errorKey: 'postnotexists';
};

const postKey = {
    all: () => ['postServices'] as const,
    posts: (params: MetaParams) => [postKey.all(), 'posts', params] as const,
    post: (workspaceId: string, communityId: string) =>
        [postKey.all(), 'post', { workspaceId, communityId }] as const,
};

export const usePostList = (
    workspaceId: string,
    communityId: string,
    params: MetaParams,
    config: UseQueryOptions<
        ListResponse,
        AxiosError,
        ListResponse,
        InferQueryKey<typeof postKey.posts>
    > = {}
) => {
    const result = useQuery(
        postKey.posts(params),
        () => postsApis.getAllPostsCommunity(workspaceId, communityId),
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
        posts: data,
        hasMore,
        isLoadingPage,
        ...result,
    };
};

export const usePosttCreate = (
    config: UseMutationOptions<
        BodyPost,
        AxiosError<PostMutateError>,
        BodyPost
    > = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => postsApis.createPost(payload.workspaceId, payload.communityId, payload.content), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...postKey.all(), 'posts']);
            config?.onSuccess?.(...args);
        },
      }
    );
  };