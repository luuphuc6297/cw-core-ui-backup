import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { CustomCaption, InputField, PWDRequisite, SubmitButton } from 'components';
import { SSO } from 'layouts';
import { SetupPassword } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils';
import { SetupPasswordScheme } from './validation';

export interface SetupPasswordProps {
    initialValues?: SetupPassword;
    onSubmit?: (formValues: SetupPassword) => void;
}
const StyledPasswordIcon = styled(VpnKeyOutlinedIcon)({
    width: 20,
    height: 20,
    opacity: 0.6,
});
const SetupPasswordPage = ({ initialValues, onSubmit }: SetupPasswordProps) => {
    const token = getToken();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [passwordCriteria, setPasswordCriteria] = React.useState<any>({
        lowerCase: false,
        upperCase: false,
        number: false,
        specialChar: false,
        pwdLength: false,
    });

    React.useEffect(() => {
        if (!token) {
            navigate('/sso/register');
        }
    }, [navigate, token]);

    const {
        control,
        handleSubmit,
        watch,
        formState: { isSubmitting, isValid },
    } = useForm<SetupPassword>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(SetupPasswordScheme),
    });

    const watchPassword = watch('password');

    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (formValues: SetupPassword) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleOnKeyUp = () => {
        const lowerCase = /[a-z]/.test(watchPassword);
        const upperCase = /[A-Z]/.test(watchPassword);
        const number = /[0-9]/.test(watchPassword);
        const specialChar = /[!@#$%^&*]/.test(watchPassword);
        const pwdLength = watchPassword.length >= 8;

        setPasswordCriteria({
            lowerCase,
            upperCase,
            number,
            specialChar,
            pwdLength,
        });
    };

    return (
        <SSO title="Setup password for your account">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box>
                    <CustomCaption>You should be create the password before move to next step</CustomCaption>
                    <InputField
                        name="password"
                        label="Password"
                        control={control}
                        type={showPassword ? 'text' : 'password'}
                        passwordCriteria={passwordCriteria}
                        onKeyUp={handleOnKeyUp}
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

                    <PWDRequisite passwordCriteria={passwordCriteria} />
                </Box>
                <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
                    {isSubmitting && <CircularProgress size={16} color="primary" />}
                    &nbsp; Submit
                </SubmitButton>
            </form>
        </SSO>
    );
};

export default SetupPasswordPage;
