import { TimeZone, UpdateProfile } from 'models';
import { UpdateProfilePage } from 'pages';
import { useNavigate } from 'react-router-dom';

const UpdateProfileContainer = () => {
    // const { getWorkSpaceDetail, updateProfileUser } = useStore();

    const defaultTimeZone: TimeZone = {
        value: 'Asia/Karachi',
        offset: 5,
        abbrev: 'PKT',
    };

    const navigate = useNavigate();

    const initialValues: UpdateProfile = {
        firstName: '',
        lastName: '',
        password: '',
        status: '',
        avatarUrl: '',
        timezone: defaultTimeZone,
        phone: '',
    } as UpdateProfile;

    const handleSetUpProfile = async (formValues: UpdateProfile) => {
        try {
            // await dispatch(updateProfileActions.updateProfile({ formValues, navigate }));
            // const updated = await updateProfileUser(formValues);
            // const workspace = await getWorkSpaceDetail('38647fbd-20a8-40ab-8292-b4828d636d29');
            // console.log(updated, workspace);
            // if (updated?.attributes['status'] === USER_STATUS.ACTIVE && workspace?.id) {
            //     navigate('/home', { replace: true });
            // }
        } catch (error: any) {
            console.log('error', error);
        }
    };

    // React.useEffect(() => {
    //     if (currentUser) {
    //         storeUser(currentUser);
    //         if (user?.attributes['status'] === USER_STATUS.ACTIVE && workspace?.id) {
    //             navigate('/', { replace: true });
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentUser, user]);

    return <UpdateProfilePage initialValues={initialValues} onSubmit={handleSetUpProfile} />;
};
export default UpdateProfileContainer;
