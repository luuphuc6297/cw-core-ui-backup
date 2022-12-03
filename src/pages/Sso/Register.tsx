import { yupResolver } from '@hookform/resolvers/yup';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, CircularProgress, InputAdornment, Link, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { CustomCaption, InputField, SubmitButton } from 'components';
import { verifyEmailActions } from 'features/slices/sso/verifyEmailSlice';
import { SSO } from 'layouts';
import { Register } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { RegisterScheme } from './validation';

export interface SignUpProps {
    apiError?: string;
    initialValues?: Register;
    onSubmit?: (formValues: Register) => void;
}

const PrivacyPolicy = styled(Typography)({
    fontSize: 12,
    fontWeight: 400,
});

const TermAndPolicy = styled(Link)({
    fontSize: 12,
    color: 'rgba(5, 6, 15, 0.8)',
    fontWeight: 'bold',
});

const StyledEmailIcon = styled(EmailOutlinedIcon)({
    width: 20,
    height: 20,
    opacity: 0.6,
});

const RegisterPage = ({ initialValues, onSubmit, apiError }: SignUpProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [error, setError] = React.useState<string>('');

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm<Register>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(RegisterScheme),
    });

    const handleFormSubmit = async (formValues: Register) => {
        try {
            // Clear previous submission error
            setError('');
            dispatch(verifyEmailActions?.storeEmail({ attributes: { email: formValues?.email } }));
            await onSubmit?.(formValues);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const onRedirect = React.useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <SSO
            headerText="Already have an account?"
            title="Sign up to CoachingCloud"
            onRedirect={onRedirect}
            redirectBtn="Login"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box>
                    <CustomCaption>Enter the email address we'll send you an email to confirm.</CustomCaption>
                    <InputField
                        id="email-address"
                        name="email"
                        control={control}
                        label="Email address"
                        apiError={apiError}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <StyledEmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
                    {isSubmitting && <CircularProgress size={16} color="primary" />}
                    &nbsp;Send email
                </SubmitButton>
                <PrivacyPolicy>
                    This site is protected by reCAPTCHA and the{' '}
                    <TermAndPolicy href="#" underline="none">
                        Google Privacy Policy
                    </TermAndPolicy>{' '}
                    and
                    <TermAndPolicy underline="none"> Terms of Service </TermAndPolicy>apply.
                </PrivacyPolicy>
            </form>
        </SSO>
    );
};
export default RegisterPage;
