import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { styled } from '@mui/system';
import { AutoCompleteFiled, AvatarConversation, MemberOptionType } from 'components';
import { isEmpty } from 'lodash';
import { Conversation, CreateConversationForm, ListResponse, WorkspaceUser } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRtcStore } from 'store/zustand/rtcStore';
import { ConversationSlice, MessageSlice } from 'store/zustand/slices';
import { WORKSPACE_ID } from 'utils';
import { InviteUserSchema } from '../CreateConversation/validation';
import { UsersConversationUI } from './UsersConversationUI';
interface UserConversationWrapperProps {
    usersConversation: ListResponse;
    conversation: Conversation;
    users: any | ListResponse;
    onAddMember: (selectedId: string[]) => boolean;
}

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: 16,
    textAlign: 'center',
    width: '100%',
}));

export const UsersConversationWrapper = ({ usersConversation, conversation, users }: UserConversationWrapperProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<MemberOptionType[]>([]);

    const userIds = usersConversation.data.map((i) => i._id);
    const initialValues: CreateConversationForm = { title: '' } as CreateConversationForm;

    const { getDataMessages } = useRtcStore((state: MessageSlice) => state);
    const { getConversationDetail, inviteUsers, getUsersConversation } = useRtcStore(
        (state: ConversationSlice) => state
    );

    const {
        control,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<CreateConversationForm>({
        mode: 'onChange',
        defaultValues: initialValues,
        resolver: yupResolver(InviteUserSchema),
    });

    const onAddMember = (selectedId: string[]) => {
        try {
            inviteUsers(WORKSPACE_ID, conversation._id, selectedId);
            getConversationDetail(WORKSPACE_ID, conversation._id);
            getUsersConversation(WORKSPACE_ID, conversation._id);
            getDataMessages(WORKSPACE_ID, conversation._id, 1);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const handleFormSubmit = async (formValues: CreateConversationForm) => {
        const addSuccess = onAddMember(formValues.selectedId);
        if (addSuccess) {
            reset();
            handleClose();
            const getOptions: any = users.data
                .filter((i: any) => ![...userIds, ...formValues.selectedId].includes(i._id))
                .map((user: WorkspaceUser) => {
                    return {
                        id: user.attributes['_id'],
                        name: `${user.attributes['firstName']} ${user.attributes['lastName']}`,
                        avatar: <AvatarConversation user={user.attributes} />,
                    };
                });
            setOptions(getOptions);
        }
    };

    React.useEffect(() => {
        if (!isEmpty(users)) {
            const getOptions: any = users.data
                .filter((i: any) => !userIds.includes(i._id))
                .map((user: WorkspaceUser) => {
                    return {
                        id: user.attributes['_id'],
                        name: `${user.attributes['firstName']} ${user.attributes['lastName']}`,
                        avatar: <AvatarConversation user={user.attributes} />,
                    };
                });
            setOptions(getOptions);
        }
    }, [users]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleOpenDialog = () => setOpenDialog(true);

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <List component="nav" aria-labelledby="list-users">
            <ListItem button onClick={handleClick}>
                <ListItemText primary="Members" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <UsersConversationUI usersConversation={usersConversation} conversation={conversation} />

                <StyledBox>
                    <Button
                        variant="contained"
                        color="primary"
                        className="add-member"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                    >
                        Add people
                    </Button>
                </StyledBox>

                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="dialog-add-users"
                    className={`dialog-add-users`}
                    fullWidth
                    maxWidth="sm"
                    disableScrollLock
                    id="dialog-add-members"
                >
                    <DialogTitle id="dialog-add-users">{'Add people'}</DialogTitle>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <DialogContent>
                            <AutoCompleteFiled
                                control={control}
                                name="selectedId"
                                options={options}
                                label="Select member..."
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!isValid} color="primary" autoFocus>
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Collapse>
        </List>
    );
};
