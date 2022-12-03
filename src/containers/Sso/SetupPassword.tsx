import { setupPasswordActions } from 'features/slices/sso/setupPasswordSlice';
import { SetupPassword } from 'models';
import { SetupPasswordPage } from 'pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';

const SetupPasswordContainer = () => {
    const initialValues: SetupPassword = {
        password: '',
    } as SetupPassword;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSetupPassword = async (formValues: SetupPassword) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            await dispatch(setupPasswordActions.confirmPassword({ formValues, navigate }));
        } catch (error) {
            console.log('error', error);
        }
    };

    return <SetupPasswordPage initialValues={initialValues} onSubmit={handleSetupPassword} />;
};

export default SetupPasswordContainer;
