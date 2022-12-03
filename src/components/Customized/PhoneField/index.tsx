import { FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { CustomizedError, CustomTextFiledLabel } from 'components';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';


export interface PhoneFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: any;
    htmlFor?: any;
}

const CustomFormControl = styled(FormControl)({
    marginTop: 0,
});

export const PhoneFiled = ({ name, control, label, htmlFor }: PhoneFieldProps) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <>
            <CustomTextFiledLabel htmlFor={htmlFor}>{label}</CustomTextFiledLabel>
            <CustomFormControl error={invalid} variant="outlined" fullWidth margin="normal" size="small">
                <MuiPhoneNumber
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultCountry="vg"
                    variant="outlined"
                    size="small"
                />
                <CustomizedError error={true}>{error?.message}</CustomizedError>
            </CustomFormControl>
        </>
    );
};
