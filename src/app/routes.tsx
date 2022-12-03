import { CircularIndeterminate } from 'components';
import AuthLayout from 'layouts/Sso/Authentication';
import React from 'react';
import { Suspense } from 'react';
import { RouteObject, useRoutes, Outlet } from 'react-router-dom';

const RtcContainer = React.lazy(() => import('containers/Home/Rtc'));

const Router = () => {
    const appRoutes: RouteObject[] = [
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: (
                        <Suspense fallback={<CircularIndeterminate />}>
                            <div>Login</div>
                        </Suspense>
                    ),
                },
                {
                    path: 'rtc',
                    element: <Outlet />,
                    children: [
                        {
                            path: 'rtc/:conversationId',
                            element: (
                                <Suspense fallback={<CircularIndeterminate />}>
                                    <RtcContainer />
                                </Suspense>
                            ),
                        },
                    ],
                },
            ],
        },
    ];

    return useRoutes(appRoutes);
};

export default Router;
