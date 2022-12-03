import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export interface Notify {
    open?: boolean;
    severity?: AlertProps['severity'];
    message?: string;
}
interface CustomizedSnackbarProps {
    notify: Notify;
    setNotify: any;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbar = ({ notify, setNotify }: CustomizedSnackbarProps) => {
    const { open, severity, message }: Notify = notify;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            open: false,
            message: '',
        });
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
