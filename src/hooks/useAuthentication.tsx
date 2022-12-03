// import { useStore } from 'app/store';
// import { isNull } from 'lodash';
// import { UserSliceState, WorkSpaceSliceState } from '@micro-architecture-coaching-cloud/models';
import React from 'react';
import { getAuth } from 'utils';

export const useAuthentication = () => {
    //     const user = useStore((state: UserSliceState | any) => state?.user);
    //     const workspace = useStore((state: WorkSpaceSliceState | any) => state.workspace);

    const check = getAuth();
    const [isAuth, setAuth] = React.useState<boolean>(check);
    //     const validateAuthentication = () => {
    //         if (user) {
    //             const { attributes: { status, token } } = user;
    //             if (!isNull(token) && status === USER_STATUS.ACTIVE && workspace?.id) {
    //                 if (!isAuth) {
    //                     setAuth(true);
    //                 }
    //             } else {
    //                 if (isAuth) {
    //                     setAuth(false);
    //                 }
    //             }
    //         }
    //     }
    //     React.useEffect(() => {
    //         validateAuthentication();
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //     }, [user, workspace]);
    return { isAuth, setAuth };
};
