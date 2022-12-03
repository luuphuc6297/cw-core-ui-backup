import { authApis } from 'apis/authApis';
import { Register } from 'models';
import { RegisterPage } from 'pages';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterContainer = () => {
    const [apiError, setApiError] = React.useState<string>();
    const navigate = useNavigate();
    const initialValues: Register = {
        email: '',
    } as Register;

    const handleSendEmail = async (formValues: Register) => {
        try {
            const response: any = await authApis.sendEmail(formValues);

            if (response?.attributes) {
                toast.success(`${response.attributes?.message}`);
                navigate('/verify-code');
            }
        } catch (error: any) {
            if (error?.response?.status === 400) {
                setApiError('Email is already in use');
            }
        }
    };

    return <RegisterPage initialValues={initialValues} onSubmit={handleSendEmail} apiError={apiError} />;
};

export default RegisterContainer;
