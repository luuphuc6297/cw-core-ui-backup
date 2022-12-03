import * as yup from 'yup';

export const CreateConversationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    selectedId: yup.array(),
});

export const InviteUserSchema = yup.object().shape({
    selectedId: yup.array(),
});
