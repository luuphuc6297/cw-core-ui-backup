import { CircularIndeterminate } from 'components';
import AuthLayout from 'layouts/Sso/Authentication';
import React, { Suspense } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';

const LoginContainer = React.lazy(() => import('containers/Sso/Login'));
const RegisterContainer = React.lazy(() => import('containers/Sso/Register'));
/**
 * Dashboard routes
 */
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
                            <LoginContainer />
                        </Suspense>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <React.Suspense fallback={<CircularIndeterminate />}>
                            <RegisterContainer />
                        </React.Suspense>
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
