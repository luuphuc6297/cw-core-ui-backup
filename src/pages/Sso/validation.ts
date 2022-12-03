import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().required('Email is required.').email('Must be an email'),
    password: yup.string().required('Password is required.').min(8, 'Type at least 8 characters.'),
});

export const RegisterScheme = yup.object().shape({
    email: yup.string().required('Email is required.').email('Must be an email'),
});

export const SetupPasswordScheme = yup.object().shape({
    password: yup.string().required('Password is required.'),
});

export const UpdateProfileScheme = yup.object().shape({
    firstName: yup.string().required('First name is required.').min(2, 'Type at least 2 characters.'),
    lastName: yup.string().required('Last name is required.').min(2, 'Type at least 2 characters.'),
    phone: yup.string(),
    timezone: yup.object().required('Time zone is required.').shape({
        value: yup.string(),
        offset: yup.number(),
        abbrev: yup.string(),
    }),
    avatarUrl: yup.string(),
});
