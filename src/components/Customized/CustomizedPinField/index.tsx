import { styled } from '@mui/system';
import PinField from 'react-pin-field';

interface PinFieldProps {
    length?: number;
    validate?: string | string[] | RegExp | ((key: string) => boolean);
    onResolveKey?: (key: string, ref?: HTMLInputElement) => any;
    onRejectKey?: (key: string, ref?: HTMLInputElement) => any;
    onComplete?: (code: string) => void;
    onChange?: (code: string) => void;
}

const defaultProps: PinFieldProps = {
    length: 6,
    validate: /^[0-9]$/,
};

const StyledPinFiled = styled(PinField)({
    'swd-pin-field[completed] .pin-field': {
        borderColor: `rgb(40, 167, 69)`,
        backgroundColor: 'rgba(40, 167, 69, 0.25)',
    },
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif, Arial',
    backgroundColor: 'rgb(248, 249, 250)',
    border: `1px solid rgb(204, 204, 204)`,
    borderRadius: '0.3rem',
    fontSize: '2rem',
    margin: '0.25rem',
    height: '3.5rem',
    outline: 'none',
    textAlign: 'center',
    transitionDuration: '250ms',
    transitionProperty: 'background, color, border, box-shadow, transform',
    width: '3rem',
    '&:focus': {
        borderColor: 'rgb(0, 123, 255)',
        outline: 'none',
        transform: 'scale(1.05)',
    },
    '&:invalid': {
        animation: 'shake 3 linear 75ms',
        borderColor: 'rgb(220, 53, 69)',
        boxShadow: '0 0 0.25rem rgba(220, 53, 69, 0.5)',
    },
});

export const CustomizedPinField = ({ onChange }: PinFieldProps) => {
    return <StyledPinFiled length={defaultProps.length} validate={defaultProps.validate} onChange={onChange} />;
};
