import { authApis } from 'apis/authApis';
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
            const response = await authApis.setupPassword(formValues);

            // await dispatch(setupPasswordActions.confirmPassword({ formValues, navigate }));
        } catch (error) {
            console.log('error', error);
        }
    };

    return <SetupPasswordPage initialValues={initialValues} onSubmit={handleSetupPassword} />;
};

export default SetupPasswordContainer;
