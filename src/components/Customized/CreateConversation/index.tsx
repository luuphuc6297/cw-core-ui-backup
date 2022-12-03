import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AutoCompleteFiled, InputField, MemberOptionType } from 'components';
import { isEmpty } from 'lodash';
import { CreateConversationForm, ListResponse, WorkspaceUser } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateConversationSchema } from './validation';

interface ICreateConversationProps {
    initialValues?: CreateConversationForm;
    onSubmit?: (formValues: CreateConversationForm) => void;
    onCancel?: () => void;
    users: any | ListResponse;
}

const StyledCreateConversation = styled(Box)(({ theme }) => ({
    margin: 16,
}));

const StyledCaption = styled(Typography)(({ theme }) => ({
    marginBottom: 16,
}));

export const CreateConversation = ({ initialValues, onSubmit, onCancel, users }: ICreateConversationProps) => {
    const [options, setOptions] = React.useState<MemberOptionType[]>([]);

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<CreateConversationForm>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(CreateConversationSchema),
    });

    const handleFormSubmit = async (formValues: CreateConversationForm) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log('error', error);
        }
    };

    React.useEffect(() => {
        if (!isEmpty(users)) {
            const getOptions = users.data.map((user: WorkspaceUser) => {
                return {
                    id: user.attributes['_id'],
                    name: `${user.attributes['firstName']} ${user.attributes['lastName']}`,
                    // avatar: <AvatarConversation user={user.attributes} />,
                    avatar: <div></div>,
                };
            });
            setOptions(getOptions);
        }
    }, [users]);

    return (
        <StyledCreateConversation>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <StyledCaption variant="body1">
                    A conversation can be with an individual or group. They are best organized around a topic or
                    communication
                </StyledCaption>
                <InputField name="title" control={control} label="Subject" />

                <AutoCompleteFiled control={control} name="selectedId" options={options} label="Invite people" />
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus disabled={!isValid}>
                    &nbsp;Create
                </Button>
            </form>
        </StyledCreateConversation>
    );
};
