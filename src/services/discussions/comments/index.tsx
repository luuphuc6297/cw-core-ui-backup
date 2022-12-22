import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { commentsApis } from 'apis/commentApis';
import { AxiosError } from 'axios';
import { BodyComment, ListResponse, MetaParams } from 'models';

type CommentMutateError = {
    title: string;
    errorKey: 'commentnotexists';
};

const commentKey = {
    all: () => ['commentServices'] as const,
    comments: (params: MetaParams) => [commentKey.all(), 'comments', params] as const,
    comment: (workspaceId: string, postId: string) =>
        [commentKey.all(), 'community', { workspaceId, postId }] as const,
};

export const useCommentList = (
    workspaceId: string,
    postId: string,
    params: MetaParams,
    config: UseQueryOptions<
        ListResponse,
        AxiosError,
        ListResponse,
        InferQueryKey<typeof commentKey.comments>
    > = {}
) => {
    const result = useQuery(
        commentKey.comments(params),
        () => commentsApis.getCommentsPost(workspaceId, postId),
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

export const useCommentCreate = (
    config: UseMutationOptions<
        BodyComment,
        AxiosError<CommentMutateError>,
        BodyComment
    > = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => commentsApis.createComment(payload.workspaceId, payload.postId, payload.content), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries([...commentKey.all(), 'users']);
            config?.onSuccess?.(...args);
        },
      }
    );
  };