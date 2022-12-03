import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const ValidateNumber = styled('p')<{ number?: boolean }>(({ theme, number }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 12,
    marginTop: 0,
    color: number ? theme.palette['success'].main : theme.palette['grey'][400],
}));

const ValidateSpecial = styled('p')<{ specialChar?: boolean }>(({ theme, specialChar }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 12,
    marginTop: 0,
    color: specialChar ? theme.palette['success'].main : theme.palette['grey'][400],
}));

const ValidatePwdLength = styled('p')<{ pwdLength?: boolean }>(({ theme, pwdLength }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 12,
    marginTop: 0,
    color: pwdLength ? theme.palette['success'].main : theme.palette['grey'][400],
}));

const ValidateUpperCase = styled('p')<{ upperCase?: boolean }>(({ theme, upperCase }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 12,
    marginTop: 0,
    color: upperCase ? theme.palette['success'].main : theme.palette['grey'][400],
}));

const ValidateLowerCase = styled('p')<{ lowerCase?: boolean }>(({ theme, lowerCase }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 12,
    marginTop: 0,
    color: lowerCase ? theme.palette['success'].main : theme.palette['grey'][400],
}));

export const PWDRequisite = ({ passwordCriteria }: any) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <Box>
                <ValidateNumber number={passwordCriteria?.number}>
                    <CheckCircleIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                    One number
                </ValidateNumber>
                <ValidateSpecial specialChar={passwordCriteria?.specialChar}>
                    <CheckCircleIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                    One special character
                </ValidateSpecial>
                <ValidatePwdLength pwdLength={passwordCriteria?.pwdLength}>
                    <CheckCircleIcon sx={{ fontSize: 16, marginRight: 0.5 }} /> 8 minimum characters
                </ValidatePwdLength>
            </Box>
            <Box>
                <ValidateUpperCase upperCase={passwordCriteria?.upperCase}>
                    <CheckCircleIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                    One uppercase character
                </ValidateUpperCase>
                <ValidateLowerCase lowerCase={passwordCriteria?.lowerCase}>
                    <CheckCircleIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
                    One lowercase character
                </ValidateLowerCase>
            </Box>
        </Box>
    );
};
