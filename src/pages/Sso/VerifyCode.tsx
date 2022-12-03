import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { authApis } from 'apis/authApis';
import { CustomCaption, CustomizedPinField, SmallCaption, SubmitButton } from 'components';
import { verifyEmailActions } from 'features/slices/sso/verifyEmailSlice';
import { SSO } from 'layouts';
import { ResponseVerifiedEmail } from 'models';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store/hooks';

interface VerifyCodeProps {
    currentUser?: any;
    onResendEmail: () => void;
}

const CustomizedBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
});

const SmallCation = styled(Typography)({
    fontSize: 12,
    color: '#616161',
    marginRight: 8,
});

const ResendBtn = styled(Button)({
    textTransform: 'none',
    fontSize: 12,
});

const VerifyCodePage = ({ currentUser, onResendEmail }: VerifyCodeProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [code, setCode] = React.useState('');
    // const { storeUser } = useStore();

    const onChange = async (value: string) => {
        await setCode(value);
    };

    const onSubmit = async () => {
        try {
            const response: ResponseVerifiedEmail = await authApis.verifyEmail({
                email: currentUser?.attributes?.email,
                code: code,
            });
            const {
                data: { token, user },
                message = '',
            } = response.attributes!;
            if (token) {
                dispatch(verifyEmailActions.confirmCodeSuccess(response));

                // storeUser(user);

                window.localStorage.setItem('access_token', token);

                navigate('/setup-password');

                toast.success(`Verify email success`);
            } else {
                dispatch(verifyEmailActions.confirmCodeFailed(message));
                toast.error(`${message}`);
            }
        } catch (error: any) {
            toast.error(error.message);
            dispatch(verifyEmailActions.confirmCodeFailed(error?.message));
        }
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <React.Fragment>
            {currentUser && (
                <SSO title="Check your email for a code">
                    <>
                        <Box>
                            <CustomCaption>
                                We've sent a 6-characters code to{' '}
                                <strong style={{ color: 'black', opacity: 0.8 }}>
                                    {currentUser?.attributes?.email}
                                </strong>
                                . The code expires shortly, so please enter soon
                            </CustomCaption>
                            <CustomizedPinField onChange={onChange} />
                            <CustomizedBox>
                                <SmallCation>If you don't receive</SmallCation>
                                <ResendBtn startIcon={<AutorenewIcon />} variant="text" onClick={onResendEmail}>
                                    Resend email
                                </ResendBtn>
                            </CustomizedBox>
                            <SubmitButton type="submit" onClick={onSubmit}>
                                Submit
                            </SubmitButton>
                        </Box>
                        <Box>
                            <SmallCaption>Can't find your code? Check spam folder</SmallCaption>
                        </Box>
                    </>
                </SSO>
            )}
        </React.Fragment>
    );
};

export default VerifyCodePage;
