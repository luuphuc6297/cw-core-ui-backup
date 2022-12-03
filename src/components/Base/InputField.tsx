import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    apiError?: any;
    InputProps?: any;
    passwordCriteria?: any;
    onKeyUp?: () => void;
}

const CustomInput = styled(TextField)(({ theme }) => ({
    marginTop: 0,
    '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
            borderColor: `${theme.palette.primary}`,
        },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        '& > fieldset': {
            borderColor: `${theme.palette.primary}`,
        },
    },
    '& .MuiOutlinedInput-root': {
        borderColor: `${theme.palette.primary}`,
    },
}));

export function InputField({
    name,
    control,
    label,
    apiError,
    InputProps,
    passwordCriteria,
    onKeyUp,
    ...inputProps
}: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <React.Fragment>
            <CustomInput
                fullWidth
                size="small"
                margin="normal"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                variant="filled"
                inputRef={ref}
                error={invalid}
                label={label}
                inputProps={inputProps}
                InputProps={InputProps}
            />
            {/* <Error error={true}>{error?.message || apiError}</Error> */}
        </React.Fragment>
    );
}
