import { FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { CustomizedError, CustomTextFiledLabel } from 'components';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import TimezoneSelect from 'react-timezone-select';

export interface TimeZoneFiledProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: any;
    htmlFor?: any;
    defaultValues?: any;
}

const CustomFormControl = styled(FormControl)({
    marginTop: 0,
});

export const TimeZoneField = ({ name, control, label, htmlFor, defaultValues }: TimeZoneFiledProps) => {
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
                <TimezoneSelect value={value || defaultValues} onChange={onChange} onBlur={onBlur} />
                <CustomizedError error={true}>{error?.message}</CustomizedError>
            </CustomFormControl>
        </>
    );
};
