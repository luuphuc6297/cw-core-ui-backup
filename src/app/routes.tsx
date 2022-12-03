import { CircularIndeterminate } from 'components';
import AuthLayout from 'layouts/Sso/Authentication';
import { Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

const Router = () => {
    const appRoutes: RouteObject[] = [
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: '/login',
                    element: (
                        <Suspense fallback={<CircularIndeterminate />}>
                            <div>Login</div>
                        </Suspense>
                    ),
                },
            ],
        },
    ];

    return useRoutes(appRoutes);
};

export default Router;
