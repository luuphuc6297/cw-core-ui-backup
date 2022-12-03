import { yupResolver } from '@hookform/resolvers/yup';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Box, CircularProgress, IconButton, InputAdornment, Link } from '@mui/material';
import { styled } from '@mui/system';
import { GoogleLogoUrl, LinkedInIconUrl } from 'assets';
import { CustomDivider, InputField, SocialButton, SubmitButton } from 'components';
import { authActions, selectError } from 'features/slices/sso/authSlice';
import { SSO } from 'layouts';
import { Login } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { LoginSchema } from './validation';

export interface LoginFormProps {
    initialValues?: Login;
    onSubmit?: (formValues: Login) => void;
}

const ForgotPasswordLink = styled(Link)({
    fontWeight: 'bold',
    fontSize: 14,
});

const StyledEmailIcon = styled(EmailOutlinedIcon)({
    width: 20,
    height: 20,
    opacity: 0.6,
});

const StyledPasswordIcon = styled(VpnKeyOutlinedIcon)({
    width: 20,
    height: 20,
    opacity: 0.6,
});

const StyledGoogleIcon = styled('img')(({ theme }) => ({
    width: 24,
    height: 24,
}));

const StyledLinkedinIcon = styled('img')(({ theme }) => ({
    width: 24,
    height: 24,
}));

const LoginPage = ({ initialValues, onSubmit }: LoginFormProps) => {
    const apiError = useSelector(selectError);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm<Login>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(LoginSchema),
    });

    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // React.useEffect(() => {}, [apiError]);

    React.useEffect(() => {
        dispatch(authActions.clearError());
    }, []);

    const handleFormSubmit = async (formValues: Login) => {
        try {
            // Clear previous submission error
            await onSubmit?.(formValues);
            dispatch(authActions.clearError());
        } catch (error: any) {
            console.log('error', error);
        }
    };

    const onRedirect = React.useCallback(() => {
        navigate('/register');
    }, []);

    return (
        <SSO
            title="Hi, welcome back"
            onRedirect={onRedirect}
            headerText="Don’t have an account?"
            redirectBtn="Sign Up"
        >
            <>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <SocialButton startIcon={<StyledGoogleIcon src={GoogleLogoUrl} />}>
                            Connect to Google
                        </SocialButton>
                        <SocialButton startIcon={<StyledLinkedinIcon src={LinkedInIconUrl} />}>
                            Connect to LinkedIn
                        </SocialButton>
                    </Box>
                    <CustomDivider>or</CustomDivider>
                    <Box>
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
                        <InputField
                            id="password"
                            name="password"
                            control={control}
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <StyledPasswordIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <SubmitButton disabled={!isValid || isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />}
                        &nbsp;Login
                    </SubmitButton>
                </form>
                <ForgotPasswordLink underline="none" href="#">
                    Forgot your password?
                </ForgotPasswordLink>
            </>
        </SSO>
    );
};

export default LoginPage;
