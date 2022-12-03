import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system';

interface CustomInputLabelProps {
    children: string;
    htmlFor: string;
}
const CustomInputLabel = styled(InputLabel)({
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
});

export function CustomTextFiledLabel({ htmlFor, children }: CustomInputLabelProps) {
    return <CustomInputLabel htmlFor={htmlFor}>{children}</CustomInputLabel>;
}
