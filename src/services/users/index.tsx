import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userApis } from 'apis/userApis';
import { AxiosError } from 'axios';
import { ListResponse } from 'models';

const userKey = {
    all: () => ['userServices'] as const,
    users: () => [userKey.all(), 'users'] as const,
    user: (workspaceId: string, conversationId: string) =>
        [userKey.all(), 'user', { workspaceId, conversationId }] as const,
};

export const useUserList = (
    workspaceId: string,
    config: UseQueryOptions<
        ListResponse,
        AxiosError,
        ListResponse,
        InferQueryKey<typeof userKey.users>
    > = {}
) => {
    const result = useQuery(
        userKey.users(),
        () => userApis.getListUser(workspaceId),
        {
            keepPreviousData: true,
            ...config,
        }
    );

    const isLoadingPage = result.isFetching;

    return {
        users: result.data,
        isLoadingPage,
        ...result,
    };
};
